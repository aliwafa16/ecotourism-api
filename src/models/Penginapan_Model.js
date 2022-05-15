const { DataTypes, Sequelize } = require("sequelize");
const sequalize = require("../configs/database");
const Kategori_Pariwisata = require("./Pariwisata_Model");

const Penginapan = sequalize.define("tbl_penginapan", {
    id_penginapan: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull:false
    },
    nama_penginapan: {
        type: DataTypes.CHAR,
        allowNull:false
    },
    deskripsi_penginapan: {
        type: DataTypes.TEXT,
        allowNull:false,
    },
    alamat_penginapan: {
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
    youtube:{
        type:DataTypes.CHAR,
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
    kategori_penginapan_id: {
        type:DataTypes.INTEGER,
        allowNull:false
    },
    kategori_pariwisata_id:{
        type:DataTypes.INTEGER,
        allowNull:false
    }

}, {
    tableName: 'tbl_penginapan',
    modelName: 'tbl_penginapan',
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    deletedAt: 'deleted_at'
})

module.exports = Penginapan