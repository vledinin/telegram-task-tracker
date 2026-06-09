import { Markup } from 'telegraf'

export function buildTasksMessage(
    tasks,
    page,
    filter
){
    let message =
        `📄 Tasks — Page ${page}\n` +
        `Filter: ${filter}\n\n`

    for (const task of tasks) {
        const status = task.is_done ? '✅' : '❌'

        message += `${status} ${task.id}. ${task.title}\n\n`
    }

    return message
}

export function buildTasksKeyboard(
    tasks,
    page,
    filter = 'all'
) {
    const keyboard = []

    keyboard.push([
        Markup.button.callback(
            filter === 'all'
                ? '✅ All'
                : 'All',
            'filter_all'
        ),

        Markup.button.callback(
            filter === 'active'
                ? '✅ Active'
                : 'Active',
            'filter_active'
        ),

        Markup.button.callback(
            filter === 'done'
                ? '✅ Done'
                : 'Done',
            'filter_done'
        ),
    ])

    for (const task of tasks) {
        keyboard.push([
            Markup.button.callback(
                `✅ Done ${task.id}`,
                `done_${task.id}`
            ),

            Markup.button.callback(
                `🗑 Delete ${task.id}`,
                `delete_${task.id}`
            ),
        ])
    }

    keyboard.push([
        Markup.button.callback(
            '⬅ Prev',
            `tasks_page_${page - 1}_${filter}`,
        ),

        Markup.button.callback(
            `📄 ${page}`,
            'current_page'
        ),

        Markup.button.callback(
            'Next ➡',
            `tasks_page_${page + 1}_${filter}`,
        ),
    ])

    return Markup.inlineKeyboard(keyboard)
}
