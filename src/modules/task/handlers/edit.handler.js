import {editSessions}
    from "../../../state/edit.session.js"
import {userRepository}
    from "../../user/user.repository.js"
import {taskService}
    from "../task.service.js"
import {mainKeyboard}
    from "../../../keyboards/main.keyboard.js"

export async function handleEditByAction(
    ctx
) {

    const taskId =
        Number(ctx.match[1])

    const telegramId =
        ctx.from.id

    editSessions.set(
        telegramId,
        taskId
    )

    await ctx.answerCbQuery()

    await ctx.reply(
        'Send new task title'
    )
}

export async function handleEditByText(
    ctx,
    next
) {

    const telegramId =
        ctx.from.id

    if (
        !editSessions.has(
            telegramId
        )
    ) {
        return next()
    }

    const taskId =
        editSessions.get(
            telegramId
        )

    const user =
        await userRepository.findByTelegramId(
            telegramId
        )

    if (!user) {
        return ctx.reply(
            'User not found'
        )
    }

    const newTitle =
        ctx.message.text.trim()

    if (!newTitle) {
        return ctx.reply(
            'Task title cannot be empty'
        )
    }

    const updatedTask =
        await taskService.updateTaskTitle(
            taskId,
            user.id,
            newTitle
        )

    editSessions.delete(
        telegramId
    )

    if (!updatedTask) {
        return ctx.reply(
            'Task not found'
        )
    }

    await ctx.reply(
        `Task updated: ${updatedTask.title}`,
        mainKeyboard
    )
}
