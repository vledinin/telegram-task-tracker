import { userService } from '../user/user.service.js'
import { mainKeyboard } from '../../keyboards/main.keyboard.js'
import { showHelp } from './handlers/help.handler.js'
import {startCreateTask} from "./handlers/startCreateTask.handler.js";
import {handleShowTasks} from "./handlers/showTasksMenu.handler.js";

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
        handleShowTasks
    )

    bot.hears(
        '❓ Help',
        showHelp
    )

    bot.hears(
        '➕ Add Task',
        startCreateTask
    )
}
