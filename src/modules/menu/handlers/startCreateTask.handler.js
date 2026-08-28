import { createTaskSessions }
    from '../../../state/create-task.session.js'
import { editSessions }
    from '../../../state/edit.session.js'
import { Markup }
    from 'telegraf'

export async function handleStartCreateTask(
    ctx
) {

    const telegramId =
        ctx.from.id

    editSessions.delete(
        telegramId
    )

    createTaskSessions.set(
        telegramId,
        {
            step: 'title'
        }
    )

    await ctx.reply(
        'Enter task title:',
        Markup.inlineKeyboard([
            [
                Markup.button.callback(
                    '❌ Cancel',
                    'create_cancel'
                )
            ],
        ])
    )
}
