import { Telegraf } from 'telegraf'

export function loadBot() {
    const bot = new Telegraf(process.env.BOT_TOKEN)

    bot.start((ctx) => {
        ctx.reply('Task Tracker Bot started')
    })

    return bot
}
