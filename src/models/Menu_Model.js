const { DataTypes, Sequelize, UUIDV4 } = require("sequelize");
const sequalize = require("../configs/database");

const Menu = sequalize.define(
  "tbl_menu",
  {
    id_menu: {
      type: DataTypes.INTEGER,
      primaryKey: true
    },
    nama_menu: {
      type: DataTypes.CHAR,
      allowNull: false,
    },
    link_menu: {
      type: DataTypes.CHAR,
      allowNull: false,
    },
    is_parent: {
      type: DataTypes.CHAR,
    },
    icons: {
          type: DataTypes.CHAR,
          allowNull : false
    }
  },
  {
    tableName: "tbl_menu",
    modelName: "tbl_menu",
    paranoid: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
    deletedAt: "deleted_at",
    // defaultScope: { where: Sequelize.literal("user.deleted_at is null") },
  }
);

module.exports = Menu;