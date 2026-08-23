import { createTaskSessions }
    from '../../../state/create-task.session.js'
import {Markup}
    from "telegraf"
import { TASK_TITLE_MIN_LENGTH, TASK_TITLE_MAX_LENGTH }
    from '../../../constants/validation.constants.js'

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

        const title =
            ctx.message.text.trim()

        if (!title) {
            await ctx.reply(
                'Task title cannot be empty.'
            )

            return true
        }

        if (title.length < TASK_TITLE_MIN_LENGTH) {
            await ctx.reply(
                'Task title must contain at least 3 characters.'
            )

            return true
        }

        if (title.length > TASK_TITLE_MAX_LENGTH) {
            await ctx.reply(
                'Task title cannot exceed 100 characters.'
            )

            return true
        }

        if (!/[a-zA-Zа-яА-ЯёЁ0-9]/.test(title)) {
            await ctx.reply(
                'Task title must contain at least one letter or number.'
            )

            return true
        }

        session.title = title

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

        if (dueDate === '-') {

            session.dueDate = null

        } else {

            if (!/^\d{4}-\d{2}-\d{2}$/.test(dueDate)) {
                await ctx.reply(
                    'Invalid date format.\n' +
                    'Use YYYY-MM-DD or "-" to skip.'
                )

                return true
            }

            const date =
                new Date(dueDate)

            const [year, month, day] =
                dueDate.split('-').map(Number)

            if (
                date.getFullYear() !== year ||
                date.getMonth() + 1 !== month ||
                date.getDate() !== day
            ) {
                await ctx.reply(
                    'The specified date does not exist.\n' +
                    'Please enter a valid calendar date.'
                )

                return true
            }

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
