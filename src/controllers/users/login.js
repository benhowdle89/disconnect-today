import services from './../../services'
const { Users } = services

import ApiError from './../../etc/error'

const login = async ({ email, password }) => {
    const users = new Users()
    if (!email || !password) {
        throw new ApiError(400, 'Please complete all fields')
    }
    if(email.length > 254){
        throw new ApiError(400, 'Email too long')
    }
    const user = await users.logUserIn(email, password)
    return {
        user
    }
}

export default login
