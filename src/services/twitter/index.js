import Twitter from 'node-twitter-api'

const callback = process.env.NODE_ENV == 'production' ? 'https://disconnect.today/api/twitter-callback' : 'http://localhost:5000/api/twitter-callback'

class TwitterService {
    connection() {
        return new Twitter({
            consumerKey: process.env.TWITTER_CONSUMER_KEY,
            consumerSecret: process.env.TWITTER_CONSUMER_SECRET,
            callback
        })
    }
    async getDMs({
        accessToken,
        accessTokenSecret
    }) {
        return new Promise(async resolve => {
            this.connection().direct_messages("", {
                count: 200
            }, accessToken, accessTokenSecret, (error, data, response) => {
                resolve(data.map(dm => {
                    return {
                        from: {
                            name: dm.sender_screen_name,
                            avatar: dm.sender.profile_image_url
                        },
                        text: dm.text,
                        created_at: dm.created_at
                    }
                }))
            })
        })
    }
    getMentions() {

    }
}

export default TwitterService
