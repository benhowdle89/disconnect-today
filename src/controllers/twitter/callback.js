import secret from 'secret'

import Services from './../../services/'
const { Twitter, Users } = Services

export default async (req, res) => {
    const twitter = new Twitter().connection()
    const users = new Users()
    const requestToken = req.query.oauth_token
    const verifier = req.query.oauth_verifier
    const requestSecret = secret.get(`twitter-${requestToken}`)
    return new Promise((resolve) => {
        twitter.getAccessToken(requestToken, requestSecret, verifier, async (error, accessToken, accessSecret) => {
            if(error) {
                return resolve({
                    error
                })
            }
            twitter.verifyCredentials(accessToken, accessSecret, async (err, user) => {
                if(err) {
                    return resolve({
                        error: err
                    })
                }
                const { screen_name, id_str } = user
                const newUser = await users.createUser({
                    screen_name,
                    id_str,
                    oauthToken: accessToken,
                    oauthTokenSecret: accessSecret
                })
                return resolve({
                    error: null,
                    data: {
                        user: newUser.user
                    }
                })
            })
        })
    })
}
