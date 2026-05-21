import { taskService } from './task.service.js'
import { userRepository } from '../user/user.repository.js'

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

        const message = tasks
            .map((task) => {
                const status = task.is_done ? '✅' : '❌'

                return `${status} ${task.id}. ${task.title}`
            })
            .join('\n')

        await ctx.reply(message)
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
}
