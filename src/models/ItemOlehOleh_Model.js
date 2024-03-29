const { DataTypes, Sequelize} = require("sequelize");
const sequalize = require("../configs/database");

const Item_Oleh_Oleh = sequalize.define(
  "tbl_item_oleh_oleh",
  {
    id_item_oleh_oleh: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
    },
    oleh_oleh_id: {
      type: DataTypes.CHAR,
      allowNull: false,
    },
    harga: {
      type: DataTypes.CHAR,
      allowNull: false,
    },
    nama_item: {
      type: DataTypes.CHAR,
      allowNull: false,
    },
    keterangan: {
      type: DataTypes.CHAR,
      allowNull: true,
    },
  },
  {
    tableName: "tbl_item_oleh_oleh",
    modelName: "tbl_item_oleh_oleh",
    createdAt: "created_at",
    updatedAt: "updated_at",
    deletedAt: "deleted_at",
  }
);

module.exports = Item_Oleh_Oleh