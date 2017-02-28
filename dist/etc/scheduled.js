'use strict';

var _promise = require('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

var _services = require('./../services/');

var _services2 = _interopRequireDefault(_services);

var _logger = require('./../etc/logger');

var _mail = require('./../etc/mail');

var _mail2 = _interopRequireDefault(_mail);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Twitter = _services2.default.Twitter,
    Users = _services2.default.Users;


var frequencyToDays = function frequencyToDays(frequency) {
    if (frequency == 'day') {
        return 1;
    }
    if (frequency == '2_days') {
        return 2;
    }
    return 7;
};

var updateLastFetchedFromTwitter = function () {
    var _ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee(user) {
        return _regenerator2.default.wrap(function _callee$(_context) {
            while (1) {
                switch (_context.prev = _context.next) {
                    case 0:
                        user.lastFetchedFromTwitter = new Date();
                        _context.next = 3;
                        return user.save();

                    case 3:
                        return _context.abrupt('return', _context.sent);

                    case 4:
                    case 'end':
                        return _context.stop();
                }
            }
        }, _callee, undefined);
    }));

    return function updateLastFetchedFromTwitter(_x) {
        return _ref.apply(this, arguments);
    };
}();

(0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee3() {
    var users, twitter, allUsers, actions;
    return _regenerator2.default.wrap(function _callee3$(_context3) {
        while (1) {
            switch (_context3.prev = _context3.next) {
                case 0:
                    users = new Users();
                    twitter = new Twitter();
                    _context3.next = 4;
                    return users.getAll();

                case 4:
                    allUsers = _context3.sent;
                    actions = _promise2.default.all(allUsers.map(function () {
                        var _ref3 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee2(user) {
                            var lastFetchedFromTwitterInDays, accessToken, accessTokenSecret, dms, filteredDms, mentions, filteredMentions;
                            return _regenerator2.default.wrap(function _callee2$(_context2) {
                                while (1) {
                                    switch (_context2.prev = _context2.next) {
                                        case 0:
                                            lastFetchedFromTwitterInDays = user.lastFetchedFromTwitter ? (0, _moment2.default)().diff((0, _moment2.default)(user.lastFetchedFromTwitter), 'days') : 0;

                                            if (!(lastFetchedFromTwitterInDays !== 0 && lastFetchedFromTwitterInDays <= frequencyToDays(user.frequency))) {
                                                _context2.next = 3;
                                                break;
                                            }

                                            return _context2.abrupt('return');

                                        case 3:
                                            accessToken = user.twitteroAuthToken;
                                            accessTokenSecret = user.twitteroAuthTokenSecret;
                                            _context2.next = 7;
                                            return twitter.getDMs({
                                                accessToken: accessToken,
                                                accessTokenSecret: accessTokenSecret
                                            });

                                        case 7:
                                            dms = _context2.sent;
                                            filteredDms = dms.filter(function (dm) {
                                                var dmAgeInDays = (0, _moment2.default)().diff((0, _moment2.default)(dm.created_at), 'days');
                                                return dmAgeInDays <= frequencyToDays(user.frequency);
                                            });
                                            _context2.next = 11;
                                            return twitter.getMentions({
                                                accessToken: accessToken,
                                                accessTokenSecret: accessTokenSecret
                                            });

                                        case 11:
                                            mentions = _context2.sent;
                                            filteredMentions = mentions.filter(function (mention) {
                                                var mentionAgeInDays = (0, _moment2.default)().diff((0, _moment2.default)(mention.created_at), 'days');
                                                return mentionAgeInDays <= frequencyToDays(user.frequency);
                                            });
                                            _context2.next = 15;
                                            return updateLastFetchedFromTwitter(user);

                                        case 15:
                                            if (!(filteredMentions.length || filteredDms.length)) {
                                                _context2.next = 17;
                                                break;
                                            }

                                            return _context2.abrupt('return', _mail2.default.send({
                                                to: user.email,
                                                data: {
                                                    frequency: user.frequency,
                                                    dms: filteredDms,
                                                    mentions: filteredMentions
                                                }
                                            }));

                                        case 17:
                                            return _context2.abrupt('return', {});

                                        case 18:
                                        case 'end':
                                            return _context2.stop();
                                    }
                                }
                            }, _callee2, undefined);
                        }));

                        return function (_x2) {
                            return _ref3.apply(this, arguments);
                        };
                    }()));
                    _context3.next = 8;
                    return actions;

                case 8:
                    process.exit();

                case 9:
                case 'end':
                    return _context3.stop();
            }
        }
    }, _callee3, undefined);
}))();