'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _logger = require('./etc/logger');

var _router = require('./etc/router');

var _router2 = _interopRequireDefault(_router);

var _compression = require('compression');

var _compression2 = _interopRequireDefault(_compression);

var _cookieParser = require('cookie-parser');

var _cookieParser2 = _interopRequireDefault(_cookieParser);

var _userFromToken = require('./etc/user-from-token');

var _userFromToken2 = _interopRequireDefault(_userFromToken);

var _connect = require('./controllers/twitter/connect');

var _connect2 = _interopRequireDefault(_connect);

var _callback = require('./controllers/twitter/callback');

var _callback2 = _interopRequireDefault(_callback);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var app = (0, _express2.default)(); // server.js

// BASE SETUP
// ==============================================

app.use(_bodyParser2.default.json());
app.use(_bodyParser2.default.urlencoded({
    extended: false
}));
app.use((0, _cookieParser2.default)());
app.use((0, _compression2.default)());

app.use(_express2.default.static(__dirname + '/public'));
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');

app.use(function (req, res, next) {
    _logger.logger.info('REQUEST', req.url, req.method);
    next();
});

var renderIndex = function renderIndex(res, loggedIn) {
    res.render('index', {
        NODE_ENV: process && process.env && process.env.NODE_ENV || 'development',
        STRIPE_TOKEN: process && process.env && process.env.STRIPE_TOKEN || 'pk_test_WRMMegQqCoCRe6pKB8rL9pLr',
        LOGGED_IN: loggedIn
    });
};

var render = function () {
    var _ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee(res, authToken, req) {
        var user;
        return _regenerator2.default.wrap(function _callee$(_context) {
            while (1) {
                switch (_context.prev = _context.next) {
                    case 0:
                        if (!authToken) {
                            _context.next = 9;
                            break;
                        }

                        _context.next = 3;
                        return (0, _userFromToken2.default)(req, { api: false }, authToken);

                    case 3:
                        user = _context.sent;

                        if (user) {
                            _context.next = 6;
                            break;
                        }

                        return _context.abrupt('return', renderIndex(res, false));

                    case 6:
                        return _context.abrupt('return', renderIndex(res, user));

                    case 9:
                        renderIndex(res, false);

                    case 10:
                    case 'end':
                        return _context.stop();
                }
            }
        }, _callee, undefined);
    }));

    return function render(_x, _x2, _x3) {
        return _ref.apply(this, arguments);
    };
}();

app.use('*', function () {
    var _ref2 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee2(req, res, next) {
        var url, result, authToken;
        return _regenerator2.default.wrap(function _callee2$(_context2) {
            while (1) {
                switch (_context2.prev = _context2.next) {
                    case 0:
                        url = req.originalUrl;

                        if (!url.match(/twitter-connect/)) {
                            _context2.next = 3;
                            break;
                        }

                        return _context2.abrupt('return', (0, _connect2.default)(req, res));

                    case 3:
                        if (!url.match(/twitter-callback/)) {
                            _context2.next = 9;
                            break;
                        }

                        _context2.next = 6;
                        return (0, _callback2.default)(req, res);

                    case 6:
                        result = _context2.sent;

                        res.cookie('auth-token', result.data.user.token, {
                            expires: new Date(Date.now() + 9999999),
                            httpOnly: false
                        });
                        return _context2.abrupt('return', res.redirect('/dashboard'));

                    case 9:
                        if (url.match(/api/)) {
                            _context2.next = 12;
                            break;
                        }

                        authToken = req.cookies['auth-token'] || null;
                        return _context2.abrupt('return', render(res, authToken, req));

                    case 12:
                        return _context2.abrupt('return', (0, _router2.default)(req, res, next));

                    case 13:
                    case 'end':
                        return _context2.stop();
                }
            }
        }, _callee2, undefined);
    }));

    return function (_x4, _x5, _x6) {
        return _ref2.apply(this, arguments);
    };
}());

exports.default = app;
module.exports = exports['default'];