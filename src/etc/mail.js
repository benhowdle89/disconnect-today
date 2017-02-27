import AWS from 'aws-sdk'
AWS.config.setPromisesDependency(null)
AWS.config.region = 'eu-west-1'

const ses = new AWS.SES({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    apiVersion: '2010-12-01'
})

import { logger } from './logger'
import renderEmail from './render-email'

let send = ({
    to,
    data = {}
}) => {
    const html = renderEmail({
        mentions: data.mentions,
        dms: data.dms,
        frequency: data.frequency
    })
    logger.info('Sending email', to)
    const sendEmail = () => {
        const params = {
            Destination: {
                ToAddresses: [to]
            },
            Message: {
                Body: {
                    Html: {
                        Data: html
                    }
                },
                Subject: {
                    Data: 'New Twitter digest from Disconnect Today'
                }
            },
            Source: 'hello@disconnect.today',
            ReplyToAddresses: ['hello@disconnect.today'],
            ReturnPath: 'hello@disconnect.today',
        }
        ses.sendEmail(params, (err, data) => {
            if(err) {
                logger.error(err)
                return
            }
            return logger.info('Email sent', to)
        })
    }
    return process.env.NODE_ENV == 'production' || sendEmail()
}

module.exports = {
    send
}
