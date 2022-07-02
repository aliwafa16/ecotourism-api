const { DataTypes, Sequelize } = require("sequelize");
const sequalize = require("../configs/database");

const Pengguna = sequalize.define(
  "tbl_pengguna",
  {
    id_pengguna: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
    },
    role_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    username: {
      type: DataTypes.CHAR,
      allowNull: false,
    },
    email: {
      type: DataTypes.CHAR,
      allowNull: false,
    },
    password: {
      type: DataTypes.CHAR,
      allowNull: false,
    },
    no_telp: {
      type: DataTypes.CHAR,
      allowNull: true,
    },
    foto_profil: {
      type: DataTypes.CHAR,
      allowNull: true,
    },
    access_token: {
      type: DataTypes.CHAR,
      allowNull: true,
    },
    refresh_token: {
      type: DataTypes.CHAR,
      allowNull: true,
    },
    status: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    link_verifikasi: {
        type: DataTypes.TEXT,
        allowNull:false
    },
    reset_password: {
        type: DataTypes.TEXT,
        allowNull:true
    }
    
}, {
    tableName: 'tbl_pengguna',
    modelName: 'tbl_pengguna',
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    deletedAt: 'deleted_at'
})

module.exports = Pengguna
