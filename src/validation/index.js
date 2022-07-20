const {check, validationResult} = require('express-validator')
const response = require("../core/response");

exports.runValidation = (req,res,next)=>{
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        response.message= errors.array()[0].msg
        response.code = 110;
        res.send(response.getResponse());
    } else {
        next()
    }
    
}

exports.validationPariwisata = [
    check('kategori','Kategori harus diisi').notEmpty()
]

exports.validationWisata = [
    check('nama_wisata','Nama Wisata harus diisi').notEmpty(),
    check('deskripsi_wisata','Deskripsi Wisata harus diisi').notEmpty(),
    check('alamat_wisata','Alamat Wisata harus diisi').notEmpty(),
    check('latitude','Latitude harus diisi').notEmpty(),
    check('longitude','Longitude harus diisi').notEmpty(),
    check('kategori_pariwisata_id','Id Kategori Pariwisata harus diisi').notEmpty(),
    check('kategori_wisata_id','Id Kategori Wisata harus diisi').notEmpty(),
    check('status','Status harus diisi').notEmpty(),
    check('pengguna_id','Id Pengguna harus diisi').notEmpty()
]

exports.validationKuliner = [
    check('nama_kuliner','Nama Kuliner harus diisi').notEmpty(),
    check('deskripsi_kuliner','Deskripsi Kuliner harus diisi').notEmpty(),
    check('alamat_kuliner','Alamat Kuliner harus diisi').notEmpty(),
    check('latitude','Latitude harus diisi').notEmpty(),
    check('longitude','Longitude harus diisi').notEmpty(),
    check('kategori_pariwisata_id','Id Kategori Pariwisata harus diisi').notEmpty(),
    check('kategori_kuliner_id','Id Kategori Kuliner harus diisi').notEmpty(),
    check('status','Status harus diisi').notEmpty(),
    check('pengguna_id','Id Pengguna harus diisi').notEmpty()
]

exports.validationPenginapan = [
    check('nama_penginapan', 'Nama Penginapan harus diisi').notEmpty(),
    check('deskripsi_penginapan', 'Deskripsi Penginapan harus diisi').notEmpty(),
    check('alamat_penginapan', 'Alamat Penginapan harus diisi').notEmpty(),
    check('latitude', 'Latitude harus diisi').notEmpty(),
    check('longitude', 'Longitude harus diisi').notEmpty(),
    check('status', 'Status harus diisi').notEmpty(),
    check('pengguna_id', 'Id Pengguna harus diisi').notEmpty(),
    check('kategori_penginapan_id', 'Id Kategori Penginapan harus diisi').notEmpty(),
    check('kategori_pariwisata_id', 'Id Kategori Pariwisata harus diisi').notEmpty(),
]

exports.validationOlehOleh = [
    check('nama_oleh_oleh', 'Nama Oleh-oleh harus diisi').notEmpty(),
    check('deskripsi_oleh_oleh', 'Deskripsi Oleh-oleh harus diisi').notEmpty(),
    check('alamat_oleh_oleh', 'Alamat Oleh-oleh harus diisi').notEmpty(),
    check('latitude', 'Latitude harus diisi').notEmpty(),
    check('longitude', 'Longitude harus diisi').notEmpty(),
    check('status', 'Status harus diisi').notEmpty(),
    check('pengguna_id', 'Id Pengguna harus diisi').notEmpty(),
    check('kategori_pariwisata_id', 'Id Kategori Pariwisata harus diisi').notEmpty(),
]


exports.validationLogin = [
    check('email', 'Email harus diisi').notEmpty().isEmail().withMessage('Format email salah'),
    check('password','Password harus diisi').notEmpty()
]

exports.validationRegistrasi = [
    check('username', 'Username harus diisi').notEmpty(),
    check('email', 'Email harus diisi').notEmpty().isEmail().withMessage('Format email salah'),
    check('password', 'Password harus diisi').notEmpty().isLength({ min: 5 }).withMessage('Password minimal 5 karakter'),
]

exports.validationPengguna = [
    check('role_id','Id Role harus diisi').notEmpty(),
    check('username','Username harus diisi').notEmpty(),
    check('email','Email harus diisi').notEmpty().isEmail().withMessage('Format email salah'),
    check('password','Password harus diisi').notEmpty().isLength({ min: 5 }).withMessage('Password minimal 5 karakter'),
]

exports.validationKategoriWisata = [
  check("kategori", "kategori wisata harus diisi").notEmpty(),
];

exports.validationKategoriKuliner = [
  check("jenis_kuliner", "kategori kuliner harus diisi").notEmpty(),
];

exports.validationKategoriPenginapan = [
  check("kategori", "kategori penginapan harus diisi").notEmpty(),
];