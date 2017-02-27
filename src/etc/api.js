import ApiError from './error'
import tokenFromHeader from './token-from-header'
import getUserFromToken from './user-from-token'

const whitelist = [
    '/api/users/login'
]

const api = async req => {
    if(whitelist.indexOf(req.originalUrl) > -1){
        req.user = await getUserFromToken(req, { whitelist: true })
        return req
    }
    const token = tokenFromHeader(req)
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
