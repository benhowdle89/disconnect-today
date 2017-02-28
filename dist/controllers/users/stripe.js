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

var _demo = require('./../../../config/demo.js');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Stripe = _services2.default.Stripe,
    Users = _services2.default.Users,
    Domains = _services2.default.Domains,
    Heroku = _services2.default.Heroku;


var upgrade = function () {
    var _ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee(_ref2) {
        var stripe_token_id = _ref2.stripe_token_id,
            user = _ref2.user,
            email = _ref2.email;
        var token, id, stripeService, users, charge, updatedUser;
        return _regenerator2.default.wrap(function _callee$(_context) {
            while (1) {
                switch (_context.prev = _context.next) {
                    case 0:
                        token = stripe_token_id, id = user.id;
                        stripeService = new Stripe();
                        users = new Users();
                        _context.next = 5;
                        return stripeService.chargeUser(token, _demo.amount, id, email);

                    case 5:
                        charge = _context.sent;
                        updatedUser = void 0;

                        if (!charge) {
                            _context.next = 13;
                            break;
                        }

                        _context.next = 10;
                        return users.activateAccount(id, charge.id);

                    case 10:
                        updatedUser = _context.sent;
                        _context.next = 14;
                        break;

                    case 13:
                        updatedUser = user;

                    case 14:
                        return _context.abrupt('return', {
                            user: updatedUser
                        });

                    case 15:
                    case 'end':
                        return _context.stop();
                }
            }
        }, _callee, undefined);
    }));

    return function upgrade(_x) {
        return _ref.apply(this, arguments);
    };
}();

exports.default = {
    upgrade: upgrade
};
module.exports = exports['default'];