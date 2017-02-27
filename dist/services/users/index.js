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
        key: 'getByTwitterUserId',
        value: function () {
            var _ref2 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee2(id) {
                var user;
                return _regenerator2.default.wrap(function _callee2$(_context2) {
                    while (1) {
                        switch (_context2.prev = _context2.next) {
                            case 0:
                                _context2.next = 2;
                                return this.db.findOne({
                                    where: {
                                        twitterUserId: id
                                    }
                                });

                            case 2:
                                user = _context2.sent;
                                return _context2.abrupt('return', user);

                            case 4:
                            case 'end':
                                return _context2.stop();
                        }
                    }
                }, _callee2, this);
            }));

            function getByTwitterUserId(_x2) {
                return _ref2.apply(this, arguments);
            }

            return getByTwitterUserId;
        }()
    }, {
        key: 'updateSettings',
        value: function () {
            var _ref3 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee3(id, email, frequency) {
                var updated;
                return _regenerator2.default.wrap(function _callee3$(_context3) {
                    while (1) {
                        switch (_context3.prev = _context3.next) {
                            case 0:
                                _context3.next = 2;
                                return this.db.update({
                                    email: email,
                                    frequency: frequency
                                }, {
                                    where: {
                                        id: id
                                    }
                                });

                            case 2:
                                updated = _context3.sent;
                                _context3.next = 5;
                                return this.getById(id);

                            case 5:
                                return _context3.abrupt('return', _context3.sent);

                            case 6:
                            case 'end':
                                return _context3.stop();
                        }
                    }
                }, _callee3, this);
            }));

            function updateSettings(_x3, _x4, _x5) {
                return _ref3.apply(this, arguments);
            }

            return updateSettings;
        }()
    }, {
        key: 'createUser',
        value: function () {
            var _ref4 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee4(_ref5) {
                var screen_name = _ref5.screen_name,
                    id_str = _ref5.id_str,
                    oauthToken = _ref5.oauthToken,
                    oauthTokenSecret = _ref5.oauthTokenSecret;
                var user, existing, userObj;
                return _regenerator2.default.wrap(function _callee4$(_context4) {
                    while (1) {
                        switch (_context4.prev = _context4.next) {
                            case 0:
                                user = void 0;
                                _context4.next = 3;
                                return this.getByTwitterUserId(id_str);

                            case 3:
                                existing = _context4.sent;

                                if (!existing) {
                                    _context4.next = 8;
                                    break;
                                }

                                user = existing;
                                _context4.next = 19;
                                break;

                            case 8:
                                _context4.prev = 8;
                                _context4.next = 11;
                                return this.db.create({
                                    twitterUsername: screen_name,
                                    twitterUserId: id_str,
                                    twitteroAuthToken: oauthToken,
                                    twitteroAuthTokenSecret: oauthTokenSecret
                                });

                            case 11:
                                user = _context4.sent;
                                _context4.next = 18;
                                break;

                            case 14:
                                _context4.prev = 14;
                                _context4.t0 = _context4['catch'](8);

                                _logger.logger.error('Error creating user', _context4.t0);
                                return _context4.abrupt('return', {
                                    error: _context4.t0
                                });

                            case 18:
                                _logger.logger.info('Creating user', screen_name);

                            case 19:
                                userObj = user.get({
                                    plain: true
                                });
                                _context4.next = 22;
                                return _auth2.default.create({
                                    id: userObj.id
                                });

                            case 22:
                                userObj.token = _context4.sent;
                                return _context4.abrupt('return', {
                                    user: userObj
                                });

                            case 24:
                            case 'end':
                                return _context4.stop();
                        }
                    }
                }, _callee4, this, [[8, 14]]);
            }));

            function createUser(_x6) {
                return _ref4.apply(this, arguments);
            }

            return createUser;
        }()
    }]);
    return Users;
}();

exports.default = Users;
module.exports = exports['default'];