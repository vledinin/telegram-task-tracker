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

export function buildTasksKeyboard(tasks, page) {
    const keyboard = []

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
            `tasks_page_${page - 1}`
        ),

        Markup.button.callback(
            `📄 ${page}`,
            'current_page'
        ),

        Markup.button.callback(
            'Next ➡',
            `tasks_page_${page + 1}`
        ),
    ])

    return Markup.inlineKeyboard(keyboard)
}
