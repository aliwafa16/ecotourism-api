const { DataTypes, Sequelize} = require("sequelize");
const sequalize = require("../configs/database");

const Kamar_Penginapan = sequalize.define('tbl_kamar_penginapan', {
    id_kamar_penginapan: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false
    },
    penginapan_id: {
        type: DataTypes.INTEGER,
        allowNull:false
    },
    tipe_kamar: {
        type: DataTypes.CHAR,
        allowNull:false
    },
    kapasitas: {
        type: DataTypes.CHAR,
        allowNull:false
    },
    harga: {
        type: DataTypes.CHAR,
        allowNull:false
    },
    keterangan: {
        type: DataTypes,
        allowNull: true
    }
}, {
    tableName: 'tbl_kamar_penginapan',
    modelName: 'tbl_kamar_penginapan',
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    deletedAt: 'deleted_at'
})

module.exports = Kamar_Penginapan