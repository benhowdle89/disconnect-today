'use strict';

var _awsSdk = require('aws-sdk');

var _awsSdk2 = _interopRequireDefault(_awsSdk);

var _logger = require('./logger');

var _renderEmail = require('./render-email');

var _renderEmail2 = _interopRequireDefault(_renderEmail);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_awsSdk2.default.config.setPromisesDependency(null);
_awsSdk2.default.config.region = 'eu-west-1';

var ses = new _awsSdk2.default.SES({
    accessKeyId: process && process.env && process.env.AWS_ACCESS_KEY_ID || 'AKIAI74ZK45GBN2TGLOA AWS_SECRET_ACCESS_KEY=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',
    secretAccessKey: process && process.env && process.env.AWS_SECRET_ACCESS_KEY || undefined,
    apiVersion: '2010-12-01'
});

var send = function send(_ref) {
    var to = _ref.to,
        _ref$data = _ref.data,
        data = _ref$data === undefined ? {} : _ref$data;

    var html = (0, _renderEmail2.default)({
        mentions: data.mentions,
        dms: data.dms,
        frequency: data.frequency
    });
    _logger.logger.info('Sending email', to);
    var sendEmail = function sendEmail() {
        var params = {
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
            ReturnPath: 'hello@disconnect.today'
        };
        ses.sendEmail(params, function (err, data) {
            if (err) {
                _logger.logger.error(err);
                return;
            }
            return _logger.logger.info('Email sent', to);
        });
    };
    return (process && process.env && process.env.NODE_ENV || 'development') == 'production' || sendEmail();
};

module.exports = {
    send: send
};