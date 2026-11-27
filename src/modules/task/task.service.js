import { taskRepository }
    from './task.repository.js'
import {
    validateTaskTitle,
    validateDueDate,
    validateTaskCategory,
    validateTaskPriority,
    validateTaskPage,
    validateTaskFilter,
    validateTaskId
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

        const validatedPage =
            validateTaskPage(page)

        const validatedFilter =
            validateTaskFilter(filter)

        const limit = 5

        const offset =
            (validatedPage - 1) * limit

        const tasks =
            await taskRepository.getUserTasks(
                userId,
                limit,
                offset,
                validatedFilter
            )

        const totalTasks =
            await taskRepository.countUserTasks(
                userId,
                validatedFilter
            )

        const totalPages =
            Math.ceil(
                totalTasks / limit
            )

        return {
            tasks,
            totalTasks,
            totalPages,
            currentPage: validatedPage,
        }
    },

    async markTaskDone(
        taskId,
        userId
    ) {

        const validatedTaskId =
            validateTaskId(taskId)

        return taskRepository.markTaskDone(
            validatedTaskId,
            userId
        )
    },

    async deleteTask(
        taskId,
        userId
    ) {

        const validatedTaskId =
            validateTaskId(taskId)

        return taskRepository.deleteTask(
            validatedTaskId,
            userId
        )
    },

    async updateTaskTitle(
        taskId,
        userId,
        title
    ) {

        const validatedTaskId =
            validateTaskId(taskId)

        const validatedTitle =
            validateTaskTitle(title)


        return taskRepository.updateTaskTitle(
            validatedTaskId,
            userId,
            validatedTitle
        )
    },

    async updateTaskPriority(
        taskId,
        userId,
        priority
    ) {

        const validatedTaskId =
            validateTaskId(taskId)

        const validatedPriority =
            validateTaskPriority(priority)

        return taskRepository.updateTaskPriority(
            validatedTaskId,
            userId,
            validatedPriority
        )
    },

    async updateTaskCategory(
        taskId,
        userId,
        category
    ) {

        const validatedTaskId =
            validateTaskId(taskId)

        const validatedCategory =
            validateTaskCategory(category)

        return taskRepository.updateTaskCategory(
            validatedTaskId,
            userId,
            validatedCategory
        )
    }
}
