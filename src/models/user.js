'use strict';
module.exports = function(sequelize, DataTypes) {
    var User = sequelize.define('User', {
        firstName: {
            type: DataTypes.STRING
        },
        lastName: {
            type: DataTypes.STRING
        },
        email: {
            type: DataTypes.STRING,
            unique: true,
            allowNull: false
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: DataTypes.UUIDV1
        },
        passwordResetHash: {
            type: DataTypes.STRING,
            defaultValue: DataTypes.UUIDV1
        },
        full_user: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        },
        facebookUserId: {
            type: DataTypes.STRING
        },
        freeTrialEnd: {
            type: DataTypes.DATE
        },
        domainContactId: {
            type: DataTypes.INTEGER
        },
        lastPagesFetchFromFacebook: {
            type: DataTypes.DATE
        }
    });
    return User;
};
