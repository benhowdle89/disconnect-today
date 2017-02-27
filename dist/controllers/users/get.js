'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _services = require('./../../services/');

var _services2 = _interopRequireDefault(_services);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Users = _services2.default.Users;


var get = {
    getByFacebookId: function getByFacebookId(_ref) {
        var _this = this;

        var facebook_id = _ref.facebook_id;
        return (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee() {
            var users, user;
            return _regenerator2.default.wrap(function _callee$(_context) {
                while (1) {
                    switch (_context.prev = _context.next) {
                        case 0:
                            users = new Users();
                            _context.next = 3;
                            return users.getByFacebookId(facebook_id);

                        case 3:
                            user = _context.sent;
                            return _context.abrupt('return', {
                                user: user
                            });

                        case 5:
                        case 'end':
                            return _context.stop();
                    }
                }
            }, _callee, _this);
        }))();
    },
    getById: function getById(_ref2) {
        var _this2 = this;

        var id = _ref2.id;
        return (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee2() {
            var user;
            return _regenerator2.default.wrap(function _callee2$(_context2) {
                while (1) {
                    switch (_context2.prev = _context2.next) {
                        case 0:
                            _context2.next = 2;
                            return users.getById(id);

                        case 2:
                            user = _context2.sent;
                            return _context2.abrupt('return', {
                                user: user
                            });

                        case 4:
                        case 'end':
                            return _context2.stop();
                    }
                }
            }, _callee2, _this2);
        }))();
    }
};

exports.default = get;
module.exports = exports['default'];