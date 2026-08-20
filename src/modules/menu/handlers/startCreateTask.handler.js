import { createTaskSessions }
    from '../../../state/create-task.session.js'

import { Markup } from 'telegraf'

export async function startCreateTask(ctx) {

    const telegramId = ctx.from.id

    createTaskSessions.set(
        telegramId,
        {
            step: 'title'
        }
    )

    await ctx.reply(
        'Enter task title:',
        Markup.keyboard([
            ['❌ Cancel']
        ]).resize()
    )
}
