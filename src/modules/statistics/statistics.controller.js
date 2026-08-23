import { showStatistics }
    from './statistics.handler.js'
import { handleStatisticsView }
    from './handlers/statisticsView.handler.js'

export function registerStatisticsModule(
    bot
) {

    console.log(
        'Statistics module loaded'
    )

    bot.hears(
        '📊 Statistics',
        showStatistics
    )

    bot.action(
        'statistics_overview',
        async (ctx) => {
            await handleStatisticsView(
                ctx,
                'overview'
            )
        }
    )

    bot.action(
        'statistics_category',
        async (ctx) => {
            await handleStatisticsView(
                ctx,
                'category'
            )
        }
    )

    bot.action(
        'statistics_priority',
        async (ctx) => {
            await handleStatisticsView(
                ctx,
                'priority'
            )
        }
    )
}
