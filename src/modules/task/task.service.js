import { taskRepository } from './task.repository.js'

export const taskService = {
    async createTask(userId, title) {
        return await taskRepository.createTask({
            userId,
            title,
        })
    },

    async getUserTasks(userId, page = 1) {
        const limit = 5

        const offset = (page - 1) * limit

        return await taskRepository.getUserTasks(
            userId,
            limit,
            offset
        )
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
    }
}
