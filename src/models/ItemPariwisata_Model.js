const { DataTypes, Sequelize} = require("sequelize");
const sequalize = require("../configs/database");

const Item_Pariwisata = sequalize.define('tbl_item_pariwisata', {
    id_item_pariwasata: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false
    },
    id_pariwisata: {
        type: DataTypes.INTEGER,
        allowNull:false
    },
    qr_code: {
        type: DataTypes.CHAR,
        allowNull: false
    },
    audio1: {
        type: DataTypes.CHAR,
        allowNull:true
    },
    audio2: {
        type: DataTypes.CHAR,
        allowNull:true
    },
    video1: {
        type: DataTypes.CHAR,
        allowNull:true
    },
    video2: {
        type: DataTypes.CHAR,
        allowNull:true
    },
    keterangan: {
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