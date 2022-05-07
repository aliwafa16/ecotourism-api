const { DataTypes, Sequelize} = require("sequelize");
const sequalize = require("../configs/database");

const Komentar = sequalize.define('tbl_komentar', {
    id_komentar: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false
    },
    rating_id: {
        type: DataTypes.INTEGER,
        allowNull:false
    },
    pengguna_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    komentar: {
        type: DataTypes.TEXT,
        allowNull:true
    },
    tanggal: {
        type: DataTypes.CHAR,
        allowNull:true
    },
}, {
    tableName: 'tbl_komentar',
    modelName: 'tbl_komentar',
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    deletedAt: 'deleted_at'
})

module.exports = Komentar