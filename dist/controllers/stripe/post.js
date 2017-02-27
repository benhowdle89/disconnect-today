'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

var _services = require('./../../services/');

var _services2 = _interopRequireDefault(_services);

var _mail = require('./../../etc/mail');

var _mail2 = _interopRequireDefault(_mail);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Stripe = _services2.default.Stripe,
    Users = _services2.default.Users;


var post = function () {
    var _ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee(_ref2) {
        var type = _ref2.type,
            data = _ref2.data;
        var stripe, users, object, customer, lines, total, date, lineData, period, period_end, extended, ekkoCustomer, user;
        return _regenerator2.default.wrap(function _callee$(_context) {
            while (1) {
                switch (_context.prev = _context.next) {
                    case 0:
                        if (!(type == 'invoice.payment_succeeded')) {
                            _context.next = 18;
                            break;
                        }

                        stripe = new Stripe();
                        users = new Users();
                        object = data.object;
                        customer = object.customer, lines = object.lines, total = object.total, date = object.date;
                        lineData = lines.data[0];
                        period = lineData.period;
                        period_end = period.end;
                        _context.next = 10;
                        return stripe.extendSubscription(period_end, customer);

                    case 10:
                        extended = _context.sent;
                        _context.next = 13;
                        return stripe.getByCustomerId(customer);

                    case 13:
                        ekkoCustomer = _context.sent;
                        _context.next = 16;
                        return users.getById(ekkoCustomer.UserId);

                    case 16:
                        user = _context.sent;

                        _mail2.default.send({
                            to: user.email,
                            type: 'stripeInvoice',
                            data: {
                                total: total / 100,
                                date: _moment2.default.unix(date).format('Do MMM Y'),
                                plan: ekkoCustomer.plan
                            }
                        });

                    case 18:
                        return _context.abrupt('return', {});

                    case 19:
                    case 'end':
                        return _context.stop();
                }
            }
        }, _callee, undefined);
    }));

    return function post(_x) {
        return _ref.apply(this, arguments);
    };
}();

exports.default = post;
module.exports = exports['default'];