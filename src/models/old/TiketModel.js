const { DataTypes, Sequelize, UUIDV4 } = require("sequelize");
const db = require("../../configs/database");
const Wisata = require("../models/TempatwisataModel");

const Tiket = db.define(
  "tiket_wisata_kuliner",
  {
    id: {
      type: DataTypes.CHAR,
      primaryKey: true,
      autoIncrement: false,
      defaultValue: UUIDV4,
    },
    id_wisata: {
      type: DataTypes.CHAR,
      allowNull: false,
    },
    jenis_tiket: {
      type: DataTypes.CHAR,
      allowNull: false,
    },
    harga_tiket: {
      type: DataTypes.INTEGER,
    },
  },
  {
    tableName: "tiket_wisata_kuliner",
    modelName: "tiket_wisata_kuliner",
    paranoid: true,
    createdAt: "created_at",
    deletedAt: "deleted_at",
    updatedAt: "updated_at",
    // defaultScope: {
    //   where: Sequelize.literal("tiket_wisata_kuliner.deleted_at is null"),
    // },
  }
);

// Tiket.belongsTo(Wisata, {
//   foreignKey: "id",
//   sourceKey: "id_wisata",
// });

module.exports = Tiket;
