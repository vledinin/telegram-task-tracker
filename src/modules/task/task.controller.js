import { taskService } from './task.service.js'
import { userRepository } from '../user/user.repository.js'
import { Markup } from 'telegraf'

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

        const user = await userRepository.findByTelegramId(telegramId)

        if (!user) {
            return ctx.reply('User not found')
        }

        const tasks = await taskService.getUserTasks(user.id)

        if (!tasks.length) {
            return ctx.reply('You have no tasks')
        }

        for (const task of tasks) {
            const status = task.is_done ? '✅' : '❌'

            await ctx.reply(
                `${status} ${task.title}`,
                Markup.inlineKeyboard([
                    [
                        Markup.button.callback(
                            '✅ Done',
                            `done_${task.id}`
                        ),

                        Markup.button.callback(
                            '🗑 Delete',
                            `delete_${task.id}`
                        ),
                    ],
                ])
            )
        }
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
}
