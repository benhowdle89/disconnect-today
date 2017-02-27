'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _winston = require('winston');

var _winston2 = _interopRequireDefault(_winston);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var env = process && process.env && process.env.NODE_ENV || 'development' || 'development';

var tsFormat = function tsFormat() {
  return new Date().toLocaleTimeString();
};

var logger = void 0;
if (env === 'test') {
  logger = new _winston2.default.Logger();
} else {
  logger = new _winston2.default.Logger({
    transports: [
    // colorize the output to the console
    new _winston2.default.transports.Console({
      timestamp: tsFormat,
      colorize: true,
      level: 'info'
    })]
  });
}

exports.default = { logger: logger };
module.exports = exports['default'];