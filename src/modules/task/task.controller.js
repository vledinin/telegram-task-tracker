import {showTasks} from './handlers/showTasks.handler.js'
import {handlePagination} from "./handlers/pagination.handler.js";
import {handleFilter} from "./handlers/filter.handler.js";
import {handleDoneByAction, handleDoneByCommand} from "./handlers/done.handler.js";
import {handleDeleteByAction, handleDeleteByCommand} from "./handlers/delete.handler.js";
import {handleEditByAction, handleEditByText} from "./handlers/edit.handler.js";
import {handlePriorityByAction, handleSetPriorityByAction} from "./handlers/priority.handler.js";
import {handleCategoryByAction, handleSetCategoryByAction} from "./handlers/category.handler.js";
import {handleAddTask} from "./handlers/addTask.handler.js";

export function registerTaskModule(bot) {

    // Commands

    bot.command(
        'addtask',
        handleAddTask
    )

    bot.command('tasks',
        async (ctx) => {
        await showTasks(ctx)
    })

    bot.command(
        'done',
        handleDoneByCommand
    )

    bot.command(
        'delete',
        handleDeleteByCommand
    )

    // Task actions

    bot.action(
        /done_(.+)/,
        async (ctx) => {

            const taskId =
                Number(ctx.match[1])

            await handleDoneByAction(
                ctx,
                taskId
            )
        }
    )

    bot.action(
        /delete_(.+)/,
        async (ctx) => {

            const taskId =
                Number(ctx.match[1])

            await handleDeleteByAction(
                ctx,
                taskId
            )
        }
    )

    bot.action(
        /edit_(.+)/,
        async (ctx) => {

            const taskId =
                Number(ctx.match[1])

            await handleEditByAction(
                ctx,
                taskId
            )
        }
    )

    // Task settings

    bot.action(
        /^priority_(\d+)$/,
        async (ctx) => {
            const taskId = Number(ctx.match[1])

            await handlePriorityByAction(
                ctx,
                taskId
            )
        }
    )

    bot.action(
        /set_priority_(\d+)_(high|medium|low)/,
        async (ctx) => {

            const taskId =
                Number(ctx.match[1])

            const priority =
                ctx.match[2]

            await handleSetPriorityByAction(
                ctx,
                taskId,
                priority
            )
        }
    )

    bot.action(
        /^category_(\d+)$/,
        async (ctx) => {

            const taskId =
                Number(ctx.match[1])

            await handleCategoryByAction(
                ctx,
                taskId
            )
        }
    )

    bot.action(
        /^set_category_(\d+)_(.+)$/,
        async (ctx) => {

            const taskId =
                Number(ctx.match[1])

            const category =
                ctx.match[2]

            await handleSetCategoryByAction(
                ctx,
                taskId,
                category
            )
        }
    )

    // Navigation

    bot.action(/tasks_page_(\d+)_(all|active|done)/,
        async (ctx) => {

            const page = Number(ctx.match[1])

            const filter = ctx.match[2]

            await handlePagination(
                ctx,
                page,
                filter
            )
        }
    )

    bot.action(/filter_(all|active|done)/,
        async (ctx) => {

            const page = 1

            const filter = ctx.match[1]

            await handleFilter(
                ctx,
                page,
                filter
            )
        }
    )

    bot.action('current_page', async (ctx) => {
        await ctx.answerCbQuery()
    })

    // Text

    bot.on(
        'text',
        handleEditByText
    )
}
