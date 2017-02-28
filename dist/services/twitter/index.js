'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _promise = require('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _nodeTwitterApi = require('node-twitter-api');

var _nodeTwitterApi2 = _interopRequireDefault(_nodeTwitterApi);

var _logger = require('./../../etc/logger');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var callback = (process && process.env && process.env.NODE_ENV || 'development') == 'production' ? 'https://disconnect.today/api/twitter-callback' : 'http://localhost:5000/api/twitter-callback';

var TwitterService = function () {
    function TwitterService() {
        (0, _classCallCheck3.default)(this, TwitterService);
    }

    (0, _createClass3.default)(TwitterService, [{
        key: 'connection',
        value: function connection() {
            return new _nodeTwitterApi2.default({
                consumerKey: process && process.env && process.env.TWITTER_CONSUMER_KEY || 'WU6GqjxPKxA0JBoTL9erCcGLP',
                consumerSecret: process && process.env && process.env.TWITTER_CONSUMER_SECRET || 'REk4aP7LU4IOLexmWhoJAYc6AiFj3NXzy1qyO3IsDXQBRJbH6m',
                callback: callback
            });
        }
    }, {
        key: 'getDMs',
        value: function () {
            var _ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee2(_ref2) {
                var _this = this;

                var accessToken = _ref2.accessToken,
                    accessTokenSecret = _ref2.accessTokenSecret;
                return _regenerator2.default.wrap(function _callee2$(_context2) {
                    while (1) {
                        switch (_context2.prev = _context2.next) {
                            case 0:
                                return _context2.abrupt('return', new _promise2.default(function () {
                                    var _ref3 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee(resolve) {
                                        return _regenerator2.default.wrap(function _callee$(_context) {
                                            while (1) {
                                                switch (_context.prev = _context.next) {
                                                    case 0:
                                                        _this.connection().direct_messages("", {
                                                            count: 200
                                                        }, accessToken, accessTokenSecret, function (error, data, response) {
                                                            if (error) {
                                                                _logger.logger.error('Twitter error', error);
                                                                return resolve([]);
                                                            }
                                                            resolve(data.map(function (dm) {
                                                                return {
                                                                    from: {
                                                                        name: dm.sender_screen_name,
                                                                        avatar: dm.sender.profile_image_url
                                                                    },
                                                                    text: dm.text,
                                                                    created_at: dm.created_at
                                                                };
                                                            }));
                                                        });

                                                    case 1:
                                                    case 'end':
                                                        return _context.stop();
                                                }
                                            }
                                        }, _callee, _this);
                                    }));

                                    return function (_x2) {
                                        return _ref3.apply(this, arguments);
                                    };
                                }()));

                            case 1:
                            case 'end':
                                return _context2.stop();
                        }
                    }
                }, _callee2, this);
            }));

            function getDMs(_x) {
                return _ref.apply(this, arguments);
            }

            return getDMs;
        }()
    }, {
        key: 'getMentions',
        value: function getMentions(_ref4) {
            var _this2 = this;

            var accessToken = _ref4.accessToken,
                accessTokenSecret = _ref4.accessTokenSecret;

            return new _promise2.default(function () {
                var _ref5 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee3(resolve) {
                    return _regenerator2.default.wrap(function _callee3$(_context3) {
                        while (1) {
                            switch (_context3.prev = _context3.next) {
                                case 0:
                                    _this2.connection().getTimeline("mentions", {
                                        count: 200
                                    }, accessToken, accessTokenSecret, function (error, data, response) {
                                        if (error) {
                                            _logger.logger.error('Twitter error', error);
                                            return resolve([]);
                                        }
                                        resolve(data.map(function (mention) {
                                            return {
                                                id: mention.id_str,
                                                from: {
                                                    name: mention.user.screen_name,
                                                    avatar: mention.user.profile_image_url
                                                },
                                                text: mention.text,
                                                created_at: mention.created_at
                                            };
                                        }));
                                    });

                                case 1:
                                case 'end':
                                    return _context3.stop();
                            }
                        }
                    }, _callee3, _this2);
                }));

                return function (_x3) {
                    return _ref5.apply(this, arguments);
                };
            }());
        }
    }]);
    return TwitterService;
}();

exports.default = TwitterService;
module.exports = exports['default'];