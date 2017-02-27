"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

exports.default = function (_ref) {
    var res = _ref.res,
        _ref$status = _ref.status,
        status = _ref$status === undefined ? 200 : _ref$status,
        data = _ref.data;

    if (res.headersSent) {
        return;
    }
    if (!data) {
        return res.sendStatus(status);
    }
    return res.status(status).json({
        data: data,
        metadata: {}
    });
};

module.exports = exports["default"];