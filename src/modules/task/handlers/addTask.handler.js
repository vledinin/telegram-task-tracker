import {userRepository}
    from "../../user/user.repository.js"
import {taskService}
    from "../task.service.js"

export async function handleAddTask(
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

    const taskText =
        ctx.message.text
            .replace('/addtask', '')
            .trim()

    if (!taskText) {
        return ctx.reply(
            'Please provide task title'
        )
    }

    try {

        const task =
            await taskService.createTaskFromCommand(
                user.id,
                taskText
            )

        await ctx.reply(
            `Task created: ${task.title}`
        )

    } catch (error) {
        return ctx.reply(
            error.message
        )
    }
}
