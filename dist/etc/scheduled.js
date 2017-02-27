'use strict';

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _services = require('./../services/');

var _services2 = _interopRequireDefault(_services);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

console.log(_services2.default);
var Twitter = _services2.default.Twitter,
    Users = _services2.default.Users;


(0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee() {
    var users, allUsers;
    return _regenerator2.default.wrap(function _callee$(_context) {
        while (1) {
            switch (_context.prev = _context.next) {
                case 0:
                    users = new Users();
                    _context.next = 3;
                    return users.getAll();

                case 3:
                    allUsers = _context.sent;

                    console.log(allUsers);

                case 5:
                case 'end':
                    return _context.stop();
            }
        }
    }, _callee, undefined);
}))();