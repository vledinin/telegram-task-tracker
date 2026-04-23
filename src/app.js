import 'dotenv/config'
import { loadBot } from './loaders/bot.loader.js'

async function start() {
    const bot = await loadBot()

    await bot.launch()

    console.log('Bot started')

    process.once('SIGINT', () => bot.stop('SIGINT'))
    process.once('SIGTERM', () => bot.stop('SIGTERM'))
}

start()
