'use strict';
module.exports = {
    up: function(queryInterface, Sequelize) {
        return queryInterface.createTable('Users', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            email: {
                type: Sequelize.STRING
            },
            frequency: {
                type: Sequelize.STRING
            },
            twitterUsername: {
                type: Sequelize.STRING,
                unique: true
            },
            twitterUserId: {
                type: Sequelize.STRING
            },
            twitteroAuthToken: {
                type: Sequelize.STRING
            },
            twitteroAuthTokenSecret: {
                type: Sequelize.STRING
            },
            stripeChargeId: {
                type: Sequelize.STRING
            },
            lastFetchedFromTwitter: {
                type: Sequelize.DATE
            },
            createdAt: {
                allowNull: false,
                type: Sequelize.DATE
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE
            }
        });
    },
    down: function(queryInterface, Sequelize) {
        return queryInterface.dropTable('Users');
    }
};
