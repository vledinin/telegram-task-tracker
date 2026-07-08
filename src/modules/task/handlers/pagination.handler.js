import {userRepository} from "../../user/user.repository.js";
import {taskService} from "../task.service.js";
import {buildTasksKeyboard, buildTasksMessage} from "../../../utils/task.utils.js";

export async function handlePagination(
    ctx,
    page,
    filter
) {
    if (page < 1) {
        return ctx.answerCbQuery('Invalid page')
    }

    const telegramId = ctx.from.id

    const user = await userRepository.findByTelegramId(
        telegramId
    )

    if (!user) {
        return ctx.answerCbQuery('User not found')
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
        return ctx.answerCbQuery('No more tasks')
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
