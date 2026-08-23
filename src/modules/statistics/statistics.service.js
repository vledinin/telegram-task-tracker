import { statisticsRepository }
    from './statistics.repository.js'

export const statisticsService = {

    async getUserStatistics(
        userId
    ) {

        const statistics =
            await statisticsRepository.getUserStatistics(
                userId
            )

        const categories =
            await statisticsRepository.getTasksByCategory(
                userId
            )

        const priorities =
            await statisticsRepository.getTasksByPriority(
                userId
            )

        return {
            totalTasks:
            statistics.totalTasks,

            completedTasks:
            statistics.completedTasks,

            activeTasks:
            statistics.activeTasks,

            overdueTasks:
            statistics.overdueTasks,

            categories,

            priorities,
        }
    }
}
