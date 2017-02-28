'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

var _reactHtmlEmail = require('react-html-email');

var _reactHtmlEmail2 = _interopRequireDefault(_reactHtmlEmail);

var _reactLinkify = require('react-linkify');

var _reactLinkify2 = _interopRequireDefault(_reactLinkify);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_reactHtmlEmail2.default.injectReactEmailAttributes();

var textStyles = {
    fontSize: 16
};

var styles = {
    lineHeight: '1.65',
    fontFamily: 'Helvetica Neue, Helvetica, sans-serif',
    color: 'rgb(85,85,86)'
};

var titleStyle = {
    color: '#E81B00',
    fontSize: '20px',
    marginBottom: '20px',
    fontWeight: 'bold',
    paddingTop: '20px'
};

var subtitleStyle = {
    color: '#222',
    fontSize: '18px',
    marginBottom: '10px',
    fontWeight: 'bold',
    display: 'block',
    marginTop: '30px'
};

var css = '\n    body { line-height: 1.65; }\n    a { font-family: sans-serif; color: #E81B00; font-weight: bold; }\n    hr { background-color: #FFE952; height: 3px; border: none; margin: 40px 0; }\n    span { line-height: 1.65 !important; }\n    table { float: none !important; }\n'.trim();

var emailHTML = function emailHTML(_ref) {
    var mentions = _ref.mentions,
        dms = _ref.dms,
        frequency = _ref.frequency;

    var title = 'New Twitter digest from Disconnect Today';
    return (0, _reactHtmlEmail.renderEmail)(_react2.default.createElement(
        _reactHtmlEmail.Email,
        { title: title, headCSS: css },
        _react2.default.createElement(
            _reactHtmlEmail.Item,
            null,
            _react2.default.createElement(
                _reactHtmlEmail.Box,
                null,
                _react2.default.createElement(
                    _reactHtmlEmail.Item,
                    null,
                    _react2.default.createElement(
                        _reactHtmlEmail.Span,
                        { style: (0, _extends3.default)({}, titleStyle, {
                                lineHeight: '1.8'
                            }) },
                        title
                    )
                )
            ),
            _react2.default.createElement(
                _reactHtmlEmail.Box,
                null,
                _react2.default.createElement(
                    _reactHtmlEmail.Item,
                    null,
                    !!dms.length && _react2.default.createElement(
                        _reactHtmlEmail.Span,
                        null,
                        _react2.default.createElement(
                            _reactHtmlEmail.Span,
                            { style: (0, _extends3.default)({}, subtitleStyle) },
                            'Direct messages'
                        ),
                        _react2.default.createElement(
                            _reactHtmlEmail.A,
                            { style: {
                                    display: 'block',
                                    marginBottom: '20px'
                                }, href: 'https://twitter.com/direct_messages' },
                            'View DMs'
                        ),
                        _react2.default.createElement(
                            _reactHtmlEmail.Box,
                            null,
                            dms.map(function (dm) {
                                return _react2.default.createElement(
                                    _reactHtmlEmail.Item,
                                    { style: {
                                            padding: '20px 0'
                                        } },
                                    _react2.default.createElement(
                                        _reactHtmlEmail.Span,
                                        null,
                                        _react2.default.createElement(_reactHtmlEmail.Image, { src: dm.from.avatar, width: '48', height: '48', style: {
                                                display: 'block',
                                                marginBottom: '10px'
                                            } }),
                                        _react2.default.createElement(
                                            _reactHtmlEmail.Span,
                                            { style: {
                                                    display: 'block',
                                                    marginBottom: '10px'
                                                } },
                                            'From ',
                                            _react2.default.createElement(
                                                _reactHtmlEmail.A,
                                                { href: 'https://twitter.com/@' + dm.from.name },
                                                '@',
                                                dm.from.name
                                            )
                                        ),
                                        _react2.default.createElement(
                                            _reactHtmlEmail.Span,
                                            { style: {
                                                    fontStyle: 'italic'
                                                } },
                                            _react2.default.createElement(
                                                _reactLinkify2.default,
                                                null,
                                                dm.text
                                            )
                                        ),
                                        _react2.default.createElement(
                                            _reactHtmlEmail.Span,
                                            { style: {
                                                    display: 'block',
                                                    marginTop: '5px',
                                                    fontSize: '12px'
                                                } },
                                            'Sent ',
                                            (0, _moment2.default)(dm.created_at).fromNow()
                                        )
                                    )
                                );
                            })
                        )
                    )
                )
            ),
            _react2.default.createElement(
                _reactHtmlEmail.Box,
                null,
                _react2.default.createElement(
                    _reactHtmlEmail.Item,
                    null,
                    !!mentions.length && _react2.default.createElement(
                        _reactHtmlEmail.Span,
                        null,
                        _react2.default.createElement(
                            _reactHtmlEmail.Span,
                            { style: (0, _extends3.default)({}, subtitleStyle) },
                            'Mentions'
                        ),
                        _react2.default.createElement(
                            _reactHtmlEmail.Box,
                            null,
                            mentions.map(function (mention) {
                                return _react2.default.createElement(
                                    _reactHtmlEmail.Item,
                                    { key: mention.id, style: {
                                            padding: '20px 0'
                                        } },
                                    _react2.default.createElement(
                                        _reactHtmlEmail.Span,
                                        null,
                                        _react2.default.createElement(_reactHtmlEmail.Image, { src: mention.from.avatar, width: '48', height: '48', style: {
                                                display: 'block',
                                                marginBottom: '10px'
                                            } }),
                                        _react2.default.createElement(
                                            _reactHtmlEmail.Span,
                                            { style: {
                                                    display: 'block',
                                                    marginBottom: '10px'
                                                } },
                                            'From ',
                                            _react2.default.createElement(
                                                _reactHtmlEmail.A,
                                                { href: 'https://twitter.com/@' + mention.from.name },
                                                '@',
                                                mention.from.name
                                            )
                                        ),
                                        _react2.default.createElement(
                                            _reactHtmlEmail.Span,
                                            { style: {
                                                    fontStyle: 'italic'
                                                } },
                                            _react2.default.createElement(
                                                _reactLinkify2.default,
                                                null,
                                                mention.text
                                            )
                                        ),
                                        _react2.default.createElement(
                                            _reactHtmlEmail.Span,
                                            { style: {
                                                    display: 'block',
                                                    marginTop: '5px',
                                                    fontSize: '12px'
                                                } },
                                            'Sent ',
                                            (0, _moment2.default)(mention.created_at).fromNow()
                                        ),
                                        _react2.default.createElement(
                                            _reactHtmlEmail.A,
                                            { style: {
                                                    display: 'block',
                                                    marginTop: '10px'
                                                }, href: 'https://twitter.com/' + mention.from.name + '/status/' + mention.id },
                                            'Reply'
                                        )
                                    )
                                );
                            })
                        )
                    )
                )
            ),
            _react2.default.createElement(
                _reactHtmlEmail.Box,
                { style: {
                        marginTop: '60px',
                        paddingTop: '20px',
                        borderTop: '1px solid rgba(0,0,0,0.1)'
                    } },
                _react2.default.createElement(
                    _reactHtmlEmail.Item,
                    null,
                    _react2.default.createElement(
                        _reactHtmlEmail.Span,
                        null,
                        'Have a lovely day \u270C\uFE0F'
                    )
                )
            )
        )
    ));
};

exports.default = emailHTML;
module.exports = exports['default'];