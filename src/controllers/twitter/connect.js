import secret from 'secret'

import Services from './../../services/'
const { Twitter } = Services

export default async (req, res) => {
    const twitter = new Twitter().connection()
    twitter.getRequestToken((error, requestToken, requestSecret) => {
        if(error) {
            return res.send(500)
        }
        secret.set(`twitter-${requestToken}`, requestSecret)
        res.redirect("https://api.twitter.com/oauth/authenticate?oauth_token=" + requestToken)
    })
}
