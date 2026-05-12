import { userService } from './user.service.js'

export function registerUserModule(bot) {
    bot.start(async (ctx) => {
        await userService.handleStart(ctx)
    })
}
