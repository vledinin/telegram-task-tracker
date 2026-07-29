import { createTaskSessions } from '../../../state/create-task.session.js'
import {Markup} from "telegraf";

export async function handleCreateTaskText(ctx) {

    const telegramId = ctx.from.id

    const session =
        createTaskSessions.get(
            telegramId
        )

    if (!session) {
        return false
    }

    if (session.step === 'title') {

        session.title =
            ctx.message.text.trim()

        session.step = 'date'

        await ctx.reply(
            'Enter due date (YYYY-MM-DD) or type "-" to skip:',

            Markup.keyboard([
                ['❌ Cancel']
            ]).resize()
        )

        return true
    }

    if (session.step === 'date') {

        const dueDate =
            ctx.message.text.trim()

        if (
            dueDate !== '-' &&
            Number.isNaN(Date.parse(dueDate))
        ) {
            await ctx.reply(
                'Invalid date format.\nUse YYYY-MM-DD or "-"'
            )

            return true
        }

        if (dueDate === '-') {
            session.dueDate = null
        } else {
            session.dueDate = dueDate
        }

        session.step = 'priority'

        await ctx.reply(
            'Choose priority:',
            Markup.inlineKeyboard([
                [
                    Markup.button.callback(
                        '🔴 High',
                        'create_priority_high'
                    ),
                    Markup.button.callback(
                        '🟡 Medium',
                        'create_priority_medium'
                    ),
                    Markup.button.callback(
                        '🟢 Low',
                        'create_priority_low'
                    ),
                ],
                [
                    Markup.button.callback(
                        '❌ Cancel',
                        'create_cancel'
                    ),
                ],
            ])
        )

        return true
    }
}
