const { DataTypes, Sequelize} = require("sequelize");
const sequalize = require("../configs/database");

const Kategori_Penginapan = sequalize.define('tbl_kategori_penginapan', {
    id_kategori_penginapan: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false
    },
    kategori: {
        type: DataTypes.CHAR,
        allowNull:false
    }
}, {
    tableName: 'tbl_kategori_penginapan',
    modelName: 'tbl_kategori_penginapan',
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    deletedAt: 'deleted_at'
})

module.exports = Kategori_Penginapan