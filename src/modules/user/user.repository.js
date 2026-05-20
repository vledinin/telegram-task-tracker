import { pool } from '../../config/db.js'

export const userRepository = {
    async createUser(userData) {
        const { telegramId, username, firstName } = userData

        const query = `
            INSERT INTO users (
                telegram_id,
                username,
                first_name
            )
            VALUES ($1, $2, $3)
            ON CONFLICT (telegram_id) DO NOTHING
            RETURNING *
        `

        const values = [
            telegramId,
            username,
            firstName,
        ]

        const result = await pool.query(query, values)

        return result.rows[0]
    },

    async findByTelegramId(telegramId) {
        const query = `
        SELECT *
        FROM users
        WHERE telegram_id = $1
    `

        const result = await pool.query(query, [telegramId])

        return result.rows[0]
    }
}
