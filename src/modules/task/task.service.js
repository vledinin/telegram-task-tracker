import { taskRepository } from './task.repository.js'

export const taskService = {
    async createTask(userId, title) {
        return await taskRepository.createTask({
            userId,
            title,
        })
    }
}
