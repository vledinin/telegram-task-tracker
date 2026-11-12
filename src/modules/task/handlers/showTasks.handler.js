import { editSessions }
    from "../../../state/edit.session.js"
import { taskService }
    from "../task.service.js"
import { userService }
    from "../../user/user.service.js"
import { buildTasksKeyboard, buildTasksMessage }
    from "../task.utils.js"

export async function showTasks(
    ctx,
    page = 1,
    filter = 'all',
    edit = false
) {

    const telegramId =
        ctx.from.id

    editSessions.delete(
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
        return ctx.reply(
            'You have no tasks'
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

    if (edit) {
        return ctx.editMessageText(
            message,
            keyboard
        )
    }

    return ctx.reply(
        message,
        keyboard
    )
}
