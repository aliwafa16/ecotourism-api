const { DataTypes, Sequelize } = require("sequelize");
const sequalize = require("../configs/database");

const Wisata = sequalize.define("tbl_wisata", {
    id_wisata: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull:false
    },
    nama_wisata: {
        type: DataTypes.CHAR,
        allowNull:false
    },
    deskripsi_wisata: {
        type: DataTypes.TEXT,
        allowNull:false,
    },
    alamat_wisata: {
        type: DataTypes.TEXT,
        allowNull:false
    },
    no_cs: {
        type: DataTypes.CHAR,
        allowNull:true
    },
    email: {
        type: DataTypes.CHAR,
        allowNull:true
    },
    facebook: {
        type: DataTypes.CHAR,
        allowNull:true
    },
    instagram: {
        type: DataTypes.CHAR,
        allowNull:true
    },
    twitter: {
        type: DataTypes.CHAR,
        allowNull:true
    },
    tiktok: {
        type: DataTypes.CHAR,
        allowNull:true
    },
    website: {
        type: DataTypes.CHAR,
        allowNull: true
    },
    latitude: {
        type:DataTypes.CHAR,
        allowNull:false
    },
    longitude: {
        type: DataTypes.CHAR,
        allowNull:false
    },
    status: {
        type: DataTypes.INTEGER,
        allowNull:false
    },
    pengguna_id: {
        type: DataTypes.INTEGER,
        allowNull:false
    },
    kategori_wisata_id: {
        type:DataTypes.INTEGER,
        allowNull:false
    }

}, {
    tableName: 'tbl_wisata',
    modelName: 'tbl_wisata',
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    deletedAt: 'deleted_at'
})

module.exports = Wisata