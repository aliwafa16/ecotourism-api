const { DataTypes, Sequelize } = require("sequelize");
const sequalize = require("../configs/database");

const Kuliner = sequalize.define("tbl_kuliner", {
    id_kuliner: {
        type: DataTypes.CHAR,
        primaryKey: true,
        allowNull:false
    },
    nama_kuliner: {
        type: DataTypes.CHAR,
        allowNull:false
    },
    deskripsi_kuliner: {
        type: DataTypes.TEXT,
        allowNull:false,
    },
    alamat_kuliner: {
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
    kategori_kuliner_id: {
        type:DataTypes.INTEGER,
        allowNull:false
    },
    kategori_pariwisata_id:{
        type:DataTypes.INTEGER,
        allowNull:false
    }

}, {
    tableName: 'tbl_kuliner',
    modelName: 'tbl_kuliner',
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    deletedAt: 'deleted_at'
})

module.exports = Kuliner