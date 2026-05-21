import { pool } from '../../config/db.js'

export const taskRepository = {
    async createTask(taskData) {
        const { userId, title } = taskData

        const query = `
            INSERT INTO tasks (
                user_id,
                title
            )
            VALUES ($1, $2)
            RETURNING *
        `

        const values = [userId, title]

        const result = await pool.query(query, values)

        return result.rows[0]
    },

    async getUserTasks(userId) {
        const query = `
        SELECT *
        FROM tasks
        WHERE user_id = $1
        ORDER BY created_at DESC
    `

        const result = await pool.query(query, [userId])

        return result.rows
    },

    async markTaskDone(taskId, userId) {
        const query = `
        UPDATE tasks
        SET is_done = TRUE
        WHERE id = $1
          AND user_id = $2
        RETURNING *
    `

        const values = [taskId, userId]

        const result = await pool.query(query, values)

        return result.rows[0]
    }
}
