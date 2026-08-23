import { userRepository }
    from '../../user/user.repository.js'
import { taskService }
    from '../task.service.js'
import { Markup }
    from 'telegraf'

export async function handlePriorityByAction(
    ctx
) {

    const taskId =
        Number(ctx.match[1])

    await ctx.answerCbQuery()

    await ctx.reply(
        'Choose priority:',
        Markup.inlineKeyboard([
            [
                Markup.button.callback(
                    '🔴 High',
                    `set_priority_${taskId}_high`
                ),
            ],
            [
                Markup.button.callback(
                    '🟡 Medium',
                    `set_priority_${taskId}_medium`
                ),
            ],
            [
                Markup.button.callback(
                    '🟢 Low',
                    `set_priority_${taskId}_low`
                ),
            ],
        ])
    )
}

export async function handleSetPriorityByAction(
    ctx
) {

    const taskId =
        Number(ctx.match[1])

    const priority =
        ctx.match[2]

    const telegramId =
        ctx.from.id

    const user =
        await userRepository.findByTelegramId(
            telegramId
        )

    if (!user) {
        return ctx.answerCbQuery(
            'User not found'
        )
    }

    const updatedTask =
        await taskService.updateTaskPriority(
            taskId,
            user.id,
            priority
        )

    if (!updatedTask) {
        return ctx.answerCbQuery(
            'Task not found'
        )
    }

    await ctx.answerCbQuery(
        'Priority updated'
    )

    await ctx.reply(
        `Priority changed to ${priority}`
    )
}
