const { DataTypes, Sequelize} = require("sequelize");
const sequalize = require("../configs/database");

const Fasilitas_Kamar = sequalize.define('tbl_fasilitas_kamar', {
    id_fasilitas_kamar: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false
    },
    kamar_penginapan_id: {
        type: DataTypes.INTEGER,
        allowNull:false  
    },
    penginapan_id: {
        type: DataTypes.INTEGER,
        allowNull:false
    },
    nama_fasilitas: {
        type: DataTypes.CHAR,
        allowNull:false
    },
    keterangan: {
        type: DataTypes,
        allowNull: true
    }
}, {
    tableName: 'tbl_fasilitas_kamar',
    modelName: 'tbl_fasilitas_kamar',
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    deletedAt: 'deleted_at'
})

module.exports = Fasilitas_Kamar