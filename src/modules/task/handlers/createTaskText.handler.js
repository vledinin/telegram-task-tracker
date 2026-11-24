import { createTaskSessions }
    from '../../../state/create-task.session.js'
import { validateDueDate }
    from '../task.validation.js'
import { validateTaskTitle }
    from '../task.validation.js'
import {Markup}
    from "telegraf"

export async function handleCreateTaskText(
    ctx
) {

    const telegramId =
        ctx.from.id

    const session =
        createTaskSessions.get(
            telegramId
        )

    if (!session) {
        return false
    }

    if (session.step === 'title') {

        let title

        try {
            title = validateTaskTitle(ctx.message.text)
        } catch (error) {
            await ctx.reply(error.message)
            return true
        }

        session.title = title

        session.step = 'date'

        await ctx.reply(
            'Enter due date (YYYY-MM-DD) or type "-" to skip:',
            Markup.inlineKeyboard([
                [
                    Markup.button.callback(
                        '❌ Cancel',
                        'create_cancel'
                    )
                ],
            ])
        )

        return true
    }

    if (session.step === 'date') {

        const dueDate =
            ctx.message.text.trim()

        if (dueDate === '-') {

            session.dueDate = null

        } else {

            try {

                session.dueDate =
                    validateDueDate(dueDate)

            } catch (error) {

                await ctx.reply(
                    error.message
                )

                return true
            }
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
