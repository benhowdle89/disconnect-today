'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _services = require('./../../services');

var _services2 = _interopRequireDefault(_services);

var _error = require('./../../etc/error');

var _error2 = _interopRequireDefault(_error);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Users = _services2.default.Users;


var login = function () {
    var _ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee(_ref2) {
        var email = _ref2.email,
            password = _ref2.password;
        var users, user;
        return _regenerator2.default.wrap(function _callee$(_context) {
            while (1) {
                switch (_context.prev = _context.next) {
                    case 0:
                        users = new Users();

                        if (!(!email || !password)) {
                            _context.next = 3;
                            break;
                        }

                        throw new _error2.default(400, 'Please complete all fields');

                    case 3:
                        if (!(email.length > 254)) {
                            _context.next = 5;
                            break;
                        }

                        throw new _error2.default(400, 'Email too long');

                    case 5:
                        _context.next = 7;
                        return users.logUserIn(email, password);

                    case 7:
                        user = _context.sent;
                        return _context.abrupt('return', {
                            user: user
                        });

                    case 9:
                    case 'end':
                        return _context.stop();
                }
            }
        }, _callee, undefined);
    }));

    return function login(_x) {
        return _ref.apply(this, arguments);
    };
}();

exports.default = login;
module.exports = exports['default'];