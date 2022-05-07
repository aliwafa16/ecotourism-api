const {DataTypes, Sequelize, UUIDV4} = require("sequelize");
const sequelize = require('../configs/database');
const Fasilitas = require("./FasilitasModel");
const Kabkota = require("./old/KabkotaModel");
const Tiket = require("./TiketModel");
const Item = require("./old/ItemWisataModel");
const Gambar = require("./old/GambarModel");
const Jadwal = require("./old/JadwalWisataKulinerModel");
const Rating = require("./old/RatingWisataModel");

const User = require("./UserModel");

const WisataKuliner = sequelize.define('tempat_wisata_kuliner',
{
    id:{
        type: DataTypes.CHAR,
        primaryKey: true,
        autoIncrement: false,
        defaultValue: Sequelize.UUIDV4,
        allowNull:true,
    },
    
    nama_wisata: {
        type:DataTypes.CHAR,
        allowNull:true,
    },

    deskripsi: {
        type: DataTypes.TEXT,
        allowNull: true,
    },

    alamat: {
        type: DataTypes.TEXT,
        allowNull: true,
    },

    kecamatan: {
        type: DataTypes.CHAR,
        allowNull: false,
    },

    kab_kota: {
        type: DataTypes.CHAR,
        allowNull: false,
    },

    no_hp : {
        type: DataTypes.CHAR,
        allowNull: false,
    },

    kategori: {
        type:DataTypes.ENUM(['1', '2', '3']),
        allowNull: false,
    },

    is_main: {
      type: DataTypes.BOOLEAN,
  },

  is_favorit: {
      type: DataTypes.BOOLEAN,
  },

  shownCarousel: {
      type: DataTypes.BOOLEAN,
  },

  web: {
    type: DataTypes.CHAR,
    allowNull: false,
},

facebook : {
    type: DataTypes.CHAR,
    allowNull: false,
},

instagram: {
    type: DataTypes.CHAR,
    allowNull:false,
},

longtitude: {
    type:DataTypes.FLOAT,
    allowNull: false,
},

latitude: {
    type: DataTypes.FLOAT,
    allowNull: false,
},
},
{
    tableName: 'tempat_wisata_kuliner',
    modelName: 'Wisata_Kuliner',
    paranoid: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    deletedAt: 'deleted_at',
    defaultScope: {where: Sequelize.literal('tempat_wisata_kuliner.deleted_at is null')},
}
);

WisataKuliner.hasOne(Kabkota, {foreignKey:'kode_kab', sourceKey: 'kab_kota'});
WisataKuliner.hasMany(Tiket, {foreignKey:'id_wisata'});
WisataKuliner.hasMany(Fasilitas, {foreignKey:'id_wisata'});
WisataKuliner.hasMany(Item, {foreignKey:'id_wisata'});
WisataKuliner.hasMany(Gambar, {foreignKey:'id_wisata'});
WisataKuliner.hasMany(Jadwal, {foreignKey:'id_wisata'});
WisataKuliner.hasMany(Rating, {foreignKey:'id_wisata'});

Rating.hasOne(User,{foreignKey : 'id', sourceKey : 'id_pengguna' });


module.exports =  WisataKuliner;
