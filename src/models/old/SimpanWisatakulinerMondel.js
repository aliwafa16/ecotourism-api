const { DataTypes, Sequelize, UUIDV4 } = require("sequelize");
const sequelize = require("../../configs/database");
const User = require("../UserModel");
const Wisata = require("./TempatwisataModel");
const Gambar = require("./GambarModel");

const SimpanWisataKuliner = sequelize.define(
  "simpan_wisata_kuliner",
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
    tableName: "simpan_wisata_kuliner",
    modelName: "SimpanWisatakuliner",
    paranoid: false,
    createdAt: "created_at",
    updatedAt: "updated_at",
    deletedAt: "deleted_at",
    defaultScope: {
      where: Sequelize.literal("simpan_wisata_kuliner.deleted_at is null"),
    },
  }
  );

SimpanWisataKuliner.hasOne(User, {
  foreignKey: "id",
  sourceKey: "id_user",
});

SimpanWisataKuliner.hasOne(Wisata, {
  foreignKey: "id",
  sourceKey: "id_wisata",
});

Wisata.hasMany(Gambar, {foreignKey:'id_wisata'});

module.exports = SimpanWisataKuliner;
