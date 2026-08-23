import {userRepository}
    from "../../user/user.repository.js"
import {taskService}
    from "../task.service.js"

export async function handleAddTask(
    ctx
) {

    const telegramId =
        ctx.from.id

    const user =
        await userRepository.findByTelegramId(
            telegramId
        )

    if (!user) {
        return ctx.reply(
            'User not found'
        )
    }

    const taskText = ctx.message.text
        .replace('/addtask', '')
        .trim()

    if (!taskText) {
        return ctx.reply(
            'Please provide task title'
        )
    }

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

    if (
        dueDate &&
        Number.isNaN(
            Date.parse(dueDate)
        )
    ) {
        return ctx.reply(
            'Invalid date format. Use YYYY-MM-DD'
        )
    }

    const allowedPriorities = [
        'low',
        'medium',
        'high',
    ]

    if (
        !allowedPriorities.includes(
            priority
        )
    ) {
        return ctx.reply(
            'Priority must be low, medium or high'
        )
    }

    const allowedCategories = [
        'work',
        'study',
        'home',
        'health',
        'shopping',
        'other',
    ]

    if (
        !allowedCategories.includes(
            category
        )
    ) {
        return ctx.reply(
            'Category must be work, study, home, health, shopping or other'
        )
    }

    const task =
        await taskService.createTask(
            user.id,
            title,
            dueDate,
            priority,
            category
        )

    await ctx.reply(
        `Task created: ${task.title}`
    )
}
