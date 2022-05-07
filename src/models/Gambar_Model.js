const { DataTypes, Sequelize} = require("sequelize");
const sequalize = require("../configs/database");

const Gambar = sequalize.define('tbl_gambar', {
    id_gambar: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false
    },
    id_pariwisata: {
        type: DataTypes.INTEGER,
        allowNull:false
    },
    gambar: {
        type: DataTypes.INTEGER,
        allowNull:false
    },
    keterangan: {
        type: DataTypes.CHAR,
        allowNull:false
    },
    tanggal: {
        type: DataTypes.CHAR,
        allowNull:false
    }
}, {
    tableName: 'tbl_gambar',
    modelName: 'tbl_gambar',
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    deletedAt: 'deleted_at'
})

module.exports = Gambar