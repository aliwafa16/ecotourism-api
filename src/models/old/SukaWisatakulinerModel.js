const { DataTypes, Sequelize, UUIDV4 } = require("sequelize");
const sequelize = require("../configs/database");
const User = require("./UserModel");
const Wisata = require("./TempatwisataModel");

const SukaWisatakuliner = sequelize.define(
  "suka_wisata_kuliner",
  {
    id: {
      type: DataTypes.CHAR,
      primaryKey: true,
      autoIncrement: false,
      defaultValue: Sequelize.UUIDV4,
      allowNull: false,
    },

    id_wisata: {
      type: DataTypes.CHAR,
      allowNull: false,
    },

    id_user: {
      type: DataTypes.CHAR,
      allowNull: false,
    },
  },
  {
    tableName: "suka_wisata_kuliner",
    modelName: "SukaWisatakuliner",
    paranoid: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
    deletedAt: "deleted_at",
    // defaultScope: {
    //   where: Sequelize.literal("suka_wisata_kuliner.deleted_at is null"),
    // },
  }
);

// SukaWisatakuliner.belongsTo(User, {
//   foreignKey: "id",
//   sourceKey: "id_pengguna",
// });

SukaWisatakuliner.belongsTo(Wisata, {
  foreignKey: "id",
  sourceKey: "id_wisata",
});

module.exports = SukaWisatakuliner;
