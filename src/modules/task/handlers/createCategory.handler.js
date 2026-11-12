import { createTaskSessions }
    from '../../../state/create-task.session.js'
import { taskService }
    from '../task.service.js'
import { userService }
    from "../../user/user.service.js"
import { mainKeyboard }
    from "../../../keyboards/main.keyboard.js"

export async function handleCreateCategory(
    ctx
) {

    const telegramId =
        ctx.from.id

    const session =
        createTaskSessions.get(
            telegramId
        )

    if (!session) {
        return ctx.answerCbQuery(
            'Session expired'
        )
    }

    const category = ctx.match[1]

    session.category = category

    // or
    // session.category = ctx.match[1]

    const user =
        await userService.findByTelegramId(
            telegramId
        )

    if (!user) {
        return ctx.answerCbQuery(
            'User not found'
        )
    }

    const task = await taskService.createTask(
        user.id,
        session.title,
        session.dueDate,
        session.priority,
        session.category
    )

    createTaskSessions.delete(
        telegramId
    )

    await ctx.answerCbQuery()

    await ctx.reply(
        `✅ Task "${task.title}" created successfully!`,
        mainKeyboard
    )
}
