import moment from 'moment'

import auth from './../../etc/auth'
import ApiError from './../../etc/error'
import mail from './../../etc/mail'
import models from './../../models/'
const { User } = models
import { logger } from './../../etc/logger'

class Users {
    constructor(db) {
        this.db = db || User
    }
    async getById(id) {
        const user = await this.db.findById(id, {
            include: [ StripeCustomerId ],
            attributes: { exclude: ['password'] }
        })
        return user
    }
    async getByFacebookId(facebookUserId) {
        const user = await this.db.findOne({
            where: {
                facebookUserId
            },
            attributes: { exclude: ['password'] }
        })
        return user
    }
    async getByEmail(email) {
        const user = await this.db.findOne({
            where: {
                email
            },
            include: [ StripeCustomerId ]
        })
        return user
    }
    async remove(userId) {
        return await this.db.destroy({
            where: {
                id: userId
            }
        })
    }
    async logUserIn(email, password) {
        email = email.toLowerCase()
        const user = await this.getByEmail(email)
        if(!user) {
            throw new ApiError(404, 'User not found')
        }
        const correctPassword = bcrypt.compareSync(password, user.get('password'))
        if(!correctPassword) {
            throw new ApiError(400, 'Wrong password')
        }
        let userObj = user.get({
            plain: true
        })
        userObj.token = await auth.create({
            id: userObj.id
        })
        logger.info('Logging user in', email)
        return userObj
    }
    async createUser(email, firstName, lastName, password) {
        const hashedPassword = this.hashUserPassword(password.trim())
        let user,
            freeTrialEnd = moment().add(14, 'days').format('YYYY-MM-DD')
        email = email.toLowerCase().trim()
        try {
            user = await this.db.create({
                email,
                firstName,
                lastName,
                password: hashedPassword,
                freeTrialEnd
            })
        } catch (e) {
            logger.error('Error creating user', e)
            return {
                error: e
            }
        }
        logger.info('Creating user', firstName, lastName, email)
        this.sendWelcomeEmail(email, `${firstName} ${lastName}`)
        return {
            error: null,
            user
        }
    }
    hashUserPassword(password) {
        let hashed
        try {
            hashed = bcrypt.hashSync(password, 10)
        } catch (e) {
            throw new ApiError(400, 'Error with password')
        }
        return hashed
    }
    async upgradeUser(id) {
        const updated = await this.db.update({
            full_user: true
        }, {
            where: {
                id
            }
        })
        const user = await this.getById(id)
        return user
    }
    async sendWelcomeEmail(email, name) {
        return await mail.send({
            to: email,
            type: 'signUp',
            data: {
                name
            }
        })
    }
    async updateUserWithFbId(userId, facebookUserId) {
        const updated = await this.db.update({
            facebookUserId
        }, {
            where: {
                id: userId
            }
        })
        const user = await this.db.findById(userId)
        return user
    }
    async connectUserToFacebook(userId, facebookUserId, accessToken) {
        const facebook = new Facebook()
        const facebookTokens = new FacebookTokens()
        const { access_token, error } = await facebook.extendToken(accessToken)
        const token = await facebookTokens.create(access_token, userId)
        const user = await this.updateUserWithFbId(userId, facebookUserId)
        return {
            error: null,
            fbUser: user
        }
    }
    async updateLastPagesFetchFromFacebook(userId) {
        const updated = await this.db.update({
            lastPagesFetchFromFacebook: moment().format('YYYY-MM-DD')
        }, {
            where: {
                id: userId
            }
        })
    }
    async resetPassord(reset_hash, new_password) {
        const user = await this.db.findOne({
            where: {
                passwordResetHash: reset_hash
            }
        })
        if(!user) {
            throw new ApiError(403, 'Wrong password reset token')
        }
        if(new_password.length < 6){
            throw new ApiError(400, 'Password must be at least 6 characters long')
        }
        const hashedPassword = this.hashUserPassword(new_password)
        logger.info('Changing user password', user.id)
        const updated = await this.db.update({
            password: hashedPassword
        }, {
            where: {
                id: user.id
            }
        })
        return updated
    }
    async changePassword(id, current_password, new_password) {
        const user = await this.db.findById(id)
        if(!user) {
            throw new ApiError(404, 'User not found')
        }
        if(new_password.length < 6){
            throw new ApiError(400, 'Password must be at least 6 characters long')
        }
        const correctPassword = bcrypt.compareSync(current_password, user.get('password'))
        if(!correctPassword) {
            throw new ApiError(400, 'Wrong current password')
        }
        const hashedPassword = this.hashUserPassword(new_password)
        logger.info('Changing user password', id)
        const updated = await this.db.update({
            password: hashedPassword
        }, {
            where: {
                id
            }
        })
        return updated
    }

    async requestPasswordReset(email) {
        const user = await this.getByEmail(email)
        if(!user) {
            throw new ApiError(403, 'User not found')
        }
        await mail.send({
            to: email,
            type: 'forgotPassword',
            data: {
                reset_hash: user.passwordResetHash
            }
        })
        return { }
    }

    async failedFBFetch({ pageId }) {
        const pages = new Pages()
        const page = await pages.getByFacebookId(pageId)
        if(!page){
            logger.info('Couldn\'t find page', pageId)
            return
        }
        const { UserId } = page
        const user = await this.getById(UserId)
        if(!user) {
            logger.info('Couldn\'t find user', UserId)
            return
        }
        return await mail.send({
            to: user.get('email'),
            type: 'failedFBFetch'
        })
    }
}

export default Users
