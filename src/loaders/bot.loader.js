import { Telegraf } from 'telegraf'
import { registerTaskModule } from '../modules/task/task.controller.js'
import {registerMenuModule} from "../modules/menu/menu.controller.js";
import {registerStatisticsModule} from "../modules/statistics/statistics.controller.js";

export function loadBot() {
    const bot = new Telegraf(process.env.BOT_TOKEN)

    registerMenuModule(bot)

    registerTaskModule(bot)

    registerStatisticsModule(bot)

    return bot
}
