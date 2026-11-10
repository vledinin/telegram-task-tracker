import {editSessions}
    from "../../../state/edit.session.js"
import { createTaskSessions }
    from '../../../state/create-task.session.js'
import { userService }
    from '../../user/user.service.js'
import {taskService}
    from "../task.service.js"
import { validateTaskTitle }
    from '../task.validation.js'
import {mainKeyboard}
    from "../../../keyboards/main.keyboard.js"
import {Markup}
    from "telegraf";

export async function handleEditByAction(
    ctx
) {

    const taskId =
        Number(ctx.match[1])

    const telegramId =
        ctx.from.id

    createTaskSessions.delete(
        telegramId
    )

    editSessions.set(
        telegramId,
        taskId
    )

    await ctx.answerCbQuery()

    await ctx.reply(
        'Send new task title',
        Markup.inlineKeyboard([
            [
                Markup.button.callback(
                    '❌ Cancel',
                    'edit_cancel'
                )
            ],
        ])
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
        await userService.findByTelegramId(
            telegramId
        )

    if (!user) {
        return ctx.reply(
            'User not found'
        )
    }

    let newTitle

    try {
        newTitle = validateTaskTitle(ctx.message.text)
    } catch (error) {
        return ctx.reply(error.message)
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
