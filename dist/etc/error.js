'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _stringify = require('babel-runtime/core-js/json/stringify');

var _stringify2 = _interopRequireDefault(_stringify);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ApiError = function (_Error) {
    (0, _inherits3.default)(ApiError, _Error);

    function ApiError(code, msg) {
        (0, _classCallCheck3.default)(this, ApiError);

        var errorMessage = typeof msg == 'string' ? msg : (0, _stringify2.default)(msg);

        var _this = (0, _possibleConstructorReturn3.default)(this, (ApiError.__proto__ || (0, _getPrototypeOf2.default)(ApiError)).call(this, errorMessage));

        _this.code = code;
        return _this;
    }

    return ApiError;
}(Error);

exports.default = ApiError;
module.exports = exports['default'];