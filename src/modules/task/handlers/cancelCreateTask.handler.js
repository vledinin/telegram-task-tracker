import { createTaskSessions } from '../../../state/create-task.session.js'
import {mainKeyboard} from "../../../keyboards/main.keyboard.js";

export async function handleCancelCreateTask(ctx) {

    const telegramId = ctx.from.id

    const session =
        createTaskSessions.get(
            telegramId
        )

    if (!session) {
        if (ctx.callbackQuery) {
            return ctx.answerCbQuery(
                'Session expired'
            )
        }

        return false
    }

    createTaskSessions.delete(
        telegramId
    )

    if (ctx.callbackQuery) {
        await ctx.answerCbQuery()
    }

    await ctx.reply(
        '❌ Task creation cancelled.',
        mainKeyboard
    )
}
