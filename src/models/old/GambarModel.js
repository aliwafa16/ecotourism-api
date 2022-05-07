const { DataTypes, Sequelize, UUIDV4 } = require("sequelize");
const sequelize = require("../../configs/database");
const Wisata = require("../TempatwisataModel");

const GambarWisata = sequelize.define(
  "gambar_wisata_kuliner",
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

    gambar: {
      type: DataTypes.CHAR,
      allowNull: false,
    },

    main : {
      type: DataTypes.BOOLEAN
    }
  },
  {
    tableName: "gambar_wisata_kuliner",
    modelName: "Gambar",
    paranoid: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
    deletedAt: "deleted_at",
    // defaultScope: {
    //   where: Sequelize.literal("gambar_wisata_kuliner.deleted_at is null"),
    // },
  }
);

// GambarWisata.belongsTo(Wisata, {
//   foreignKey: "id",
//   sourceKey: "id_wisata",
// });

module.exports = GambarWisata;
