
const sequelize = require('@/dao/sequelize');
const { DataTypes } = require('sequelize');

const user = sequelize.define('user', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
        comment: '主键id'
    },
    username: {
        type: DataTypes.STRING,
        allowNull: false,
        comment: '用户名'
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
        comment: '密码'
    },
    isAdmin: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
        defaultValue: false,
        comment: '是否管理员'
    },
    email: {
        type: DataTypes.STRING,
        allowNull: true,
        comment: '邮箱'
    }
}, {
    freezeTableName: true,
    timestamps: true
});

module.exports = user