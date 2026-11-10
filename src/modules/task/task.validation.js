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
