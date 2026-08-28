import { editSessions }
    from "../../../state/edit.session.js";
import {mainKeyboard}
    from "../../../keyboards/main.keyboard.js"

export async function handleCancelEdit(
    ctx
) {

    const telegramId =
        ctx.from.id

    const session =
        editSessions.get(
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

    editSessions.delete(
        telegramId
    )

    if (ctx.callbackQuery) {
        await ctx.answerCbQuery()
    }

    await ctx.reply(
        '❌ Edit session cancelled.',
        mainKeyboard
    )
}
