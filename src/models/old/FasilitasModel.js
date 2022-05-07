const { DataTypes, Sequelize, UUIDV4 } = require("sequelize");
const sequelize = require("../configs/database");
const Wisata = require("./TempatwisataModel");

const Fasilitas = sequelize.define(
  "fasilitas_wisata_kuliner",
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

    fasilitas: {
      type: DataTypes.CHAR,
      allowNull: false,
    },

    icon: {
      type: DataTypes.CHAR,
      allowNull: false,
    },
  },
  {
    tableName: "fasilitas_wisata_kuliner",
    modelName: "fasilitas_wisata_kuliner",
    paranoid: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
    deletedAt: "deleted_at",
    // defaultScope: {
    //   where: Sequelize.literal("fasilitas_wisata_kuliner.deleted_at is null"),
    // },
  }
);
// Fasilitas.belongsTo(Wisata, {
//   foreignKey: "id",
//   sourceKey: "id_wisata",
// });

module.exports = Fasilitas;
