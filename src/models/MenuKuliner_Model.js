const { DataTypes, Sequelize} = require("sequelize");
const sequalize = require("../configs/database");

const Menu_Kuliner = sequalize.define('tbl_menu_kuliner', {
    id_menu_kuliner: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false
    },
    kuliner_id: {
        type: DataTypes.INTEGER,
        allowNull:false
    },
    nama_menu: {
        type: DataTypes.CHAR,
        allowNull: false
    },
    harga: {
        type: DataTypes.CHAR,
        allowNull:false
    },
    keterangan: {
        type: DataTypes.CHAR,
        allowNull:true
    },
}, {
    tableName: 'tbl_menu_kuliner',
    modelName: 'tbl_menu_kuliner',
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    deletedAt: 'deleted_at'
})

module.exports = Menu_Kuliner