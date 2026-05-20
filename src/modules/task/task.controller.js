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
}
