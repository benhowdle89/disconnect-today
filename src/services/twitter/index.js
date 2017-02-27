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
}

export default TwitterService
