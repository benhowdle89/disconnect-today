import services from './../../services'
const { Users } = services

import ApiError from './../../etc/error'

const cancel = async ({ user }) => {
    const users = new Users()
    await users.remove(user.id)
    return { }
}

export default cancel
