'use strict';
module.exports = {
    up: function(queryInterface, Sequelize) {
        return queryInterface.addColumn('Users', 'paused', {
            type: Sequelize.BOOLEAN,
            default: false
        });
    },
    down: function(queryInterface, Sequelize) {
        return queryInterface.removeColumn('Users', 'paused');
    }
};
