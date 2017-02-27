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

var _tokenFromHeader = require('./token-from-header');

var _tokenFromHeader2 = _interopRequireDefault(_tokenFromHeader);

var _userFromToken = require('./user-from-token');

var _userFromToken2 = _interopRequireDefault(_userFromToken);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var whitelist = ['/api/users/login'];

var api = function () {
    var _ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee(req) {
        var token;
        return _regenerator2.default.wrap(function _callee$(_context) {
            while (1) {
                switch (_context.prev = _context.next) {
                    case 0:
                        if (!(whitelist.indexOf(req.originalUrl) > -1)) {
                            _context.next = 5;
                            break;
                        }

                        _context.next = 3;
                        return (0, _userFromToken2.default)(req, { whitelist: true });

                    case 3:
                        req.user = _context.sent;
                        return _context.abrupt('return', req);

                    case 5:
                        token = (0, _tokenFromHeader2.default)(req);

                        if (!token) {
                            _context.next = 15;
                            break;
                        }

                        _context.next = 9;
                        return (0, _userFromToken2.default)(req);

                    case 9:
                        req.user = _context.sent;

                        if (!(req.originalUrl == '/api/whoami')) {
                            _context.next = 12;
                            break;
                        }

                        return _context.abrupt('return', {
                            data: {
                                user: req.user
                            }
                        });

                    case 12:
                        return _context.abrupt('return', req);

                    case 15:
                        throw new _error2.default(403, messages['403']);

                    case 16:
                    case 'end':
                        return _context.stop();
                }
            }
        }, _callee, undefined);
    }));

    return function api(_x) {
        return _ref.apply(this, arguments);
    };
}();

exports.default = api;
module.exports = exports['default'];