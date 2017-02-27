'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _secret = require('secret');

var _secret2 = _interopRequireDefault(_secret);

var _services = require('./../../services/');

var _services2 = _interopRequireDefault(_services);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Twitter = _services2.default.Twitter;

exports.default = function () {
    var _ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee(req, res) {
        var twitter;
        return _regenerator2.default.wrap(function _callee$(_context) {
            while (1) {
                switch (_context.prev = _context.next) {
                    case 0:
                        twitter = new Twitter().connection();

                        twitter.getRequestToken(function (error, requestToken, requestSecret) {
                            if (error) {
                                return res.send(500);
                            }
                            _secret2.default.set('twitter-' + requestToken, requestSecret);
                            res.redirect("https://api.twitter.com/oauth/authenticate?oauth_token=" + requestToken);
                        });

                    case 2:
                    case 'end':
                        return _context.stop();
                }
            }
        }, _callee, undefined);
    }));

    return function (_x, _x2) {
        return _ref.apply(this, arguments);
    };
}();

module.exports = exports['default'];