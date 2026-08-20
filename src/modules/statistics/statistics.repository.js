import { pool } from '../../config/db.js'

export const statisticsRepository = {

    async getUserStatistics(
        userId
    ) {

        const query = `
            SELECT
                COUNT(*) AS total_tasks,
                COUNT(*) FILTER (
                    WHERE is_done = true
                ) AS completed_tasks,
                COUNT(*) FILTER (
                    WHERE is_done = false
                ) AS active_tasks,
                COUNT(*) FILTER (
                    WHERE is_done = false
                    AND due_date < CURRENT_DATE
                ) AS overdue_tasks
            FROM tasks
            WHERE user_id = $1
        `

        const result =
            await pool.query(
                query,
                [userId]
            )

        return result.rows[0]
    },

    async getTasksByCategory(userId) {

        const query = `
        SELECT
            category,
            COUNT(*) AS count
        FROM tasks
        WHERE user_id = $1
        GROUP BY category
        ORDER BY count DESC
    `

        const result =
            await pool.query(
                query,
                [userId]
            )

        return result.rows
    },

    async getTasksByPriority(userId) {

        const query = `
        SELECT
            priority,
            COUNT(*) AS count
        FROM tasks
        WHERE user_id = $1
        GROUP BY priority
        ORDER BY count DESC
    `

        const result =
            await pool.query(
                query,
                [userId]
            )

        return result.rows
    }
}
