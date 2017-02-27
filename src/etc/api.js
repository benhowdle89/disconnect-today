import ApiError from './error'
import auth from './auth'
import messages from './messages'
import services from './../services'
const { Users } = services

const whitelist = [
    '/api/users/login'
]

const getUserFromToken = async (req, params = {
    whitelist: false
}) => {
    const users = new Users()
    const token = hasTokenInHeader(req)
    let userObj
    try {
        userObj = await auth.fetch(token)
    } catch (e) {
        if(token && !params.whitelist) {
            throw new ApiError(403, messages['403'])
        }
        return null
    }
    if (!userObj) {
        if(token && !params.whitelist){
            throw new ApiError(403, messages['403'])
        }
        return null
    }

    const user = await users.getById(userObj.id)
    if (!user) {
        if(token && !params.whitelist) {
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

const hasTokenInHeader = (req) => {
    return req.body.token || req.query.token || req.headers['x-access-token']
}

const api = async req => {
    if(whitelist.indexOf(req.originalUrl) > -1){
        req.user = await getUserFromToken(req, { whitelist: true })
        return req
    }
    const token = hasTokenInHeader(req)
    const users = new Users()
    if (token) {
        req.user = await getUserFromToken(req)
        if(req.originalUrl == '/api/whoami'){
            return {
                data: {
                    user: req.user
                }
            }
        }
        return req
    } else {
        throw new ApiError(403, messages['403'])
    }
}

export default api
