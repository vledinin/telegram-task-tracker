import {showTasks}
    from './handlers/showTasks.handler.js'
import {handlePagination}
    from "./handlers/pagination.handler.js"
import {handleFilter}
    from "./handlers/filter.handler.js"
import {handleDoneByAction, handleDoneByCommand}
    from "./handlers/done.handler.js"
import {handleDeleteByAction, handleDeleteByCommand}
    from "./handlers/delete.handler.js"
import {handleEditByAction, handleEditByText}
    from "./handlers/edit.handler.js"
import {handlePriorityByAction, handleSetPriorityByAction}
    from "./handlers/priority.handler.js"
import {handleCategoryByAction, handleSetCategoryByAction}
    from "./handlers/category.handler.js"
import {handleAddTask}
    from "./handlers/addTask.handler.js"
import {handleCreatePriority}
    from "./handlers/createPriority.handler.js"
import {handleCreateTaskText}
    from "./handlers/createTaskText.handler.js"
import {handleCreateCategory}
    from "./handlers/createCategory.handler.js"
import {handleCancelCreateTask}
    from "./handlers/cancelCreateTask.handler.js"

export function registerTaskModule(
    bot
) {

    // Commands

    bot.command(
        'addtask',
        handleAddTask
    )

    bot.command(
        'tasks',
        showTasks
    )

    bot.command(
        'done',
        handleDoneByCommand
    )

    bot.command(
        'delete',
        handleDeleteByCommand
    )

    // Create Task

    bot.action(
        /create_priority_(high|medium|low)/,
        handleCreatePriority
    )

    bot.action(
        /create_category_(.+)/,
        handleCreateCategory
    )

    // Cancel Create Task

    bot.hears(
        '❌ Cancel',
        handleCancelCreateTask
    )

    bot.action(
        'create_cancel',
        handleCancelCreateTask
    )

    // Task actions

    bot.action(
        /^done_(\d+)$/,
        handleDoneByAction
    )

    bot.action(
        /^delete_(\d+)$/,
        handleDeleteByAction
    )

    bot.action(
        /^edit_(\d+)$/,
        handleEditByAction
    )

    // Task settings

    bot.action(
        /^priority_(\d+)$/,
        handlePriorityByAction
    )

    bot.action(
        /^set_priority_(\d+)_(high|medium|low)$/,
        handleSetPriorityByAction
    )

    bot.action(
        /^category_(\d+)$/,
        handleCategoryByAction
    )

    bot.action(
        /^set_category_(\d+)_(.+)$/,
        handleSetCategoryByAction
    )

    // Navigation

    bot.action(
        /^tasks_page_(\d+)_(all|active|done)$/,
        handlePagination
    )

    bot.action(
        /^filter_(all|active|done)$/,
        handleFilter
    )

    bot.action(
        'current_page',
        (ctx) => ctx.answerCbQuery()
    )

    // Text

    bot.on(
        'text',
        async (
            ctx,
            next
        ) => {

            const handled =
                await handleCreateTaskText(
                    ctx
                )

            if (handled) {
                return
            }

            return next()
        }
    )

    bot.on(
        'text',
        handleEditByText
    )
}
