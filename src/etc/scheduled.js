import moment from 'moment'
import Services from './../services/'
const { Twitter, Users } = Services;

const frequencyToDays = frequency => {
    if(frequency == 'day') {
        return 1
    }
    if(frequency == '2 days') {
        return 2
    }
    return 7
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
        console.log(filteredDms)
    }))
})()
