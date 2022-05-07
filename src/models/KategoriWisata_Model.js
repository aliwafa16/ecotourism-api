const { DataTypes, Sequelize} = require("sequelize");
const sequalize = require("../configs/database");

const Kategori_Wisata = sequalize.define('tbl_kategori_wisata', {
    id_kategori_wisata: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false
    },
    kategori: {
        type: DataTypes.CHAR,
        allowNull:false
    }
}, {
    tableName: 'tbl_kategori_wisata',
    modelName: 'tbl_kategori_wisata',
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    deletedAt: 'deleted_at'
})

module.exports = Kategori_Wisata