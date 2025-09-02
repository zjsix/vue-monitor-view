const sequelize = require('@/dao/sequelize');
const { DataTypes } = require('sequelize');
const user = require('@/dao/user');
const record = sequelize.define('record', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
        comment: '主键'
    },
    ip: {
        type: DataTypes.STRING,
        allowNull: false,
        comment: 'ip'
    },
    projectName: {
        type: DataTypes.STRING,
        allowNull: false,
        comment: '应用程序名'
    },
    projectVersion: {
        type: DataTypes.STRING,
        allowNull: false,
        comment: '应用程序版本'
    },
    error: {
        type: DataTypes.JSON,
        allowNull: false,
        comment: '错误信息'
    },
    breadcrumbs: {
        type: DataTypes.JSON,
        allowNull: true,
        comment: '用户操作轨迹'
    },
}, {
    freezeTableName: true,
    timestamps: true
});

// record.belongsTo(user, { foreignKey: 'userId', targetKey: 'id' });

module.exports = record