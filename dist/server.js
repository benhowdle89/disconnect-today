'use strict';

var _app = require('./app');

var _app2 = _interopRequireDefault(_app);

var _models = require('./models');

var _models2 = _interopRequireDefault(_models);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var port = process && process.env && process.env.PORT || undefined || 5000;

// START THE SERVER
// ==============================================
_models2.default.sequelize.sync().then(function () {
    _app2.default.listen(port);
    console.log('Magic happens on port ' + port);
});