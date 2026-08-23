import { pool }
    from '../../config/db.js'

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

        return {
            totalTasks:
                Number(result.rows[0].total_tasks),

            completedTasks:
                Number(result.rows[0].completed_tasks),

            activeTasks:
                Number(result.rows[0].active_tasks),

            overdueTasks:
                Number(result.rows[0].overdue_tasks),
        }
    },

    async getTasksByCategory(
        userId
    ) {

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

        return result.rows.map(
            ({ category, count }) => ({
                category,
                count: Number(count),
            })
        )
    },

    async getTasksByPriority(
        userId
    ) {

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

        return result.rows.map(
            ({ priority, count }) => ({
                priority,
                count: Number(count),
            })
        )
    }
}
