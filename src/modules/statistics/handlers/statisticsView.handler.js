import { userRepository }
    from '../../user/user.repository.js'

import { statisticsService }
    from '../statistics.service.js'

import {
    buildOverviewStatisticsMessage,
    buildPriorityStatisticsMessage,
    buildCategoryStatisticsMessage,
    buildStatisticsKeyboard,
}
    from '../statistics.utils.js'

export async function handleStatisticsView(
    ctx,
    view
) {

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

    const statistics =
        await statisticsService.getUserStatistics(
            user.id
        )

    let message

    if (view === 'overview') {

        message =
            buildOverviewStatisticsMessage(
                statistics
            )

    }

    if (view === 'priority') {

        message =
            buildPriorityStatisticsMessage(
                statistics
            )

    }

    if (view === 'category') {

        message =
            buildCategoryStatisticsMessage(
                statistics
            )
    }

    const keyboard =
        buildStatisticsKeyboard()

    await ctx.editMessageText(
        message,
        keyboard
    )

    await ctx.answerCbQuery()
}
