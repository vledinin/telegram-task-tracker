import {userRepository} from "../../user/user.repository.js";
import {taskService} from "../task.service.js";
import {Markup} from "telegraf";

export async function handleCategoryByAction(
    ctx,
    taskId
) {
    await ctx.answerCbQuery()

    await ctx.reply(
        'Choose category:',
        Markup.inlineKeyboard([
            [
                Markup.button.callback(
                    '💼 Work',
                    `set_category_${taskId}_work`
                ),
            ],
            [
                Markup.button.callback(
                    '📚 Study',
                    `set_category_${taskId}_study`
                ),
            ],
            [
                Markup.button.callback(
                    '🏠 Home',
                    `set_category_${taskId}_home`
                ),
            ],
            [
                Markup.button.callback(
                    '💪 Health',
                    `set_category_${taskId}_health`
                ),
            ],
            [
                Markup.button.callback(
                    '🛒 Shopping',
                    `set_category_${taskId}_shopping`
                ),
            ],
            [
                Markup.button.callback(
                    '📌 Other',
                    `set_category_${taskId}_other`
                ),
            ],
        ])
    )
}

export async function handleSetCategoryByAction(
    ctx,
    taskId,
    category
) {
    const telegramId = ctx.from.id

    const user =
        await userRepository.findByTelegramId(
            telegramId
        )

    if (!user) {
        return ctx.answerCbQuery(
            'User not found'
        )
    }

    const updatedTask =
        await taskService.updateTaskCategory(
            taskId,
            user.id,
            category
        )

    if (!updatedTask) {
        return ctx.answerCbQuery(
            'Task not found'
        )
    }

    await ctx.answerCbQuery(
        'Category updated'
    )

    await ctx.reply(
        `Category changed to ${category}`
    )
}
