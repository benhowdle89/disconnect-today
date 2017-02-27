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


var update = function () {
    var _ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee(_ref2) {
        var user = _ref2.user,
            email = _ref2.email,
            frequency = _ref2.frequency;
        var users, updatedUser;
        return _regenerator2.default.wrap(function _callee$(_context) {
            while (1) {
                switch (_context.prev = _context.next) {
                    case 0:
                        users = new Users();
                        _context.next = 3;
                        return users.updateSettings(user.id, email, frequency);

                    case 3:
                        updatedUser = _context.sent;
                        return _context.abrupt('return', {
                            user: updatedUser
                        });

                    case 5:
                    case 'end':
                        return _context.stop();
                }
            }
        }, _callee, undefined);
    }));

    return function update(_x) {
        return _ref.apply(this, arguments);
    };
}();

exports.default = update;
module.exports = exports['default'];