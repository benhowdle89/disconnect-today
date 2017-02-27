import ApiError from './error'
import services from './../services'
const { Users } = services
import messages from './messages'
import auth from './auth'
import tokenFromHeader from './token-from-header'

const getUserFromToken = async (req, params = {
    whitelist: false,
    api: true
}, cookieToken) => {
    const users = new Users()
    const token = cookieToken || tokenFromHeader(req)
    let userObj
    try {
        userObj = await auth.fetch(token)
    } catch (e) {
        if(token && !params.whitelist && params.api) {
            throw new ApiError(403, messages['403'])
        }
        return null
    }
    if (!userObj) {
        if(token && !params.whitelist && params.api){
            throw new ApiError(403, messages['403'])
        }
        return null
    }

    const user = await users.getById(userObj.id)
    if (!user) {
        if(token && !params.whitelist && params.api) {
            throw new ApiError(403, messages['403'])
        }
        return null
    }
    const reqUser = user.get({
        plain: true
    })
    reqUser.token = token
    return reqUser
}

export default getUserFromToken
