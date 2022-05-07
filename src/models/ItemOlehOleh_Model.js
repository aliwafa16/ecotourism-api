const { DataTypes, Sequelize} = require("sequelize");
const sequalize = require("../configs/database");

const Item_Oleh_Oleh = sequalize.define('tbl_item_oleh_oleh', {
    id_item_oleh_oleh: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false
    },
    oleh_oleh_id: {
        type: DataTypes.INTEGER,
        allowNull:false
    },
    nama_item: {
        type: DataTypes.CHAR,
        allowNull: false
    },
    keterangan: {
        type: DataTypes.CHAR,
        allowNull:false
    }
}, {
    tableName: 'tbl_item_oleh_oleh',
    modelName: 'tbl_item_oleh_oleh',
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    deletedAt: 'deleted_at'
})

module.exports = Item_Oleh_Oleh