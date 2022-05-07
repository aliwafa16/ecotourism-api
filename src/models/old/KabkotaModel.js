const {DataTypes, Sequelize, UUIDV4} = require("sequelize");
const sequelize = require('../../configs/database');

const Kabkota = sequelize.define('tbl_kab',
{
    id:{
        type: DataTypes.CHAR,
        primaryKey: true,
        autoIncrement: true,
        allowNull:true,
    },
    
    kode_prov: {
        type:DataTypes.INTEGER,
        allowNull:true,
    },

    kode_kab: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },

    nama_kabkota: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
},
{
    tableName: 'tbl_kab',
    modelName: 'Kabkota',
    paranoid: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    deletedAt: 'deleted_at',
    defaultScope: {where: Sequelize.literal('tbl_kab.deleted_at is null')},
}
);

module.exports =  Kabkota;