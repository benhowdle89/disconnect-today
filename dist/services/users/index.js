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

var _auth = require('./../../etc/auth');

var _auth2 = _interopRequireDefault(_auth);

var _error = require('./../../etc/error');

var _error2 = _interopRequireDefault(_error);

var _mail = require('./../../etc/mail');

var _mail2 = _interopRequireDefault(_mail);

var _models = require('./../../models/');

var _models2 = _interopRequireDefault(_models);

var _logger = require('./../../etc/logger');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var User = _models2.default.User;

var Users = function () {
    function Users(db) {
        (0, _classCallCheck3.default)(this, Users);

        this.db = db || User;
    }

    (0, _createClass3.default)(Users, [{
        key: 'getById',
        value: function () {
            var _ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee(id) {
                var user;
                return _regenerator2.default.wrap(function _callee$(_context) {
                    while (1) {
                        switch (_context.prev = _context.next) {
                            case 0:
                                _context.next = 2;
                                return this.db.findById(id);

                            case 2:
                                user = _context.sent;
                                return _context.abrupt('return', user);

                            case 4:
                            case 'end':
                                return _context.stop();
                        }
                    }
                }, _callee, this);
            }));

            function getById(_x) {
                return _ref.apply(this, arguments);
            }

            return getById;
        }()
    }, {
        key: 'getAll',
        value: function () {
            var _ref2 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee2() {
                return _regenerator2.default.wrap(function _callee2$(_context2) {
                    while (1) {
                        switch (_context2.prev = _context2.next) {
                            case 0:
                                _context2.next = 2;
                                return this.db.findAll({
                                    where: {
                                        email: {
                                            $ne: null
                                        },
                                        stripeChargeId: {
                                            $ne: null
                                        },
                                        frequency: {
                                            $in: ['day', '2_days', 'week']
                                        }
                                    }
                                });

                            case 2:
                                return _context2.abrupt('return', _context2.sent);

                            case 3:
                            case 'end':
                                return _context2.stop();
                        }
                    }
                }, _callee2, this);
            }));

            function getAll() {
                return _ref2.apply(this, arguments);
            }

            return getAll;
        }()
    }, {
        key: 'getByTwitterUserId',
        value: function () {
            var _ref3 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee3(id) {
                var user;
                return _regenerator2.default.wrap(function _callee3$(_context3) {
                    while (1) {
                        switch (_context3.prev = _context3.next) {
                            case 0:
                                _context3.next = 2;
                                return this.db.findOne({
                                    where: {
                                        twitterUserId: id
                                    }
                                });

                            case 2:
                                user = _context3.sent;
                                return _context3.abrupt('return', user);

                            case 4:
                            case 'end':
                                return _context3.stop();
                        }
                    }
                }, _callee3, this);
            }));

            function getByTwitterUserId(_x2) {
                return _ref3.apply(this, arguments);
            }

            return getByTwitterUserId;
        }()
    }, {
        key: 'updateSettings',
        value: function () {
            var _ref4 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee4(id, email, frequency) {
                var updated;
                return _regenerator2.default.wrap(function _callee4$(_context4) {
                    while (1) {
                        switch (_context4.prev = _context4.next) {
                            case 0:
                                _context4.next = 2;
                                return this.db.update({
                                    email: email,
                                    frequency: frequency
                                }, {
                                    where: {
                                        id: id
                                    }
                                });

                            case 2:
                                updated = _context4.sent;
                                _context4.next = 5;
                                return this.getById(id);

                            case 5:
                                return _context4.abrupt('return', _context4.sent);

                            case 6:
                            case 'end':
                                return _context4.stop();
                        }
                    }
                }, _callee4, this);
            }));

            function updateSettings(_x3, _x4, _x5) {
                return _ref4.apply(this, arguments);
            }

            return updateSettings;
        }()
    }, {
        key: 'activateAccount',
        value: function () {
            var _ref5 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee5(id, chargeId) {
                var updated;
                return _regenerator2.default.wrap(function _callee5$(_context5) {
                    while (1) {
                        switch (_context5.prev = _context5.next) {
                            case 0:
                                _context5.next = 2;
                                return this.db.update({
                                    stripeChargeId: chargeId
                                }, {
                                    where: {
                                        id: id
                                    }
                                });

                            case 2:
                                updated = _context5.sent;
                                _context5.next = 5;
                                return this.getById(id);

                            case 5:
                                return _context5.abrupt('return', _context5.sent);

                            case 6:
                            case 'end':
                                return _context5.stop();
                        }
                    }
                }, _callee5, this);
            }));

            function activateAccount(_x6, _x7) {
                return _ref5.apply(this, arguments);
            }

            return activateAccount;
        }()
    }, {
        key: 'createUser',
        value: function () {
            var _ref6 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee6(_ref7) {
                var screen_name = _ref7.screen_name,
                    id_str = _ref7.id_str,
                    oauthToken = _ref7.oauthToken,
                    oauthTokenSecret = _ref7.oauthTokenSecret;
                var user, existing, userObj;
                return _regenerator2.default.wrap(function _callee6$(_context6) {
                    while (1) {
                        switch (_context6.prev = _context6.next) {
                            case 0:
                                user = void 0;
                                _context6.next = 3;
                                return this.getByTwitterUserId(id_str);

                            case 3:
                                existing = _context6.sent;

                                if (!existing) {
                                    _context6.next = 12;
                                    break;
                                }

                                _context6.next = 7;
                                return this.db.update({
                                    twitteroAuthToken: oauthToken,
                                    twitteroAuthTokenSecret: oauthTokenSecret
                                }, {
                                    where: {
                                        twitterUserId: id_str
                                    }
                                });

                            case 7:
                                _context6.next = 9;
                                return this.getByTwitterUserId(id_str);

                            case 9:
                                user = _context6.sent;
                                _context6.next = 23;
                                break;

                            case 12:
                                _context6.prev = 12;
                                _context6.next = 15;
                                return this.db.create({
                                    twitterUsername: screen_name,
                                    twitterUserId: id_str,
                                    twitteroAuthToken: oauthToken,
                                    twitteroAuthTokenSecret: oauthTokenSecret
                                });

                            case 15:
                                user = _context6.sent;
                                _context6.next = 22;
                                break;

                            case 18:
                                _context6.prev = 18;
                                _context6.t0 = _context6['catch'](12);

                                _logger.logger.error('Error creating user', _context6.t0);
                                return _context6.abrupt('return', {
                                    error: _context6.t0
                                });

                            case 22:
                                _logger.logger.info('Creating user', screen_name);

                            case 23:
                                userObj = user.get({
                                    plain: true
                                });
                                _context6.next = 26;
                                return _auth2.default.create({
                                    id: userObj.id
                                });

                            case 26:
                                userObj.token = _context6.sent;
                                return _context6.abrupt('return', {
                                    user: userObj
                                });

                            case 28:
                            case 'end':
                                return _context6.stop();
                        }
                    }
                }, _callee6, this, [[12, 18]]);
            }));

            function createUser(_x8) {
                return _ref6.apply(this, arguments);
            }

            return createUser;
        }()
    }]);
    return Users;
}();

exports.default = Users;
module.exports = exports['default'];