import {userRepository}
    from "../../user/user.repository.js"
import {taskService}
    from "../task.service.js"
import {buildTasksKeyboard, buildTasksMessage}
    from "../task.utils.js"

export async function handleFilter(
    ctx
) {

    const page = 1

    const filter =
        ctx.match[1]

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

    const result =
        await taskService.getUserTasks(
            user.id,
            page,
            filter
        )

    const {
        tasks,
        totalPages,
        currentPage,
    } = result

    if (!tasks.length) {
        return ctx.answerCbQuery(
            'No tasks found'
        )
    }

    const message =
        buildTasksMessage(
            tasks,
            currentPage,
            totalPages,
            filter
        )

    const keyboard =
        buildTasksKeyboard(
            tasks,
            currentPage,
            totalPages,
            filter
        )

    await ctx.editMessageText(
        message,
        keyboard
    )
}
