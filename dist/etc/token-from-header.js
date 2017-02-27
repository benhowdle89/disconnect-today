'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
var tokenFromHeader = function tokenFromHeader(req) {
    return req.body.token || req.query.token || req.headers['x-access-token'];
};

exports.default = tokenFromHeader;
module.exports = exports['default'];