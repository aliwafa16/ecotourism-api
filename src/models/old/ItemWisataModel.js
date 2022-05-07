const {DataTypes, Sequelize, UUIDV4} = require('sequelize');
const db = require('../../configs/database');

const ItemWisata = db.define('item_wisata', {
    id : {
        type : DataTypes.INTEGER,
        primaryKey : true,
    },
    id_wisata : {
        type: DataTypes.INTEGER,
        allowNull:false,

    },
    deskripsi : {
        type: DataTypes.TEXT,
        allowNull : false
    },
    audio : {
        type : DataTypes.CHAR,
        allowNull : false
    },
    vidio : {
        type : DataTypes.CHAR,
        allowNull : false
    }
},{
    tableName : 'item_wisata',
    modelName:'item_wisata',
    paranoid : true,
    createdAt : 'created_at',
    deletedAt : 'deleted_at',
    updatedAt : 'updated_at',
    // defaultScope : {
    //     where : Sequelize.literal('item_wisata.deleted_at is null')
    // }
})


module.exports = ItemWisata;