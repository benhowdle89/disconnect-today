'use strict';

var _keys = require('babel-runtime/core-js/object/keys');

var _keys2 = _interopRequireDefault(_keys);

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _logger = require('./../etc/logger');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var fs = require('fs');
var path = require('path');
var Sequelize = require('sequelize');
var basename = path.basename(module.filename);
var env = process && process.env && process.env.NODE_ENV || 'development' || 'development';
var db = {};


if (process && process.env && process.env.DATABASE_URL || undefined) {
  var sequelize = new Sequelize(process && process.env && process.env.DATABASE_URL || undefined, {
    logging: _logger.logger.info,
    "ssl": true,
    "dialectOptions": {
      "ssl": true
    }
  });
} else {
  var config = require('./../../config/config.js')[env];
  var sequelize = new Sequelize(config.database, config.username, config.password, (0, _extends3.default)({}, config, {
    logging: false
  }));
}

fs.readdirSync(__dirname).filter(function (file) {
  return file.indexOf('.') !== 0 && file !== basename && file.slice(-3) === '.js';
}).forEach(function (file) {
  var model = sequelize['import'](path.join(__dirname, file));
  db[model.name] = model;
});

(0, _keys2.default)(db).forEach(function (modelName) {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;