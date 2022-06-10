const { DataTypes, Sequelize} = require("sequelize");
const sequalize = require("../configs/database");

const Jadwal = sequalize.define('tbl_jadwal', {
    id_jadwal: {
        type: DataTypes.INTEGER,
        autoIncrement:true,
        primaryKey: true,
        allowNull: false
    },
    id_pariwisata: {
        type: DataTypes.CHAR,
        allowNull:false
    },
    hari: {
        type: DataTypes.CHAR,
        allowNull: false
    },
    jam_buka: {
        type: DataTypes.CHAR,
        allowNull:false
    },
    jam_tutup: {
        type: DataTypes.CHAR,
        allowNull:false
    },
    keterangan: {
        type: DataTypes.TEXT,
        allowNull:true
    }
}, {
    tableName: 'tbl_jadwal',
    modelName: 'tbl_jadwal',
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    deletedAt: 'deleted_at'
})

module.exports = Jadwal