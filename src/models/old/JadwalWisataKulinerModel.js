const {DataTypes, UUIDV4} = require('sequelize');
const db = require ('../../configs/database');

const Jadwal = db.define('jadwal_wisata_kuliner',{
    id : {
        type : DataTypes.CHAR,
        primaryKey:true,
        defaultValue:UUIDV4,
        autoIncrement:false
    },
    id_wisata : {
        type : DataTypes.CHAR,
        allowNull : false
    },
    hari : {
        type : DataTypes.CHAR,
        allowNull: false,
    },
    jam_buka : {
        type: DataTypes.TIME,
        allowNull : false
    },
    jam_tutup : {
        type : DataTypes.TIME,
        allowNull : false
    }
},{
    tableName : 'jadwal_wisata_kuliner',
    modelName:'jadwal_wisata_kuliner',
    paranoid : true,
    createdAt : 'created_at',
    updatedAt : 'updated_at',
    deletedAt : 'deleted_at',
    // defaultScope : {
    //     where : Sequelize.literal('jadwal_wisata_kuliner.deleted_at is null')
    // }
})

module.exports = Jadwal;