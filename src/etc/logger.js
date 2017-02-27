import winston from 'winston'

const env = process.env.NODE_ENV || 'development'

const tsFormat = () => (new Date()).toLocaleTimeString()

let logger
if (env === 'test') {
  logger = new (winston.Logger)()
} else {
  logger = new (winston.Logger)({
    transports: [
      // colorize the output to the console
      new (winston.transports.Console)({
        timestamp: tsFormat,
        colorize: true,
        level: 'info',
      }),
    ],
  })
}

export default { logger }
