import { createTaskSessions }
    from '../../../state/create-task.session.js'

import { userRepository }
    from '../../user/user.repository.js'

import { taskService }
    from '../task.service.js'

export async function handleCreateCategory(ctx) {

    const telegramId = ctx.from.id

    const session =
        createTaskSessions.get(
            telegramId
        )

    if (!session) {
        return ctx.answerCbQuery(
            'Session expired'
        )
    }

    const category = ctx.match[1]

    session.category = category

    // or
    // session.category = ctx.match[1]

    const user =
        await userRepository.findByTelegramId(
            telegramId
        )

    if (!user) {
        return ctx.answerCbQuery(
            'User not found'
        )
    }

    const task = await taskService.createTask(
        user.id,
        session.title,
        session.dueDate,
        session.priority,
        session.category
    )

    createTaskSessions.delete(
        telegramId
    )

    await ctx.answerCbQuery()

    await ctx.reply(
        `Task created: ${task.title}`
    )
}
