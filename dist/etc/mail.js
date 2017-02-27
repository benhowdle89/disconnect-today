'use strict';

var _logger = require('./logger');

var send = function send(_ref) {
    var to = _ref.to,
        type = _ref.type,
        _ref$data = _ref.data,
        data = _ref$data === undefined ? {} : _ref$data;

    var _messages$type = messages[type](data),
        text = _messages$type.text,
        subject = _messages$type.subject;

    var html = renderEmail({
        content: text,
        title: subject
    });
    _logger.logger.info('Sending email to, with subject', to, subject, text);
    return (process && process.env && process.env.NODE_ENV || 'development') == 'production' && sendgrid.send({
        to: to,
        from: 'hello@ekko.site',
        fromname: 'Ben from Ekko',
        subject: subject,
        html: html
    }, function (err, json) {
        if (err) {
            return console.error(err);
        }
        _logger.logger.info('Mail response', to, json);
    });
};

module.exports = {
    send: send
};