import { createTaskSessions }
    from '../../../state/create-task.session.js'
import {Markup}
    from "telegraf"

export async function handleCreatePriority(
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

    const priority = ctx.match[1]

    session.priority = priority

    // or
    // session.priority = ctx.match[1]

    session.step = 'category'

    await ctx.answerCbQuery()

    await ctx.reply(
        'Choose category:',
        Markup.inlineKeyboard([
                [
                    Markup.button.callback(
                        '💼 Work',
                        `create_category_work`
                    ),

                    Markup.button.callback(
                        '📚 Study',
                        `create_category_study`
                    ),

                    Markup.button.callback(
                        '🏠 Home',
                        `create_category_home`
                    ),
                ],
                [
                    Markup.button.callback(
                        '💪 Health',
                        `create_category_health`
                    ),

                    Markup.button.callback(
                        '🛒 Shopping',
                        `create_category_shopping`
                    ),

                    Markup.button.callback(
                        '📌 Other',
                        `create_category_other`
                    ),
                ],
                [
                    Markup.button.callback(
                        '❌ Cancel',
                        'create_cancel'
                    ),
                ],
        ])
    )
}
