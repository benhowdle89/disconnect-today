import moment from 'moment'
import Services from './../services/'
const { Twitter, Users } = Services;
import { logger } from './../etc/logger'
import mail from './../etc/mail'

const frequencyToDays = frequency => {
    if(frequency == 'day') {
        return 1
    }
    if(frequency == '2 days') {
        return 2
    }
    return 7
}

const updateLastFetchedFromTwitter = async user => {
    user.lastFetchedFromTwitter = new Date()
    return await user.save()
}

(async () => {
    const users = new Users()
    const twitter = new Twitter()
    const allUsers = await users.getAll()
    return Promise.all(allUsers.map(async (user) => {
        const lastFetchedFromTwitterInDays = user.lastFetchedFromTwitter ? moment().diff(moment(user.lastFetchedFromTwitter), 'days') : 0
        if(lastFetchedFromTwitterInDays !== 0 && lastFetchedFromTwitterInDays <= frequencyToDays(user.frequency)) {
            return
        }
        const accessToken = user.twitteroAuthToken
        const accessTokenSecret = user.twitteroAuthTokenSecret
        const dms = await twitter.getDMs({
            accessToken,
            accessTokenSecret
        })
        const filteredDms = dms.filter(dm => {
            const dmAgeInDays = moment().diff(moment(dm.created_at), 'days')
            return dmAgeInDays <= frequencyToDays(user.frequency)
        })
        const mentions = await twitter.getMentions({
            accessToken,
            accessTokenSecret
        })
        const filteredMentions = mentions.filter(mention => {
            const mentionAgeInDays = moment().diff(moment(mention.created_at), 'days')
            return mentionAgeInDays <= frequencyToDays(user.frequency)
        })
        await updateLastFetchedFromTwitter(user)
        if(filteredMentions.length || filteredDms.length) {
            mail.send({
                to: user.email,
                data: {
                    frequency: user.frequency,
                    dms: filteredDms,
                    mentions: filteredMentions
                }
            })
        }
    }))
})()
