const { DataTypes, Sequelize, UUIDV4 } = require("sequelize");
const sequalize = require("../configs/database");

const User = sequalize.define(
  "tbl_user",
  {
    id: {
      type: DataTypes.CHAR,
      primaryKey: true,
      autoIncrement: false,
      defaultValue: UUIDV4,
    },
    email: {
      type: DataTypes.CHAR,
      allowNull: false,
    },
    nama: {
      type: DataTypes.CHAR,
      allowNull: false,
    },
    password: {
      type: DataTypes.CHAR,
      allowNull: false,
    },
    avatar: {
      type: DataTypes.CHAR,
    },
    id_role: {
      type: DataTypes.INTEGER
    },
    id_wisata: {
      type : DataTypes.CHAR
    },
    platform : {
      type : DataTypes.CHAR,
      allowNull : false
    }
  },
  {
    tableName: "tbl_user",
    modelName: "tbl_user",
    paranoid: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
    deletedAt: "deleted_at",
    // defaultScope: { where: Sequelize.literal("user.deleted_at is null") },
  }
);

module.exports = User;
