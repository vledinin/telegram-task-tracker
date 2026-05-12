import { Telegraf } from 'telegraf'
import { registerUserModule } from '../modules/user/user.controller.js'

export function loadBot() {
    const bot = new Telegraf(process.env.BOT_TOKEN)

    registerUserModule(bot)

    return bot
}
