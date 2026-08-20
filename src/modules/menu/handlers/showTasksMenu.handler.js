import { showTasks } from '../../task/handlers/showTasks.handler.js'

export async function handleShowTasks(ctx) {
    await showTasks(ctx)
}
