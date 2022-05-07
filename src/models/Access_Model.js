const { DataTypes, Sequelize, UUIDV4 } = require("sequelize");
const sequalize = require("../configs/database");

const Access = sequalize.define(
  "tbl_access_menu",
  {
    id_access_menu: {
      type: DataTypes.INTEGER,
      primaryKey: true
    },
    id_menu: {
      type: DataTypes.INTEGER,
    },
    id_role: {
        type : DataTypes.INTEGER
    }
  },
  {
    tableName: "tbl_access_menu",
    modelName: "tbl_access_menu",
    paranoid: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
    deletedAt: "deleted_at",
    // defaultScope: { where: Sequelize.literal("user.deleted_at is null") },
  }
);

module.exports = Access;