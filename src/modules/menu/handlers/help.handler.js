export async function handleShowHelp(
    ctx
) {

    const message = `
🤖 Task Tracker Bot

📋 My Tasks
Show all your tasks.

➕ Add Task
Create a new task.

📊 Statistics
Statistics (coming soon).

❓ Help
Show this help message.

⌨ You can also use commands:

/tasks
/addtask
/done
/delete
`

    await ctx.reply(
        message
    )
}
