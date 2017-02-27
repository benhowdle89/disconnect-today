// server.js

// BASE SETUP
// ==============================================

import express from 'express'
import bodyParser from 'body-parser'
import { logger } from './etc/logger'
import router from './etc/router'
import compression from 'compression'
import cookieParser from 'cookie-parser'
import userFromToken from './etc/user-from-token'

const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
    extended: false
}))
app.use(cookieParser())
app.use(compression())

app.use(express.static(__dirname + '/public'))
app.set('views', __dirname + '/views')
app.set('view engine', 'jade')

app.use((req, res, next) => {
    logger.info('REQUEST', req.url, req.method)
    next()
})

const renderIndex = (res, loggedIn) => {
    res.render('index', {
        API_URL: process.env.API_URL,
        NODE_ENV: process.env.NODE_ENV,
        STRIPE_TOKEN: process.env.STRIPE_TOKEN,
        LOGGED_IN: loggedIn
    })
}

const render = async (res, authToken, req) => {
    if(authToken){
        const user = await userFromToken(req, { api: false }, authToken)
        if(!user){
            return renderIndex(res, false)
        }
        return renderIndex(res, user)
    } else {
        renderIndex(res, false)
    }
}

app.use('*', (req, res, next) => {
    const url = req.originalUrl
    if(!(url.match(/api/))) {
        const authToken = req.cookies['auth-token'] || null
        return render(res, authToken, req)
    }
    return router(req, res, next)
})

export default app
