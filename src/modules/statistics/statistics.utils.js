import { Markup }
    from 'telegraf'
import { priorityNames, categoryNames }
    from "../../constants/statistics.constants.js"

export function buildStatisticsMessage(
    statistics
) {

    const priorityStatistics =
        buildPriorityStatistics(
            statistics.priorities
        )

    const categoryStatistics =
        buildCategoryStatistics(
            statistics.categories
        )

    return (
        '📊 Your Statistics\n\n' +

        `📋 Total tasks: ${statistics.totalTasks}\n` +
        `✅ Completed: ${statistics.completedTasks}\n` +
        `🔄 Active: ${statistics.activeTasks}\n` +
        `⚠️ Overdue: ${statistics.overdueTasks}\n\n` +

        '🎯 By Priority:\n' +
        priorityStatistics +
        '\n\n' +

        '📂 By Category:\n' +
        categoryStatistics
    )
}

export function buildPriorityStatistics(
    priorities
) {
    return priorities
        .map(
            ({ priority, count }) =>
                `${priorityNames[priority]}: ${count}`
        )
        .join('\n')
}

export function buildCategoryStatistics(
    categories
) {
    return categories
        .map(
            ({ category, count }) =>
                `${categoryNames[category]}: ${count}`
        )
        .join('\n')
}

export function buildPriorityStatisticsMessage(
    statistics
) {

    const priorityStatistics =
        buildPriorityStatistics(
            statistics.priorities
        )

    return (
        '🎯 Statistics by Priority\n\n' +
        priorityStatistics
    )
}

export function buildCategoryStatisticsMessage(
    statistics
) {

    const categoryStatistics =
        buildCategoryStatistics(
            statistics.categories
        )

    return (
        '📂 Statistics by Category\n\n' +
        categoryStatistics
    )
}

export function buildStatisticsKeyboard() {

    return Markup.inlineKeyboard([
        [
            Markup.button.callback(
                '📊 Overview',
                'statistics_overview'
            )
        ],
        [
            Markup.button.callback(
                '📂 Category',
                'statistics_category'
            ),

            Markup.button.callback(
                '🎯 Priority',
                'statistics_priority'
            )
        ],
    ])
}
