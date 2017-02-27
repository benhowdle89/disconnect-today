'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _post = require('./post');

var _post2 = _interopRequireDefault(_post);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
    '/stripe/webhook': _post2.default
};
module.exports = exports['default'];