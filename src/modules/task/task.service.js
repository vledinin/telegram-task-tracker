import { taskRepository }
    from './task.repository.js'
import { validateTaskTitle }
    from './task.validation.js'
import {
    allowedPriorities,
    allowedCategories,
} from '../../constants/task.constants.js'

export function validateDueDate(dueDate) {

    if (!dueDate) {
        return
    }

    const datePattern =
        /^\d{4}-\d{2}-\d{2}$/

    if (!datePattern.test(dueDate)) {
        throw new Error(
            'Invalid date format. Use YYYY-MM-DD'
        )
    }

    const [
        year,
        month,
        day,
    ] = dueDate
        .split('-')
        .map(Number)

    const date =
        new Date(
            Date.UTC(
                year,
                month - 1,
                day
            )
        )

    const isValidDate =
        date.getUTCFullYear() === year &&
        date.getUTCMonth() === month - 1 &&
        date.getUTCDate() === day

    if (!isValidDate) {
        throw new Error(
            'Invalid date format. Use YYYY-MM-DD'
        )
    }
}

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

        return taskRepository.createTask({
            userId,
            title: validatedTitle,
            dueDate,
            priority,
            category,
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

        if (!title) {
            throw new Error(
                'Please provide task title'
            )
        }

        const dueDate =
            dueDatePart?.trim() || null

        validateDueDate(dueDate)

        const priority =
            priorityPart?.trim()
                .toLowerCase()
            || 'medium'

        const category =
            categoryPart?.trim()
                .toLowerCase()
            || 'other'

        if (
            !allowedPriorities.includes(
                priority
            )
        ) {
            throw new Error(
                'Priority must be low, medium or high'
            )
        }

        if (
            !allowedCategories.includes(
                category
            )
        ) {
            throw new Error(
                'Category must be work, study, home, health, shopping or other'
            )
        }

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
