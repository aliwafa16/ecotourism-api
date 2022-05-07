const { DataTypes, Sequelize} = require("sequelize");
const sequalize = require("../configs/database");

const Tiket = sequalize.define('tbl_tiket', {
    id_tiket: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false
    },
    id_pariwisata: {
        type: DataTypes.INTEGER,
        allowNull:false
    },
    jadwal_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    tiket: {
        type: DataTypes.CHAR,
        allowNull:false
    },
    keterangan: {
        type: DataTypes.CHAR,
        allowNull:true
    },
}, {
    tableName: 'tbl_tiket',
    modelName: 'tbl_tiket',
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    deletedAt: 'deleted_at'
})

module.exports = Tiket