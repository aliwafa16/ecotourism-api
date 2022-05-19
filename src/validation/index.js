const {check, validationResult} = require('express-validator')

exports.runValidation = (req,res,next)=>{
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({
            status:false,
            message:errors.array()[0].msg
        })
    }
    next()
}

exports.validationPariwisata = [
    check('kategori','Kategori is required').notEmpty()
]

exports.validationWisata = [
    check('nama_wisata','Nama Wisata is required').notEmpty(),
    check('deskripsi_wisata','Deskripsi Wisata is required').notEmpty(),
    check('alamat_wisata','Alamat Wisata is required').notEmpty(),
    check('latitude','Latitude is required').notEmpty(),
    check('longitude','Longitude is required').notEmpty(),
    check('kategori_pariwisata_id','Id Kategori Pariwisata is required').notEmpty(),
    check('kategori_wisata_id','Id Kategori Wisata is required').notEmpty(),
    check('status','Status is required').notEmpty(),
    check('pengguna_id','Id Pengguna is required').notEmpty()
]

exports.validationKuliner = [
    check('nama_kuliner','Nama Kuliner is required').notEmpty(),
    check('deskripsi_kuliner','Deskripsi Kuliner is required').notEmpty(),
    check('alamat_kuliner','Alamat Kuliner is required').notEmpty(),
    check('latitude','Latitude is required').notEmpty(),
    check('longitude','Longitude is required').notEmpty(),
    check('kategori_pariwisata_id','Id Kategori Pariwisata is required').notEmpty(),
    check('kategori_kuliner_id','Id Kategori Kuliner is required').notEmpty(),
    check('status','Status is required').notEmpty(),
    check('pengguna_id','Id Pengguna is required').notEmpty()
]

exports.validationPenginapan = [
    check('nama_penginapan', 'Nama Penginapan is required').notEmpty(),
    check('deskripsi_penginapan', 'Deskripsi Penginapan is required').notEmpty(),
    check('alamat_penginapan', 'Alamat Penginapan is required').notEmpty(),
    check('latitude', 'Latitude is required').notEmpty(),
    check('longitude', 'Longitude is required').notEmpty(),
    check('status', 'Status is required').notEmpty(),
    check('pengguna_id', 'Id Pengguna is required').notEmpty(),
    check('kategori_penginapan_id', 'Id Kategori Penginapan is required').notEmpty(),
    check('kategori_pariwisata_id', 'Id Kategori Pariwisata is required').notEmpty(),
]

exports.validationLogin = [
    check('email', 'Email is required').notEmpty().isEmail().withMessage('Email is not valid'),
    check('password','Password is required').notEmpty()
]