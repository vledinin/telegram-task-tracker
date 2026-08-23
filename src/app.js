import 'dotenv/config'
import { loadBot }
    from './loaders/bot.loader.js'
import { pool }
    from './config/db.js'

async function start() {

    try {

        const result =
            await pool.query(
            'SELECT NOW()'
        )

        console.log(
            'Database connected'
        )

        console.log(
            result.rows[0]
        )

    } catch (err) {

        console.error(
            'Database connection error:',
            err
        )
    }

    const bot = await loadBot()

    bot.catch((err) => {

        console.error(
            'Bot error:',
            err
        )
    })

    console.log(
        'Starting bot...'
    )

    bot.launch() // с await блокируется лог

    console.log(
        'Bot started'
    )

    process.once('SIGINT', () => bot.stop('SIGINT'))
    process.once('SIGTERM', () => bot.stop('SIGTERM'))
}

start()
