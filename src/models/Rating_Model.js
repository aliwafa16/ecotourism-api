const { DataTypes, Sequelize} = require("sequelize");
const sequalize = require("../configs/database");

const Rating = sequalize.define('tbl_rating', {
    id_rating: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement : true,
    },
    id_pariwisata: {
        type: DataTypes.CHAR,
        allowNull:false
    },
    pengguna_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    komentar: {
        type: DataTypes.TEXT,
        allowNull:true
    },
    rating: {
        type: DataTypes.INTEGER,
        allowNull:false
    },
    tanggal: {
        type: DataTypes.CHAR,
        allowNull:false
    },
}, {
    tableName: 'tbl_rating',
    modelName: 'tbl_rating',
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    deletedAt: 'deleted_at'
})

module.exports = Rating