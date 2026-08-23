import {userRepository}
    from "../../user/user.repository.js"
import {taskService}
    from "../task.service.js"

export async function handleDoneByCommand(
    ctx
) {

    const telegramId =
        ctx.from.id

    const user =
        await userRepository.findByTelegramId(
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
        await userRepository.findByTelegramId(
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
