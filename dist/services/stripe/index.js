'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

var _logger = require('./../../etc/logger');

var _error = require('./../../etc/error');

var _error2 = _interopRequireDefault(_error);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var stripe = require('stripe')(process && process.env && process.env.STRIPE_API_KEY || 'sk_test_0oa5gMwihz4GlMwgeMAByAD4');

var Stripe = function () {
    function Stripe() {
        (0, _classCallCheck3.default)(this, Stripe);
    }

    (0, _createClass3.default)(Stripe, [{
        key: 'chargeUser',
        value: function () {
            var _ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee(token, amount, userId, email) {
                var charge;
                return _regenerator2.default.wrap(function _callee$(_context) {
                    while (1) {
                        switch (_context.prev = _context.next) {
                            case 0:
                                charge = void 0;
                                _context.prev = 1;

                                _logger.logger.info('Creating Stripe charge for user', userId, amount);
                                _context.next = 5;
                                return stripe.charges.create({
                                    amount: amount,
                                    currency: 'usd',
                                    source: token,
                                    description: 'Charge for activating Disconnect Today. Your unique user ID: ' + userId + '.',
                                    metadata: {
                                        userId: userId
                                    },
                                    receipt_email: email
                                });

                            case 5:
                                charge = _context.sent;
                                _context.next = 11;
                                break;

                            case 8:
                                _context.prev = 8;
                                _context.t0 = _context['catch'](1);
                                throw new _error2.default(502, _context.t0);

                            case 11:
                                _logger.logger.info('Created Stripe charge on user', charge, userId, amount);
                                return _context.abrupt('return', charge);

                            case 13:
                            case 'end':
                                return _context.stop();
                        }
                    }
                }, _callee, this, [[1, 8]]);
            }));

            function chargeUser(_x, _x2, _x3, _x4) {
                return _ref.apply(this, arguments);
            }

            return chargeUser;
        }()
    }]);
    return Stripe;
}();

exports.default = Stripe;
module.exports = exports['default'];