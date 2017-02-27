import auth from './../../etc/auth'
import services from './../../services/'
const { Users } = services
import ApiError from './../../etc/error'

const SignUp = async ({ email, password, firstName, lastName, fbInfo = {} }) => {

    if (!email || !password || !firstName || !lastName) {
        throw new ApiError(400, 'Please complete all fields to sign up')
    }
    if(password.length < 6){
        throw new ApiError(400, 'Password must be at least 6 characters long')
    }
    if(email.length > 254){
        throw new ApiError(400, 'Email too long')
    }
    if(password.length > 254){
        throw new ApiError(400, 'Password too long')
    }
    const users = new Users()
    const { user, error } = await users.createUser(email, firstName, lastName, password)
    if(error){
        throw new ApiError(400, ((error.errors || [])[0] || {}).message)
    }
    Slack.newSignUp({
        name: `${firstName} ${lastName}`,
        email
    })
    const userObject = user.get({ plain: true })
    const token = await auth.create({
        id: userObject.id
    })
    userObject.token = token
    if(!fbInfo.id){
        return {
            user: userObject
        }
    }
    const { fbUser, error: fbError } = await users.connectUserToFacebook(userObject.id, fbInfo.id, fbInfo.accessToken)
    if(fbError){
        return {
            error: fbError
        }
    }
    let fbUserObj = fbUser.get({ plain: true })
    return {
        user: {
            ...fbUserObj,
            token: userObject.token
        }
    }
}

export default SignUp
