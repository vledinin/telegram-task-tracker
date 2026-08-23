import {userRepository}
    from "../../user/user.repository.js"
import {taskService}
    from "../task.service.js"

export async function handleDeleteByCommand(
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
                '/delete', ''
            )
            .trim()

    if (!taskId) {
        return ctx.reply(
            'Provide task id'
        )
    }

    const deletedTask =
        await taskService.deleteTask(
            Number(taskId),
            user.id
        )

    if (!deletedTask) {
        return ctx.reply(
            'Task not found'
        )
    }

    await ctx.reply(
        `Task deleted: ${deletedTask.title}`
    )
}

export async function handleDeleteByAction(
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

    const deletedTask =
        await taskService.deleteTask(
            taskId,
            user.id
        )

    if (!deletedTask) {
        return ctx.answerCbQuery(
            'Task not found'
        )
    }

    await ctx.answerCbQuery(
        'Task deleted'
    )

    await ctx.deleteMessage()
}
