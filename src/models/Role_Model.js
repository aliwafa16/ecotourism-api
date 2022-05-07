const { DataTypes, Sequelize, UUIDV4 } = require("sequelize");
const sequalize = require("../configs/database");

const Role = sequalize.define(
  "tbl_role",
  {
    id_role: {
      type: DataTypes.INTEGER,
      primaryKey: true
    },
    role: {
      type: DataTypes.CHAR,
      allowNull: false,
    },
  },
  {
    tableName: "tbl_role",
    modelName: "tbl_role",
    createdAt: "created_at",
    updatedAt: "updated_at",
    deletedAt: "deleted_at",
    // defaultScope: { where: Sequelize.literal("user.deleted_at is null") },
  }
);

module.exports = Role;