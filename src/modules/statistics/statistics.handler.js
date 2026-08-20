import { userRepository }
    from '../user/user.repository.js'

import { statisticsService }
    from './statistics.service.js'
import {
    buildStatisticsMessage,
    buildStatisticsKeyboard,
} from './statistics.utils.js'

export async function showStatistics(ctx) {

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

    const statistics =
        await statisticsService.getUserStatistics(
            user.id
        )

    console.log(
        'Statistics:',
        statistics
    )

    const message =
        buildStatisticsMessage(
            statistics
        )
    const keyboard =
        buildStatisticsKeyboard()

    await ctx.reply(
        message,
        keyboard
    )
}
