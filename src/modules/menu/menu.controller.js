import { handleStart }
    from './handlers/start.handler.js'
import { handleShowHelp }
    from './handlers/help.handler.js'
import { handleStartCreateTask }
    from './handlers/startCreateTask.handler.js'
import { handleShowTasks }
    from './handlers/showTasksMenu.handler.js'

export function registerMenuModule(
    bot
) {

    console.log(
        'Menu module loaded'
    )

    bot.start(
        handleStart
    )

    bot.hears(
        '📋 My Tasks',
        handleShowTasks
    )

    bot.hears(
        '❓ Help',
        handleShowHelp
    )

    bot.hears(
        '➕ Add Task',
        handleStartCreateTask
    )
}
