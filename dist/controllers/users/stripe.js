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

var _mail = require('./../../etc/mail');

var _mail2 = _interopRequireDefault(_mail);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Stripe = _services2.default.Stripe,
    Users = _services2.default.Users,
    Domains = _services2.default.Domains,
    Heroku = _services2.default.Heroku;


var upgrade = function () {
    var _ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee(_ref2) {
        var stripe_token_id = _ref2.stripe_token_id,
            _ref2$plan_id = _ref2.plan_id,
            plan_id = _ref2$plan_id === undefined ? 'pro' : _ref2$plan_id,
            user = _ref2.user;
        var token, planId, id, email, stripeService, users, customer, updatedUser;
        return _regenerator2.default.wrap(function _callee$(_context) {
            while (1) {
                switch (_context.prev = _context.next) {
                    case 0:
                        token = stripe_token_id, planId = plan_id, id = user.id, email = user.email;
                        stripeService = new Stripe();
                        users = new Users();


                        planId = _demo.emails.indexOf(user.email) > -1 ? _demo.freeStripePlanId : planId;

                        // Stripe customer creation
                        _context.next = 6;
                        return stripeService.createCustomer(user, token, planId);

                    case 6:
                        customer = _context.sent;
                        _context.next = 9;
                        return users.upgradeUser(id);

                    case 9:
                        updatedUser = _context.sent;


                        Slack.newUserUpgrade({
                            userId: id,
                            plan: planId,
                            email: email
                        });

                        _mail2.default.send({
                            to: email,
                            type: 'userUpgrade'
                        });

                        return _context.abrupt('return', {
                            user: updatedUser
                        });

                    case 13:
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

var cardUpdate = function () {
    var _ref3 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee2(_ref4) {
        var stripe_token_id = _ref4.stripe_token_id,
            card = _ref4.card,
            user = _ref4.user;
        var token, stripeService, users, stripeCustomer, updatedUser;
        return _regenerator2.default.wrap(function _callee2$(_context2) {
            while (1) {
                switch (_context2.prev = _context2.next) {
                    case 0:
                        token = stripe_token_id;
                        stripeService = new Stripe();
                        users = new Users();
                        _context2.next = 5;
                        return stripeService.getByUserId(user.id);

                    case 5:
                        stripeCustomer = _context2.sent;
                        _context2.next = 8;
                        return stripeService.updateCustomerCard(stripeCustomer.customerId, token, card);

                    case 8:
                        _context2.next = 10;
                        return users.getById(user.id);

                    case 10:
                        updatedUser = _context2.sent;
                        return _context2.abrupt('return', {
                            user: updatedUser
                        });

                    case 12:
                    case 'end':
                        return _context2.stop();
                }
            }
        }, _callee2, undefined);
    }));

    return function cardUpdate(_x2) {
        return _ref3.apply(this, arguments);
    };
}();

exports.default = {
    upgrade: upgrade,
    cardUpdate: cardUpdate
};
module.exports = exports['default'];