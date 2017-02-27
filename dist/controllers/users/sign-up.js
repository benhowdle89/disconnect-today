'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _auth = require('./../../etc/auth');

var _auth2 = _interopRequireDefault(_auth);

var _services = require('./../../services/');

var _services2 = _interopRequireDefault(_services);

var _error = require('./../../etc/error');

var _error2 = _interopRequireDefault(_error);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Users = _services2.default.Users;


var SignUp = function () {
    var _ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee(_ref2) {
        var email = _ref2.email,
            password = _ref2.password,
            firstName = _ref2.firstName,
            lastName = _ref2.lastName,
            _ref2$fbInfo = _ref2.fbInfo,
            fbInfo = _ref2$fbInfo === undefined ? {} : _ref2$fbInfo;

        var users, _ref3, user, error, userObject, token, _ref4, fbUser, fbError, fbUserObj;

        return _regenerator2.default.wrap(function _callee$(_context) {
            while (1) {
                switch (_context.prev = _context.next) {
                    case 0:
                        if (!(!email || !password || !firstName || !lastName)) {
                            _context.next = 2;
                            break;
                        }

                        throw new _error2.default(400, 'Please complete all fields to sign up');

                    case 2:
                        if (!(password.length < 6)) {
                            _context.next = 4;
                            break;
                        }

                        throw new _error2.default(400, 'Password must be at least 6 characters long');

                    case 4:
                        if (!(email.length > 254)) {
                            _context.next = 6;
                            break;
                        }

                        throw new _error2.default(400, 'Email too long');

                    case 6:
                        if (!(password.length > 254)) {
                            _context.next = 8;
                            break;
                        }

                        throw new _error2.default(400, 'Password too long');

                    case 8:
                        users = new Users();
                        _context.next = 11;
                        return users.createUser(email, firstName, lastName, password);

                    case 11:
                        _ref3 = _context.sent;
                        user = _ref3.user;
                        error = _ref3.error;

                        if (!error) {
                            _context.next = 16;
                            break;
                        }

                        throw new _error2.default(400, ((error.errors || [])[0] || {}).message);

                    case 16:
                        Slack.newSignUp({
                            name: firstName + ' ' + lastName,
                            email: email
                        });
                        userObject = user.get({ plain: true });
                        _context.next = 20;
                        return _auth2.default.create({
                            id: userObject.id
                        });

                    case 20:
                        token = _context.sent;

                        userObject.token = token;

                        if (fbInfo.id) {
                            _context.next = 24;
                            break;
                        }

                        return _context.abrupt('return', {
                            user: userObject
                        });

                    case 24:
                        _context.next = 26;
                        return users.connectUserToFacebook(userObject.id, fbInfo.id, fbInfo.accessToken);

                    case 26:
                        _ref4 = _context.sent;
                        fbUser = _ref4.fbUser;
                        fbError = _ref4.error;

                        if (!fbError) {
                            _context.next = 31;
                            break;
                        }

                        return _context.abrupt('return', {
                            error: fbError
                        });

                    case 31:
                        fbUserObj = fbUser.get({ plain: true });
                        return _context.abrupt('return', {
                            user: (0, _extends3.default)({}, fbUserObj, {
                                token: userObject.token
                            })
                        });

                    case 33:
                    case 'end':
                        return _context.stop();
                }
            }
        }, _callee, undefined);
    }));

    return function SignUp(_x) {
        return _ref.apply(this, arguments);
    };
}();

exports.default = SignUp;
module.exports = exports['default'];