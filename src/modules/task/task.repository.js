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
    }
}
