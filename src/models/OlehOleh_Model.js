const { DataTypes, Sequelize } = require("sequelize");
const sequalize = require("../configs/database");

const Oleh_Oleh = sequalize.define("tbl_oleh_oleh", {
    id_oleh_oleh: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull:false
    },
    nama_oleh_oleh: {
        type: DataTypes.CHAR,
        allowNull:false
    },
    deskripsi_oleh_oleh: {
        type: DataTypes.TEXT,
        allowNull:false,
    },
    alamat_oleh_oleh: {
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
}, {
    tableName: 'tbl_oleh_oleh',
    modelName: 'tbl_oleh_oleh',
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    deletedAt: 'deleted_at'
})

module.exports = Oleh_Oleh