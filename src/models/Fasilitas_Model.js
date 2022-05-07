const { DataTypes, Sequelize} = require("sequelize");
const sequalize = require("../configs/database");

const Fasilitas = sequalize.define('tbl_fasilitas', {
    id_fasilitas: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false
    },
    id_pariwisata: {
        type: DataTypes.INTEGER,
        allowNull:false
    },
    nama_fasilitas: {
        type: DataTypes.INTEGER,
        allowNull:false
    },
    keterangan: {
        type: DataTypes.CHAR,
        allowNull:false
    },
}, {
    tableName: 'tbl_fasilitas',
    modelName: 'tbl_fasilitas',
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    deletedAt: 'deleted_at'
})

module.exports = Fasilitas