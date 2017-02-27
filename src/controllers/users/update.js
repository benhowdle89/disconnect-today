import services from './../../services'
const { Users } = services

import ApiError from './../../etc/error'

const update = async ({ user, email, frequency }) => {
    const users = new Users()
    const updatedUser = await users.updateSettings(user.id, email, frequency)
    return {
        user: updatedUser
    }
}

export default update
