import { logger } from './logger'

let send = ({
    to,
    type,
    data = {}
}) => {
    let { text, subject } = messages[type](data)
    const html = renderEmail({
        content: text,
        title: subject
    })
    logger.info('Sending email to, with subject', to, subject, text)
    return process.env.NODE_ENV == 'production' && sendgrid.send({
        to,
        from: 'hello@ekko.site',
        fromname: 'Ben from Ekko',
        subject,
        html
    }, (err, json) => {
        if (err) {
            return console.error(err)
        }
        logger.info('Mail response', to, json)
    })
}

module.exports = {
    send
}
