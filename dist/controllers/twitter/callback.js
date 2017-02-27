'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _promise = require('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _secret = require('secret');

var _secret2 = _interopRequireDefault(_secret);

var _services = require('./../../services/');

var _services2 = _interopRequireDefault(_services);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Twitter = _services2.default.Twitter,
    Users = _services2.default.Users;

exports.default = function () {
    var _ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee3(req, res) {
        var twitter, users, requestToken, verifier, requestSecret;
        return _regenerator2.default.wrap(function _callee3$(_context3) {
            while (1) {
                switch (_context3.prev = _context3.next) {
                    case 0:
                        twitter = new Twitter().connection();
                        users = new Users();
                        requestToken = req.query.oauth_token;
                        verifier = req.query.oauth_verifier;
                        requestSecret = _secret2.default.get('twitter-' + requestToken);
                        return _context3.abrupt('return', new _promise2.default(function (resolve) {
                            twitter.getAccessToken(requestToken, requestSecret, verifier, function () {
                                var _ref2 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee2(error, accessToken, accessSecret) {
                                    return _regenerator2.default.wrap(function _callee2$(_context2) {
                                        while (1) {
                                            switch (_context2.prev = _context2.next) {
                                                case 0:
                                                    if (!error) {
                                                        _context2.next = 2;
                                                        break;
                                                    }

                                                    return _context2.abrupt('return', resolve({
                                                        error: error
                                                    }));

                                                case 2:
                                                    twitter.verifyCredentials(accessToken, accessSecret, function () {
                                                        var _ref3 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee(err, user) {
                                                            var screen_name, id_str, newUser;
                                                            return _regenerator2.default.wrap(function _callee$(_context) {
                                                                while (1) {
                                                                    switch (_context.prev = _context.next) {
                                                                        case 0:
                                                                            if (!err) {
                                                                                _context.next = 2;
                                                                                break;
                                                                            }

                                                                            return _context.abrupt('return', resolve({
                                                                                error: err
                                                                            }));

                                                                        case 2:
                                                                            screen_name = user.screen_name, id_str = user.id_str;
                                                                            _context.next = 5;
                                                                            return users.createUser({
                                                                                screen_name: screen_name,
                                                                                id_str: id_str,
                                                                                oauthToken: accessToken,
                                                                                oauthTokenSecret: accessSecret
                                                                            });

                                                                        case 5:
                                                                            newUser = _context.sent;
                                                                            return _context.abrupt('return', resolve({
                                                                                error: null,
                                                                                data: {
                                                                                    user: newUser.user
                                                                                }
                                                                            }));

                                                                        case 7:
                                                                        case 'end':
                                                                            return _context.stop();
                                                                    }
                                                                }
                                                            }, _callee, undefined);
                                                        }));

                                                        return function (_x6, _x7) {
                                                            return _ref3.apply(this, arguments);
                                                        };
                                                    }());

                                                case 3:
                                                case 'end':
                                                    return _context2.stop();
                                            }
                                        }
                                    }, _callee2, undefined);
                                }));

                                return function (_x3, _x4, _x5) {
                                    return _ref2.apply(this, arguments);
                                };
                            }());
                        }));

                    case 6:
                    case 'end':
                        return _context3.stop();
                }
            }
        }, _callee3, undefined);
    }));

    return function (_x, _x2) {
        return _ref.apply(this, arguments);
    };
}();

module.exports = exports['default'];