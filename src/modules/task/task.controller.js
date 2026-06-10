import { taskService } from './task.service.js'
import { userRepository } from '../user/user.repository.js'
import {
    buildTasksMessage,
    buildTasksKeyboard,
} from '../../utils/task.utils.js'

export function registerTaskModule(bot) {
    bot.command('addtask', async (ctx) => {
        const telegramId = ctx.from.id

        const user = await userRepository.findByTelegramId(telegramId)

        if (!user) {
            return ctx.reply('User not found')
        }

        const title = ctx.message.text.replace('/addtask', '').trim()

        if (!title) {
            return ctx.reply('Please provide task title')
        }

        const task = await taskService.createTask(
            user.id,
            title
        )

        await ctx.reply(`Task created: ${task.title}`)
    })

    bot.command('tasks', async (ctx) => {
        const telegramId = ctx.from.id

        const user = await userRepository.findByTelegramId(
            telegramId
        )

        if (!user) {
            return ctx.reply('User not found')
        }

        const page = 1

        const filter = 'all'

        const result = await taskService.getUserTasks(
            user.id,
            page,
            filter
        )

        const {
            tasks,
            totalPages,
            currentPage,
        } = result

        if (!tasks.length) {
            return ctx.reply('You have no tasks')
        }

        const message = buildTasksMessage(
            tasks,
            currentPage,
            totalPages,
            filter
        )

        const keyboard = buildTasksKeyboard(
            tasks,
            currentPage,
            totalPages,
            filter
        )

        await ctx.reply(
            message,
            keyboard
        )
    })

    bot.command('done', async (ctx) => {
        const telegramId = ctx.from.id

        const user = await userRepository.findByTelegramId(telegramId)

        if (!user) {
            return ctx.reply('User not found')
        }

        const taskId = ctx.message.text
            .replace('/done', '')
            .trim()

        if (!taskId) {
            return ctx.reply('Provide task id')
        }

        const task = await taskService.markTaskDone(
            Number(taskId),
            user.id
        )

        if (!task) {
            return ctx.reply('Task not found')
        }

        await ctx.reply(`Task completed: ${task.title}`)
    })

    bot.command('delete', async (ctx) => {
        const telegramId = ctx.from.id

        const user = await userRepository.findByTelegramId(telegramId)

        if (!user) {
            return ctx.reply('User not found')
        }

        const taskId = ctx.message.text
            .replace('/delete', '')
            .trim()

        if (!taskId) {
            return ctx.reply('Provide task id')
        }

        const deletedTask = await taskService.deleteTask(
            Number(taskId),
            user.id
        )

        if (!deletedTask) {
            return ctx.reply('Task not found')
        }

        await ctx.reply(
            `Task deleted: ${deletedTask.title}`
        )
    })

    bot.action(/done_(.+)/, async (ctx) => {
        const taskId = Number(ctx.match[1])

        const telegramId = ctx.from.id

        const user = await userRepository.findByTelegramId(
            telegramId
        )

        if (!user) {
            return ctx.answerCbQuery('User not found')
        }

        const task = await taskService.markTaskDone(
            taskId,
            user.id
        )

        if (!task) {
            return ctx.answerCbQuery('Task not found')
        }

        await ctx.answerCbQuery('Task completed')

        await ctx.editMessageText(
            `✅ ${task.title}`
        )
    })

    bot.action(/delete_(.+)/, async (ctx) => {
        const taskId = Number(ctx.match[1])

        const telegramId = ctx.from.id

        const user = await userRepository.findByTelegramId(
            telegramId
        )

        if (!user) {
            return ctx.answerCbQuery('User not found')
        }

        const deletedTask = await taskService.deleteTask(
            taskId,
            user.id
        )

        if (!deletedTask) {
            return ctx.answerCbQuery('Task not found')
        }

        await ctx.answerCbQuery('Task deleted')

        await ctx.deleteMessage()
    })

    bot.action(/tasks_page_(\d+)_(all|active|done)/, async (ctx) => {
        const page = Number(ctx.match[1])

        const filter = ctx.match[2]

        if (page < 1) {
            return ctx.answerCbQuery('Invalid page')
        }

        const telegramId = ctx.from.id

        const user = await userRepository.findByTelegramId(
            telegramId
        )

        if (!user) {
            return ctx.answerCbQuery('User not found')
        }

        const result =
            await taskService.getUserTasks(
                user.id,
                page,
                filter
            )

        const {
            tasks,
            totalPages,
            currentPage,
        } = result

        if (!tasks.length) {
            return ctx.answerCbQuery('No more tasks')
        }

        const message =
            buildTasksMessage(
                tasks,
                currentPage,
                totalPages,
                filter
            )

        const keyboard =
            buildTasksKeyboard(
                tasks,
                currentPage,
                totalPages,
                filter
            )

        await ctx.editMessageText(
            message,
            keyboard
        )
    })

    bot.action(/filter_(all|active|done)/, async (ctx) => {
        const filter = ctx.match[1]

        const telegramId = ctx.from.id

        const user =
            await userRepository.findByTelegramId(
                telegramId
            )

        if (!user) {
            return ctx.answerCbQuery(
                'User not found'
            )
        }

        const page = 1

        const result =
            await taskService.getUserTasks(
                user.id,
                page,
                filter
            )

        const {
            tasks,
            totalPages,
            currentPage,
        } = result

        if (!tasks.length) {
            return ctx.answerCbQuery(
                'No tasks found'
            )
        }

        const message =
            buildTasksMessage(
                tasks,
                currentPage,
                totalPages,
                filter
            )

        const keyboard =
            buildTasksKeyboard(
                tasks,
                currentPage,
                totalPages,
                filter
            )

        await ctx.editMessageText(
            message,
            keyboard
        )
    })

    bot.action('current_page', async (ctx) => {
        await ctx.answerCbQuery()
    })
}
