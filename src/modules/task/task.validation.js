import {
    allowedCategories,
    allowedPriorities
} from '../../constants/task.constants.js'
import {
    TASK_TITLE_MIN_LENGTH,
    TASK_TITLE_MAX_LENGTH,
} from '../../constants/validation.constants.js'

export function validateTaskTitle(title) {
    const normalizedTitle = title.trim()

    if (!normalizedTitle) {
        throw new Error('Task title cannot be empty.')
    }

    if (normalizedTitle.length < TASK_TITLE_MIN_LENGTH) {
        throw new Error('Task title must contain at least 3 characters.')
    }

    if (normalizedTitle.length > TASK_TITLE_MAX_LENGTH) {
        throw new Error('Task title cannot exceed 100 characters.')
    }

    if (!/[a-zA-Zа-яА-ЯёЁ0-9]/.test(normalizedTitle)) {
        throw new Error('Task title must contain at least one letter or number.')
    }

    return normalizedTitle
}

export function validateDueDate(dueDate) {

    if (!dueDate) {
        return null
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

    return dueDate
}

export function validateTaskPriority(priority) {
    if (typeof priority !== 'string') {
        throw new Error(
            'Priority must be low, medium or high'
        )
    }

    const normalizedPriority =
        priority.trim().toLowerCase()

    if (!allowedPriorities.includes(normalizedPriority)) {
        throw new Error(
            'Priority must be low, medium or high'
        )
    }

    return normalizedPriority
}

export function validateTaskCategory(category) {
    if (typeof category !== 'string') {
        throw new Error(
            'Category must be work, study, home, health, shopping or other'
        )
    }

    const normalizedCategory =
        category.trim().toLowerCase()

    if (!allowedCategories.includes(normalizedCategory)) {
        throw new Error(
            'Category must be work, study, home, health, shopping or other'
        )
    }

    return normalizedCategory
}

export function validateTaskPage(page) {
    if (!Number.isInteger(page) || page < 1) {
        throw new Error(
            'Page must be a positive integer.'
        )
    }

    return page
}

export function validateTaskFilter(filter) {
    const allowedFilters = [
        'all',
        'active',
        'done',
    ]

    if (!allowedFilters.includes(filter)) {
        throw new Error(
            'Filter must be all, active or done.'
        )
    }

    return filter
}

export function validateTaskId(taskId) {
    if (!Number.isInteger(taskId) || taskId < 1) {
        throw new Error(
            'Task id must be a positive integer.'
        )
    }

    return taskId
}
