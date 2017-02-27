'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _defineProperty2 = require('babel-runtime/helpers/defineProperty');

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _keys = require('babel-runtime/core-js/object/keys');

var _keys2 = _interopRequireDefault(_keys);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _pathToRegexp = require('path-to-regexp');

var _pathToRegexp2 = _interopRequireDefault(_pathToRegexp);

var _controllers = require('./../controllers/');

var _controllers2 = _interopRequireDefault(_controllers);

var _api = require('./api');

var _api2 = _interopRequireDefault(_api);

var _response = require('./response');

var _response2 = _interopRequireDefault(_response);

var _logger = require('./logger');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var respondWithError = function respondWithError(_ref) {
    var e = _ref.e,
        res = _ref.res;
    var code = e.code,
        message = e.message;

    _logger.logger.error(code, message);
    if (code == 502) {
        return (0, _response2.default)({
            status: 400,
            data: {
                error: message
            },
            res: res
        });
    }
    return (0, _response2.default)({
        status: code,
        data: {
            error: message
        },
        res: res
    });
};

var router = function () {
    var _ref2 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee(req, res, next) {
        var url, parts, controller, result, controllerObject, routes, matches, routeMatch, params, argParams, args, obj, method;
        return _regenerator2.default.wrap(function _callee$(_context) {
            while (1) {
                switch (_context.prev = _context.next) {
                    case 0:
                        url = req.originalUrl;
                        parts = url.split('/').filter(Boolean);
                        controller = parts[0] == 'api' ? parts[1] : parts[0];

                        if (!(parts[0] == 'api')) {
                            _context.next = 16;
                            break;
                        }

                        result = void 0;
                        _context.prev = 5;
                        _context.next = 8;
                        return (0, _api2.default)(req);

                    case 8:
                        result = _context.sent;
                        _context.next = 14;
                        break;

                    case 11:
                        _context.prev = 11;
                        _context.t0 = _context['catch'](5);
                        return _context.abrupt('return', respondWithError({
                            e: _context.t0,
                            res: res
                        }));

                    case 14:
                        if (!(result && result.data)) {
                            _context.next = 16;
                            break;
                        }

                        return _context.abrupt('return', (0, _response2.default)({
                            data: result.data,
                            res: res
                        }));

                    case 16:
                        controllerObject = _controllers2.default[controller];
                        routes = (0, _keys2.default)(controllerObject).map(function (route) {
                            var keys = [],
                                re = (0, _pathToRegexp2.default)(route, keys);
                            if (re.test(url)) {
                                var _result = re.exec(url);
                                keys = keys.map(function (key, i) {
                                    return (0, _defineProperty3.default)({}, key.name, _result[i + 1]);
                                });
                            }
                            return {
                                route: route,
                                regexp: re,
                                method: controllerObject[route],
                                params: keys
                            };
                        });
                        matches = routes.filter(function (route) {
                            return route.regexp.test(url);
                        });
                        routeMatch = matches.length && matches[0];

                        if (routeMatch) {
                            _context.next = 22;
                            break;
                        }

                        return _context.abrupt('return', res.sendStatus(404));

                    case 22:
                        params = routeMatch.params;
                        argParams = params.reduce(function (accum, curr) {
                            var key = (0, _keys2.default)(curr)[0];
                            accum[key] = curr[key];
                            return accum;
                        }, {});
                        args = (0, _extends3.default)({}, req.body, req.query, argParams, { user: req.user });
                        obj = void 0, method = routeMatch.method;

                        if (typeof method !== 'function') {
                            method = method[req.method.toLowerCase()];
                        }
                        _context.prev = 27;
                        _context.next = 30;
                        return method(args);

                    case 30:
                        obj = _context.sent;
                        _context.next = 36;
                        break;

                    case 33:
                        _context.prev = 33;
                        _context.t1 = _context['catch'](27);
                        return _context.abrupt('return', respondWithError({
                            e: _context.t1,
                            res: res
                        }));

                    case 36:
                        return _context.abrupt('return', (0, _response2.default)({
                            data: obj || {},
                            res: res
                        }));

                    case 37:
                    case 'end':
                        return _context.stop();
                }
            }
        }, _callee, undefined, [[5, 11], [27, 33]]);
    }));

    return function router(_x, _x2, _x3) {
        return _ref2.apply(this, arguments);
    };
}();

exports.default = router;
module.exports = exports['default'];