import { userRepository } from './user.repository.js'

export const userService = {
    async ensureUserExists(ctx) {
        const telegramUser = ctx.from

        const user =
            await userRepository.createUser({
                telegramId: telegramUser.id,
                username: telegramUser.username,
                firstName: telegramUser.first_name,
            })

        console.log('Saved user:', user)

        return user
    }
}
