import { taskRepository }
    from './task.repository.js'

export const taskService = {

    async createTask(
        userId,
        title,
        dueDate = null,
        priority = 'medium',
        category = 'other'
    ) {

        return taskRepository.createTask({
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

    async markTaskDone(
        taskId,
        userId
    ) {

        return taskRepository.markTaskDone(
            taskId,
            userId
        )
    },

    async deleteTask(
        taskId,
        userId
    ) {

        return taskRepository.deleteTask(
            taskId,
            userId
        )
    },

    async updateTaskTitle(
        taskId,
        userId,
        title
    ) {

        return taskRepository.updateTaskTitle(
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

        return taskRepository.updateTaskPriority(
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

        return taskRepository.updateTaskCategory(
            taskId,
            userId,
            category
        )
    }
}
