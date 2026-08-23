import { Markup }
    from 'telegraf'

export const mainKeyboard =
    Markup.keyboard([
        ['📋 My Tasks', '➕ Add Task'],
        ['📊 Statistics', '❓ Help'],
    ]).resize()
