import { userService } from '../user/user.service.js'
import { mainKeyboard } from '../../keyboards/main.keyboard.js'
import { showTasks } from '../task/handlers/showTasks.handler.js'
import { showHelp } from './handlers/help.handler.js'
import { createTaskSessions } from '../../state/create-task.session.js'

export function registerMenuModule(bot) {
    console.log('Menu module loaded')

    bot.start(async (ctx) => {
        console.log('/start handler')

        await userService.ensureUserExists(ctx)

        await ctx.reply(
            'Welcome to Task Tracker!',
            mainKeyboard
        )
    })

    bot.hears(
        '📋 My Tasks',
        async (ctx) => {
            await showTasks(ctx)
        }
    )

    bot.hears(
        '❓ Help',
        async (ctx) => {
            await showHelp(ctx)
        }
    )

    bot.hears(
        '➕ Add Task',
        async (ctx) => {
            const telegramId =
                ctx.from.id

            createTaskSessions.set(
                telegramId,
                {
                    step: 'title'
                }
            )

            await ctx.reply(
                'Enter task title:'
            )
        }
    )
}
