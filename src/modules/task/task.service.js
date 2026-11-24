import { taskRepository }
    from './task.repository.js'
import {
    validateTaskTitle,
    validateDueDate,
    validateTaskCategory,
    validateTaskPriority
} from './task.validation.js'

export const taskService = {

    async createTask(
        userId,
        title,
        dueDate = null,
        priority = 'medium',
        category = 'other'
    ) {

        const validatedTitle =
            validateTaskTitle(title)

        const validatedDueDate =
            validateDueDate(dueDate)

        const validatedPriority =
            validateTaskPriority(priority)

        const validatedCategory =
            validateTaskCategory(category)

        return taskRepository.createTask({
            userId,
            title: validatedTitle,
            dueDate: validatedDueDate,
            priority: validatedPriority,
            category: validatedCategory,
        })
    },

    async createTaskFromCommand(
        userId,
        taskText
    ) {

        const [
            titlePart,
            dueDatePart,
            priorityPart,
            categoryPart,
        ] = taskText.split('|')

        const title =
            titlePart?.trim()

        const dueDate =
            dueDatePart?.trim() || null

        const priority =
            priorityPart?.trim()
                .toLowerCase()
            || 'medium'

        const category =
            categoryPart?.trim()
                .toLowerCase()
            || 'other'

        return this.createTask(
            userId,
            title,
            dueDate,
            priority,
            category
        )
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

        const validatedPriority =
            validateTaskPriority(priority)

        return taskRepository.updateTaskPriority(
            taskId,
            userId,
            validatedPriority
        )
    },

    async updateTaskCategory(
        taskId,
        userId,
        category
    ) {

        const validatedCategory =
            validateTaskCategory(category)

        return taskRepository.updateTaskCategory(
            taskId,
            userId,
            validatedCategory
        )
    }
}
