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

var stripe = require('stripe')(process && process.env && process.env.STRIPE_API_KEY || 'sk_test_vRixDROglVDdzDfXZSIIkxZo');

var Stripe = function () {
    function Stripe(db) {
        (0, _classCallCheck3.default)(this, Stripe);

        this.db = db || StripeCustomerId;
    }

    (0, _createClass3.default)(Stripe, [{
        key: 'createCustomer',
        value: function () {
            var _ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee(_ref2, token, plan) {
                var id = _ref2.id,
                    email = _ref2.email;

                var customer, _customer, subscriptions, sources, subscription, planId, subscriptionId, activeUntil, card, last4, brand, existing, updatedCustomer, customerId;

                return _regenerator2.default.wrap(function _callee$(_context) {
                    while (1) {
                        switch (_context.prev = _context.next) {
                            case 0:
                                customer = void 0;
                                _context.prev = 1;

                                _logger.logger.info('Creating Stripe customer on plan', email, plan);
                                _context.next = 5;
                                return stripe.customers.create({
                                    source: token,
                                    plan: plan,
                                    email: email
                                });

                            case 5:
                                customer = _context.sent;
                                _context.next = 11;
                                break;

                            case 8:
                                _context.prev = 8;
                                _context.t0 = _context['catch'](1);
                                throw new _error2.default(502, _context.t0);

                            case 11:
                                _logger.logger.info('Created Stripe customer', customer);
                                _customer = customer, subscriptions = _customer.subscriptions, sources = _customer.sources;
                                subscription = subscriptions.data && subscriptions.data.length ? subscriptions.data[0] : null;
                                planId = subscription ? subscription.plan.id : null, subscriptionId = subscription.id, activeUntil = _moment2.default.utc(subscription.current_period_end, 'X').format('YYYY-MM-DD');
                                card = sources.data && sources.data.length ? sources.data[0] : null;
                                last4 = card ? card.last4 : null;
                                brand = card ? card.brand : null;
                                _context.next = 20;
                                return this.getByUserId(id);

                            case 20:
                                existing = _context.sent;

                                if (!existing) {
                                    _context.next = 28;
                                    break;
                                }

                                _context.next = 24;
                                return this.db.update({
                                    customerId: customer.id,
                                    plan: planId,
                                    subscriptionId: subscriptionId,
                                    activeUntil: activeUntil,
                                    last4: last4,
                                    brand: brand
                                }, {
                                    where: {
                                        UserId: id
                                    }
                                });

                            case 24:
                                updatedCustomer = _context.sent;
                                _context.next = 27;
                                return this.getByUserId(id);

                            case 27:
                                return _context.abrupt('return', _context.sent);

                            case 28:
                                _context.next = 30;
                                return this.db.create({
                                    customerId: customer.id,
                                    UserId: id,
                                    plan: planId,
                                    subscriptionId: subscriptionId,
                                    activeUntil: activeUntil,
                                    last4: last4,
                                    brand: brand
                                });

                            case 30:
                                customerId = _context.sent;
                                return _context.abrupt('return', customerId);

                            case 32:
                            case 'end':
                                return _context.stop();
                        }
                    }
                }, _callee, this, [[1, 8]]);
            }));

            function createCustomer(_x, _x2, _x3) {
                return _ref.apply(this, arguments);
            }

            return createCustomer;
        }()
    }, {
        key: 'subscribeCustomerToPlan',
        value: function () {
            var _ref3 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee2(customerId, plan) {
                var subscribedCustomer, subscriptionId, activeUntil, updatedCustomer;
                return _regenerator2.default.wrap(function _callee2$(_context2) {
                    while (1) {
                        switch (_context2.prev = _context2.next) {
                            case 0:
                                subscribedCustomer = void 0;

                                _logger.logger.info('Subscribing customer to plan', customerId, plan);
                                _context2.prev = 2;
                                _context2.next = 5;
                                return stripe.subscriptions.create({
                                    customer: customerId,
                                    plan: plan
                                });

                            case 5:
                                subscribedCustomer = _context2.sent;
                                _context2.next = 11;
                                break;

                            case 8:
                                _context2.prev = 8;
                                _context2.t0 = _context2['catch'](2);
                                throw new _error2.default(502, _context2.t0);

                            case 11:
                                _logger.logger.info('Subscribed customer to plan', subscribedCustomer);
                                subscriptionId = subscribedCustomer.id, activeUntil = _moment2.default.utc(subscribedCustomer.current_period_end, 'X').format('YYYY-MM-DD');
                                _context2.next = 15;
                                return this.db.update({
                                    customerId: customerId,
                                    plan: plan,
                                    subscriptionId: subscriptionId,
                                    activeUntil: activeUntil
                                }, {
                                    where: {
                                        customerId: customerId
                                    }
                                });

                            case 15:
                                updatedCustomer = _context2.sent;
                                _context2.next = 18;
                                return this.getByCustomerId(customerId);

                            case 18:
                                return _context2.abrupt('return', _context2.sent);

                            case 19:
                            case 'end':
                                return _context2.stop();
                        }
                    }
                }, _callee2, this, [[2, 8]]);
            }));

            function subscribeCustomerToPlan(_x4, _x5) {
                return _ref3.apply(this, arguments);
            }

            return subscribeCustomerToPlan;
        }()
    }, {
        key: 'extendSubscription',
        value: function () {
            var _ref4 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee3(periodEnd, customerId) {
                var activeUntil, updatedCustomer;
                return _regenerator2.default.wrap(function _callee3$(_context3) {
                    while (1) {
                        switch (_context3.prev = _context3.next) {
                            case 0:
                                activeUntil = _moment2.default.utc(periodEnd, 'X').format('YYYY-MM-DD');
                                _context3.next = 3;
                                return this.db.update({
                                    activeUntil: activeUntil
                                }, {
                                    where: {
                                        customerId: customerId
                                    }
                                });

                            case 3:
                                updatedCustomer = _context3.sent;

                                _logger.logger.info('Extended customer subscription', updatedCustomer);
                                return _context3.abrupt('return', updatedCustomer);

                            case 6:
                            case 'end':
                                return _context3.stop();
                        }
                    }
                }, _callee3, this);
            }));

            function extendSubscription(_x6, _x7) {
                return _ref4.apply(this, arguments);
            }

            return extendSubscription;
        }()
    }, {
        key: 'updateCustomerCard',
        value: function () {
            var _ref5 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee4(customerId, token, _ref6) {
                var last4 = _ref6.last4,
                    brand = _ref6.brand;
                var customer, updatedCustomer;
                return _regenerator2.default.wrap(function _callee4$(_context4) {
                    while (1) {
                        switch (_context4.prev = _context4.next) {
                            case 0:
                                customer = void 0;
                                _context4.prev = 1;

                                _logger.logger.info('Updating Stripe customer', customerId);
                                _context4.next = 5;
                                return stripe.customers.update(customerId, {
                                    source: token
                                });

                            case 5:
                                customer = _context4.sent;
                                _context4.next = 11;
                                break;

                            case 8:
                                _context4.prev = 8;
                                _context4.t0 = _context4['catch'](1);
                                throw new _error2.default(502, _context4.t0);

                            case 11:
                                _logger.logger.info('Updated Stripe customer', customerId);
                                _context4.next = 14;
                                return this.db.update({
                                    last4: last4,
                                    brand: brand
                                }, {
                                    where: {
                                        customerId: customerId
                                    }
                                });

                            case 14:
                                updatedCustomer = _context4.sent;

                            case 15:
                            case 'end':
                                return _context4.stop();
                        }
                    }
                }, _callee4, this, [[1, 8]]);
            }));

            function updateCustomerCard(_x8, _x9, _x10) {
                return _ref5.apply(this, arguments);
            }

            return updateCustomerCard;
        }()
    }, {
        key: 'deleteCustomer',
        value: function () {
            var _ref7 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee5(userId) {
                var customerId, customer, deleted;
                return _regenerator2.default.wrap(function _callee5$(_context5) {
                    while (1) {
                        switch (_context5.prev = _context5.next) {
                            case 0:
                                _context5.next = 2;
                                return this.db.findOne({
                                    where: {
                                        UserId: userId
                                    }
                                });

                            case 2:
                                customerId = _context5.sent;

                                if (customerId) {
                                    _context5.next = 5;
                                    break;
                                }

                                return _context5.abrupt('return', {});

                            case 5:
                                customer = customerId.get({
                                    plain: true
                                });

                                _logger.logger.info('Deleting customer from Stripe', userId);
                                deleted = void 0;
                                _context5.prev = 8;
                                _context5.next = 11;
                                return stripe.customers.del(customer.customerId);

                            case 11:
                                deleted = _context5.sent;
                                _context5.next = 17;
                                break;

                            case 14:
                                _context5.prev = 14;
                                _context5.t0 = _context5['catch'](8);

                                _logger.logger.error(_context5.t0);

                            case 17:
                                _logger.logger.info('Deleted customer from Stripe', userId, deleted);
                                _context5.next = 20;
                                return customerId.destroy({
                                    force: true
                                });

                            case 20:
                                return _context5.abrupt('return', {});

                            case 21:
                            case 'end':
                                return _context5.stop();
                        }
                    }
                }, _callee5, this, [[8, 14]]);
            }));

            function deleteCustomer(_x11) {
                return _ref7.apply(this, arguments);
            }

            return deleteCustomer;
        }()
    }, {
        key: 'getByUserId',
        value: function () {
            var _ref8 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee6(id) {
                var customerId;
                return _regenerator2.default.wrap(function _callee6$(_context6) {
                    while (1) {
                        switch (_context6.prev = _context6.next) {
                            case 0:
                                _context6.next = 2;
                                return this.db.findOne({
                                    where: {
                                        UserId: id
                                    }
                                });

                            case 2:
                                customerId = _context6.sent;
                                return _context6.abrupt('return', customerId ? customerId.get({
                                    plain: true
                                }) : null);

                            case 4:
                            case 'end':
                                return _context6.stop();
                        }
                    }
                }, _callee6, this);
            }));

            function getByUserId(_x12) {
                return _ref8.apply(this, arguments);
            }

            return getByUserId;
        }()
    }, {
        key: 'getByCustomerId',
        value: function () {
            var _ref9 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee7(customerId) {
                var customer;
                return _regenerator2.default.wrap(function _callee7$(_context7) {
                    while (1) {
                        switch (_context7.prev = _context7.next) {
                            case 0:
                                _context7.next = 2;
                                return this.db.findOne({
                                    where: {
                                        customerId: customerId
                                    }
                                });

                            case 2:
                                customer = _context7.sent;
                                return _context7.abrupt('return', customer ? customer.get({
                                    plain: true
                                }) : null);

                            case 4:
                            case 'end':
                                return _context7.stop();
                        }
                    }
                }, _callee7, this);
            }));

            function getByCustomerId(_x13) {
                return _ref9.apply(this, arguments);
            }

            return getByCustomerId;
        }()
    }, {
        key: 'addChargeToCustomer',
        value: function () {
            var _ref10 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee8(customerId, domainCost) {
                var convertedDomainCost, amount, charge;
                return _regenerator2.default.wrap(function _callee8$(_context8) {
                    while (1) {
                        switch (_context8.prev = _context8.next) {
                            case 0:
                                _context8.next = 2;
                                return getConvertedDomainCost(domainCost);

                            case 2:
                                convertedDomainCost = _context8.sent;
                                amount = parseInt(convertedDomainCost.amount * 100, 10);
                                charge = void 0;
                                _context8.prev = 5;

                                _logger.logger.info('Creating Stripe charge for customer', customerId, amount);
                                _context8.next = 9;
                                return stripe.charges.create({
                                    customer: customerId,
                                    amount: amount,
                                    currency: 'gbp'
                                });

                            case 9:
                                charge = _context8.sent;
                                _context8.next = 15;
                                break;

                            case 12:
                                _context8.prev = 12;
                                _context8.t0 = _context8['catch'](5);
                                throw new _error2.default(502, _context8.t0);

                            case 15:
                                _logger.logger.info('Created Stripe charge on customer', charge, customerId, amount);
                                return _context8.abrupt('return', charge);

                            case 17:
                            case 'end':
                                return _context8.stop();
                        }
                    }
                }, _callee8, this, [[5, 12]]);
            }));

            function addChargeToCustomer(_x14, _x15) {
                return _ref10.apply(this, arguments);
            }

            return addChargeToCustomer;
        }()
    }]);
    return Stripe;
}();

exports.default = Stripe;
module.exports = exports['default'];