'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _nodeTwitterApi = require('node-twitter-api');

var _nodeTwitterApi2 = _interopRequireDefault(_nodeTwitterApi);

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
    }]);
    return TwitterService;
}();

exports.default = TwitterService;
module.exports = exports['default'];