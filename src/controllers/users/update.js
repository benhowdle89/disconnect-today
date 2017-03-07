import services from './../../services'
const { Users } = services

import ApiError from './../../etc/error'

const update = async ({ user, email, frequency, paused }) => {
    const users = new Users()
    if(!email) {
        throw new ApiError(400, 'Please fill in your email address')
    }
    if(['day', '2_days', 'week'].indexOf(frequency) === -1) {
        throw new ApiError(400, 'A valid frequency is required')
    }
    const updatedUser = await users.updateSettings(user.id, email, frequency, paused)
    return {
        user: updatedUser
    }
}

export default update
