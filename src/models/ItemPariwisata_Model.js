const { DataTypes, Sequelize} = require("sequelize");
const sequalize = require("../configs/database");

const Item_Pariwisata = sequalize.define('tbl_item_pariwisata', {
    id_item_pariwisata: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement:true,
    },
    id_pariwisata: {
        type: DataTypes.CHAR,
        allowNull:false
    },
    qr_code: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    audio: {
        type: DataTypes.CHAR,
        allowNull:true
    },
    deskripsi: {
        type: DataTypes.CHAR,
        allowNull:true
    }
}, {
    tableName: 'tbl_item_pariwisata',
    modelName: 'tbl_item_pariwisata',
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    deletedAt: 'deleted_at'
})

module.exports = Item_Pariwisata