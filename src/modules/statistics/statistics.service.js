import { statisticsRepository }
    from './statistics.repository.js'

export const statisticsService = {

    async getUserStatistics(userId) {

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
                Number(statistics.total_tasks),

            completedTasks:
                Number(statistics.completed_tasks),

            activeTasks:
                Number(statistics.active_tasks),

            overdueTasks:
                Number(statistics.overdue_tasks),

            categories,

            priorities,
        }
    }
}
