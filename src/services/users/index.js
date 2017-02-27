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
        const user = await this.db.findById(id)
        return user
    }
    async getAll() {
        return await this.db.findAll()
    }
    async getByTwitterUserId(id) {
        const user = await this.db.findOne({
            where: {
                twitterUserId: id
            }
        })
        return user
    }
    async updateSettings(id, email, frequency) {
        const updated = await this.db.update({
            email,
            frequency
        }, {
            where: {
                id
            }
        })
        return await this.getById(id)
    }
    async createUser({
        screen_name,
        id_str,
        oauthToken,
        oauthTokenSecret
    }) {
        let user
        const existing = await this.getByTwitterUserId(id_str)
        if(existing) {
            user = existing
        } else {
            try {
                user = await this.db.create({
                    twitterUsername: screen_name,
                    twitterUserId: id_str,
                    twitteroAuthToken: oauthToken,
                    twitteroAuthTokenSecret: oauthTokenSecret
                })
            } catch (e) {
                logger.error('Error creating user', e)
                return {
                    error: e
                }
            }
            logger.info('Creating user', screen_name)
        }
        let userObj = user.get({
            plain: true
        })
        userObj.token = await auth.create({
            id: userObj.id
        })
        return {
            user: userObj
        }
    }
}

export default Users
