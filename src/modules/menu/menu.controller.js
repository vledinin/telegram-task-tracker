import { userService } from '../user/user.service.js'

import { mainKeyboard } from '../../keyboards/main.keyboard.js'

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
}