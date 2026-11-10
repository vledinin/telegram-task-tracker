import { userRepository }
    from './user.repository.js'

export const userService = {

    async ensureUserExists(
        telegramUser
    ) {

        return userRepository.createUser({
            telegramId: telegramUser.id,
            username: telegramUser.username,
            firstName: telegramUser.first_name,
        })
    },

    async findByTelegramId(
        telegramId
    ) {
        return userRepository.findByTelegramId(
            telegramId
        )
    }
}
