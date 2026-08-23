import { userService }
    from '../../user/user.service.js'
import { mainKeyboard }
    from '../../../keyboards/main.keyboard.js'

export async function handleStart(
    ctx
) {

    console.log(
        '/start handler'
    )

    await userService.ensureUserExists(
        ctx.from
    )

    await ctx.reply(
        'Welcome to Task Tracker!',
        mainKeyboard
    )
}
