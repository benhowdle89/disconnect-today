// server.js

// BASE SETUP
// ==============================================

import express from 'express'
import bodyParser from 'body-parser'
import { logger } from './etc/logger'
import router from './etc/router'

const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
    extended: false
}))

app.use((req, res, next) => {
    logger.info('REQUEST', req.url, req.method)
    next()
})

app.use('*', (req, res, next) => {
    return router(req, res, next, ravenClient)
})

export default app
