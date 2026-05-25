import { taskRepository } from './task.repository.js'

export const taskService = {
    async createTask(userId, title) {
        return await taskRepository.createTask({
            userId,
            title,
        })
    },

    async getUserTasks(userId) {
        return await taskRepository.getUserTasks(userId)
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
