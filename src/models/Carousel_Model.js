const { DataTypes, Sequelize} = require("sequelize");
const sequalize = require("../configs/database");

const Carousel = sequalize.define('tbl_carousel', {
    id_carousel: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false
    },
    id_pariwisata: {
        type: DataTypes.INTEGER,
        allowNull:false
    },
    gambar_id: {
        type: DataTypes.INTEGER,
        allowNull:false
    },
    sort: {
        type: DataTypes.INTEGER,
        allowNull:false
    },
    status: {
        type: DataTypes.INTEGER,
        allowNull:false
    }
}, {
    tableName: 'tbl_carousel',
    modelName: 'tbl_carousel',
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    deletedAt: 'deleted_at'
})

module.exports = Carousel