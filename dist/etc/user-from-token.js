'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _error = require('./error');

var _error2 = _interopRequireDefault(_error);

var _services = require('./../services');

var _services2 = _interopRequireDefault(_services);

var _messages = require('./messages');

var _messages2 = _interopRequireDefault(_messages);

var _auth = require('./auth');

var _auth2 = _interopRequireDefault(_auth);

var _tokenFromHeader = require('./token-from-header');

var _tokenFromHeader2 = _interopRequireDefault(_tokenFromHeader);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Users = _services2.default.Users;


var getUserFromToken = function () {
    var _ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee(req) {
        var params = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {
            whitelist: false,
            api: true
        };
        var cookieToken = arguments[2];
        var users, token, userObj, user, reqUser;
        return _regenerator2.default.wrap(function _callee$(_context) {
            while (1) {
                switch (_context.prev = _context.next) {
                    case 0:
                        users = new Users();
                        token = cookieToken || (0, _tokenFromHeader2.default)(req);
                        userObj = void 0;
                        _context.prev = 3;
                        _context.next = 6;
                        return _auth2.default.fetch(token);

                    case 6:
                        userObj = _context.sent;
                        _context.next = 14;
                        break;

                    case 9:
                        _context.prev = 9;
                        _context.t0 = _context['catch'](3);

                        if (!(token && !params.whitelist && params.api)) {
                            _context.next = 13;
                            break;
                        }

                        throw new _error2.default(403, _messages2.default['403']);

                    case 13:
                        return _context.abrupt('return', null);

                    case 14:
                        if (userObj) {
                            _context.next = 18;
                            break;
                        }

                        if (!(token && !params.whitelist && params.api)) {
                            _context.next = 17;
                            break;
                        }

                        throw new _error2.default(403, _messages2.default['403']);

                    case 17:
                        return _context.abrupt('return', null);

                    case 18:
                        _context.next = 20;
                        return users.getById(userObj.id);

                    case 20:
                        user = _context.sent;

                        if (user) {
                            _context.next = 25;
                            break;
                        }

                        if (!(token && !params.whitelist && params.api)) {
                            _context.next = 24;
                            break;
                        }

                        throw new _error2.default(403, _messages2.default['403']);

                    case 24:
                        return _context.abrupt('return', null);

                    case 25:
                        reqUser = user.get({
                            plain: true
                        });

                        reqUser.token = token;
                        return _context.abrupt('return', reqUser);

                    case 28:
                    case 'end':
                        return _context.stop();
                }
            }
        }, _callee, undefined, [[3, 9]]);
    }));

    return function getUserFromToken(_x) {
        return _ref.apply(this, arguments);
    };
}();

exports.default = getUserFromToken;
module.exports = exports['default'];