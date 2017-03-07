'use strict';

module.exports = function (sequelize, DataTypes) {
    var User = sequelize.define('User', {
        email: {
            type: DataTypes.STRING
        },
        frequency: {
            type: DataTypes.STRING
        },
        twitterUsername: {
            type: DataTypes.STRING,
            unique: true
        },
        twitterUserId: {
            type: DataTypes.STRING
        },
        twitteroAuthToken: {
            type: DataTypes.STRING
        },
        twitteroAuthTokenSecret: {
            type: DataTypes.STRING
        },
        stripeChargeId: {
            type: DataTypes.STRING
        },
        lastFetchedFromTwitter: {
            type: DataTypes.DATE
        },
        paused: {
            type: DataTypes.BOOLEAN,
            default: false
        }
    }, {
        getterMethods: {
            isFullUser: function isFullUser() {
                return !!this.getDataValue('stripeChargeId');
            }
        }
    });
    return User;
};