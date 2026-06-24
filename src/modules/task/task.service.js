import { taskRepository } from './task.repository.js'

export const taskService = {
    async createTask(
        userId,
        title,
        dueDate = null,
        priority = 'medium',
        category = 'other'
    ) {
        return await taskRepository.createTask({
            userId,
            title,
            dueDate,
            priority,
            category,
        })
    },

    async getUserTasks(
        userId,
        page = 1,
        filter = 'all'
    ) {
        const limit = 5

        const offset =
            (page - 1) * limit

        const tasks =
            await taskRepository.getUserTasks(
                userId,
                limit,
                offset,
                filter
            )

        const totalTasks =
            await taskRepository.countUserTasks(
                userId,
                filter
            )

        const totalPages =
            Math.ceil(
                totalTasks / limit
            )

        return {
            tasks,
            totalTasks,
            totalPages,
            currentPage: page,
        }
    },

    async markTaskDone(taskId, userId) {
        return await taskRepository.markTaskDone(
            taskId,
            userId
        )
    },

    async deleteTask(taskId, userId) {
        return await taskRepository.deleteTask(
            taskId,
            userId
        )
    },

    async updateTaskTitle(
        taskId,
        userId,
        title
    ) {
        return await taskRepository.updateTaskTitle(
            taskId,
            userId,
            title
        )
    },

    async updateTaskPriority(
        taskId,
        userId,
        priority
    ) {
        return await taskRepository.updateTaskPriority(
            taskId,
            userId,
            priority
        )
    },

    async updateTaskCategory(
        taskId,
        userId,
        category
    ) {
        return await taskRepository.updateTaskCategory(
            taskId,
            userId,
            category
        )
    }
}
