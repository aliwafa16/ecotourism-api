const { DataTypes, Sequelize, UUIDV4 } = require("sequelize");
const DB = require("../../configs/database");

const Rating = DB.define(
  "rating_wisata",
  {
    id: {
      type: DataTypes.CHAR,
      primaryKey: true,
      autoIncrement: false,
      defaultValue: UUIDV4,
      allowNull: false,
    },

    id_wisata: {
      type: DataTypes.CHAR,
      allowNull: false,
    },

    id_pengguna: {
      type: DataTypes.CHAR,
      allowNull: false,
    },

    rating: {
      type: DataTypes.TEXT,
      allowNull: false,
    },

    keterangan: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  },
  {
    tableName: "rating_wisata",
    modelName: "rating_wisata",
    paranoid: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
    deletedAt: "deleted_at",
    // defaultScope: {
    //   where: Sequelize.literal("rating_wisata.deleted_at is null"),
    // },
  }
);
module.exports = Rating;
