const { DataTypes, Sequelize} = require("sequelize");
const sequalize = require("../configs/database");

const Kategori_Pariwisata = sequalize.define(
  "tbl_kategori_pariwisata",
  {
    id_kategori_pariwisata: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    kategori: {
      type: DataTypes.CHAR,
    },
  },
  {
    tableName: "tbl_kategori_pariwisata",
    modelName: "tbl_kategori_pariwisata",
    createdAt: "created_at",
    updatedAt: "updated_at",
  }
);

module.exports = Kategori_Pariwisata