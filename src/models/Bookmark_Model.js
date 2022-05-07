const { DataTypes, Sequelize} = require("sequelize");
const sequalize = require("../configs/database");

const Bookmark = sequalize.define('tbl_bookmark', {
    id_bookmark: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false
    },
    id_pariwisata: {
        type: DataTypes.INTEGER,
        allowNull:false
    },
    pengguna_id: {
        type: DataTypes.INTEGER,
        allowNull:false
    },
    tanggal: {
        type: DataTypes.CHAR,
        allowNull:false
    },
}, {
    tableName: 'tbl_bookmark',
    modelName: 'tbl_bookmark',
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    deletedAt: 'deleted_at'
})

module.exports = Bookmark