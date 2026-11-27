import { taskService }
    from "../task.service.js"
import { userService }
    from "../../user/user.service.js"

export async function handleDoneByCommand(
    ctx
) {

    const telegramId =
        ctx.from.id

    const user =
        await userService.findByTelegramId(
            telegramId
        )

    if (!user) {
        return ctx.reply(
            'User not found'
        )
    }

    const taskId =
        ctx.message.text
            .replace(
                '/done', ''
            )
            .trim()

    if (!taskId) {
        return ctx.reply(
            'Provide task id'
        )
    }

    if (!/^\d+$/.test(taskId)) {
        return ctx.reply(
            'Task id must be a number'
        )
    }

    const task =
        await taskService.markTaskDone(
            Number(taskId),
            user.id
        )

    if (!task) {
        return ctx.reply(
            'Task not found'
        )
    }

    await ctx.reply(
        `Task completed: ${task.title}`
    )
}

export async function handleDoneByAction(
    ctx
) {

    const taskId =
        Number(ctx.match[1])

    const telegramId =
        ctx.from.id

    const user =
        await userService.findByTelegramId(
            telegramId
        )

    if (!user) {
        return ctx.answerCbQuery(
            'User not found'
        )
    }

    const task =
        await taskService.markTaskDone(
            taskId,
            user.id
        )

    if (!task) {
        return ctx.answerCbQuery(
            'Task not found'
        )
    }

    await ctx.answerCbQuery(
        'Task completed'
    )

    await ctx.editMessageText(
        `✅ ${task.title}`
    )
}
