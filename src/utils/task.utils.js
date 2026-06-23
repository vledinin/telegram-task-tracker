import { Markup } from 'telegraf'

export function buildTasksMessage(
    tasks,
    currentPage,
    totalPages,
    filter
) {
    let message =
        `📄 Tasks — Page ${currentPage}/${totalPages}\n` +
        `Filter: ${filter}\n\n`

    for (const task of tasks) {
        const status =
            task.is_done ? '✅' : '❌'

        const isOverdue =
            !task.is_done &&
            task.due_date &&
            new Date(task.due_date) < new Date()

        let priorityIcon = '🟡'

        if (task.priority === 'high') {
            priorityIcon = '🔴'
        }

        if (task.priority === 'low') {
            priorityIcon = '🟢'
        }

        message +=
            `${priorityIcon} ${status} ${task.id}. ${task.title}\n`

        if (task.due_date) {
            const dueDate =
                new Date(task.due_date)
                    .toISOString()
                    .split('T')[0]

            if (isOverdue) {
                message +=
                    '⚠ OVERDUE\n'
            }

            message +=
                `📅 ${dueDate}\n`
        }

        message += '\n'
    }

    return message
}

export function buildTasksKeyboard(
    tasks,
    currentPage,
    totalPages,
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
                `✏ Edit ${task.id}`,
                `edit_${task.id}`
            ),

            Markup.button.callback(
                `⭐ Priority`,
                `priority_${task.id}`
            ),

            Markup.button.callback(
                `🗑 Delete ${task.id}`,
                `delete_${task.id}`
            ),
        ])
    }

    const paginationRow = []

    if (currentPage > 1) {
        paginationRow.push(
            Markup.button.callback(
                '⬅ Prev',
                `tasks_page_${currentPage - 1}_${filter}`
            )
        )
    }

    paginationRow.push(
        Markup.button.callback(
            `📄 ${currentPage}/${totalPages}`,
            'current_page'
        )
    )

    if (currentPage < totalPages) {
        paginationRow.push(
            Markup.button.callback(
                'Next ➡',
                `tasks_page_${currentPage + 1}_${filter}`
            )
        )
    }

    keyboard.push(paginationRow)

    return Markup.inlineKeyboard(keyboard)
}
