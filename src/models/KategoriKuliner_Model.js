const { DataTypes, Sequelize} = require("sequelize");
const sequalize = require("../configs/database");

const Kategori_Kuliner = sequalize.define(
  "tbl_kategori_kuliner",
  {
    id_kategori_kuliner: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
    },
    jenis_kuliner: {
      type: DataTypes.CHAR,
      allowNull: false,
    },
  },
  {
    tableName: "tbl_kategori_kuliner",
    modelName: "tbl_kategori_kuliner",
    createdAt: "created_at",
    updatedAt: "updated_at",
    deletedAt: "deleted_at",
  }
);

module.exports = Kategori_Kuliner