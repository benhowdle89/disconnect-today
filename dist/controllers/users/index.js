'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _get = require('./get');

var _get2 = _interopRequireDefault(_get);

var _signUp = require('./sign-up');

var _signUp2 = _interopRequireDefault(_signUp);

var _login = require('./login');

var _login2 = _interopRequireDefault(_login);

var _stripe = require('./stripe');

var _stripe2 = _interopRequireDefault(_stripe);

var _update = require('./update');

var _update2 = _interopRequireDefault(_update);

var _cancel = require('./cancel');

var _cancel2 = _interopRequireDefault(_cancel);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
    '/api/users/sign-up': _signUp2.default,
    '/api/users/login': _login2.default,
    '/api/users/upgrade': _stripe2.default.upgrade,
    '/api/users/update': _update2.default,
    '/api/users/cancel': _cancel2.default
};
module.exports = exports['default'];