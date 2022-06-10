const router = require("express").Router();
const response = require("../core/response");
const {Op} = require('sequelize')
const {runValidation, validationKuliner} = require('../validation/index');


const Kuliner = require('../models/Kuliner_Model');
const Menu = require('../models/MenuKuliner_Model');
const Jadwal = require('../models/Jadwal_Model');
const Kategori_Kuliner = require('../models/KategoriKuliner_Model');
const Fasilitas = require('../models/Fasilitas_Model');
const Gambar = require('../models/Gambar_Model');
const Kategori_Pariwisata = require('../models/Pariwisata_Model');

Kuliner.hasMany(Jadwal,{as:'jadwal', foreignKey:'id_pariwisata'});
Kuliner.hasMany(Menu,{as:'menu',foreignKey:'kuliner_id'});
Kuliner.belongsTo(Kategori_Kuliner,{as:'kategori_kuliner', foreignKey:'kategori_kuliner_id'});
Kuliner.hasMany(Fasilitas,{as:'fasilitas', foreignKey:'id_pariwisata'});
Kuliner.hasMany(Gambar,{as:'gambar', foreignKey:'id_pariwisata'});
Kuliner.belongsTo(Kategori_Pariwisata, {as:'kategori_pariwisata',foreignKey:'kategori_pariwisata_id'})

router.get('/', async (req, res) => {
    const options = {
        include:[
            {
                model : Jadwal,
                as : 'jadwal',
                attributes : ['id_jadwal','hari','jam_buka','jam_tutup','keterangan'],
            },
            {
                model : Kategori_Kuliner,
                as : 'kategori_kuliner',
                attributes:['jenis_kuliner']
            },
            {
                model : Kategori_Pariwisata,
                as : 'kategori_pariwisata',
                attributes:['kategori']
            },
            {
                model:Menu,
                as:'menu',
                attributes : ['id_menu_kuliner','nama_menu','harga','keterangan']
            },
            {
                model:Fasilitas,
                as:'fasilitas',
                attributes:['id_fasilitas','nama_fasilitas','keterangan']
            },
            {
                model:Gambar,
                as:'gambar',
                attributes:['id_gambar','gambar','keterangan','tanggal']
            }
        ],
    }

    try {
        const kuliner = await Kuliner.findAll(options)
        response.code = 200;
        response.message = "Sukses";
        response.data = kuliner;
        res.send(response.getResponse());
    } catch (error) {
        response.code = 110;
        response.message = error.message;
        res.send(response.getResponse());
    }
})

router.get('/search', async (req,res)=>{
    let search = req.query;
    const options = {
        include:[
            {
                model : Jadwal,
                as : 'jadwal',
                attributes : ['id_jadwal','hari','jam_buka','jam_tutup','keterangan'],
            },
            {
                model : Kategori_Kuliner,
                as : 'kategori_kuliner',
                attributes:['jenis_kuliner']
            },
            {
                model : Kategori_Pariwisata,
                as : 'kategori_pariwisata',
                attributes:['kategori']
            },
            {
                model:Menu,
                as:'menu',
                attributes : ['id_menu_kuliner','nama_menu','harga','keterangan']
            },
            {
                model:Fasilitas,
                as:'fasilitas',
                attributes:['id_fasilitas','nama_fasilitas','keterangan']
            },
            {
                model:Gambar,
                as:'gambar',
                attributes:['id_gambar','gambar','keterangan','tanggal']
            }
        ],
    }

    options["where"] = {
        [Op.or]: [
          {
            nama_kuliner: {
              [Op.like]: `%${search.nama_kuliner}%`,
            },
          },
          {
            alamat_kuliner: {
              [Op.like]: `%${search.alamat_kuliner}%`,
            },
          },

          {
            latitude: {
              [Op.like]: `%${search.latitude}%`,
            },
          },
          {
            longitude: {
              [Op.like]: `%${search.longitude}%`,
            },
          },
          {
              kategori_pariwisata_id:{
                  [Op.like]:`%${search.kategori_pariwisata_id}%`
              }
          },
          {
            kategori_kuliner_id:{
                [Op.like]:`%${search.kategori_kuliner_id}%`
            }
          },
          {
              "$kategori_kuliner.jenis_kuliner$" : {
                  [Op.like] : `%${search.jenis_kuliner}%`
              }
          },
          {
              "$menu.nama_menu$":{
                  [Op.like] : `%${search.nama_menu}%`
              }
          },
          {
            "$menu.harga$":{
                [Op.like] : `%${search.harga}%`
            }
          }
        ],
    };

    try {
        const kuliner = await Kuliner.findAll(options)
        if(kuliner.length != 0){
            response.code = 200;
            response.message = "Sukses";
            response.data = kuliner;
            res.send(response.getResponse());
        }else{
            response.code = 111;
            response.message = "Data tidak ditemukan";
            res.send(response.getResponse());
        }
    } catch (error) {
        response.code = 110;
        response.message = error.message;
        res.send(response.getResponse());
    }
})

router.get('/filter', async (req,res)=>{
    const filter = req.query
    const options = {
        include:[
            {
                model : Jadwal,
                as : 'jadwal',
                attributes : ['id_jadwal','hari','jam_buka','jam_tutup','keterangan'],
            },
            {
                model : Kategori_Kuliner,
                as : 'kategori_kuliner',
                attributes:['jenis_kuliner']
            },
            {
                model : Kategori_Pariwisata,
                as : 'kategori_pariwisata',
                attributes:['kategori']
            },
            {
                model:Menu,
                as:'menu',
                attributes : ['id_menu_kuliner','nama_menu','harga','keterangan']
            },
            {
                model:Fasilitas,
                as:'fasilitas',
                attributes:['id_fasilitas','nama_fasilitas','keterangan']
            },
            {
                model:Gambar,
                as:'gambar',
                attributes:['id_gambar','gambar','keterangan','tanggal']
            }
        ],
    }

    options["where"] = {
        ...options.where,
        [Op.and]: [],
      };
    
      if (filter.kategori_pariwisata_id) {
        options.where[Op.and].push({
          kategori_pariwisata_id: filter.kategori_pariwisata_id,
        });
      }

      if (filter.kategori_kuliner_id) {
        options.where[Op.and].push({
          kategori_kuliner_id: filter.kategori_kuliner_id,
        });
      }

      if (filter.status) {
        options.where[Op.and].push({
          status: filter.status,
        });
      }

      try {
        const kuliner = await Kuliner.findAll(options)
        if(kuliner.length!=0){
            response.code = 200;
            response.message = "Sukses";
            response.data = kuliner;
            res.send(response.getResponse());
        }else{
            response.code = 111;
            response.message = "Data tidak ditemukan";
            res.send(response.getResponse());
        }
      } catch (error) {
        response.code = 110;
        response.message = error.message;
        res.send(response.getResponse());
      }
})

router.get('/find', async(req,res)=>{
    const options = {
        include:[
            {
                model : Jadwal,
                as : 'jadwal',
                attributes : ['id_jadwal','hari','jam_buka','jam_tutup','keterangan'],
            },
            {
                model : Kategori_Kuliner,
                as : 'kategori_kuliner',
                attributes:['jenis_kuliner']
            },
            {
                model : Kategori_Pariwisata,
                as : 'kategori_pariwisata',
                attributes:['kategori']
            },
            {
                model:Menu,
                as:'menu',
                attributes : ['id_menu_kuliner','nama_menu','harga','keterangan']
            },
            {
                model:Fasilitas,
                as:'fasilitas',
                attributes:['id_fasilitas','nama_fasilitas','keterangan']
            },
            {
                model:Gambar,
                as:'gambar',
                attributes:['id_gambar','gambar','keterangan','tanggal']
            }
        ],
    }

    const find = req.query
    let modelAttr = Kuliner.rawAttributes;
    const findwhere = {};
    Object.values(modelAttr).forEach((val) => {
      Object.entries(find).forEach((f) => {
        const key = f[0];
        const value = f[1];
        if (val.field === key && value) {
          findwhere[val.field] = value.toString();
        }
      });
    });
    options["where"] = findwhere

    try {
        const kuliner = await Kuliner.findAll(options)
        if(kuliner.length!=0){
            response.code = 200;
            response.message = "Sukses";
            response.data = kuliner;
            res.send(response.getResponse());
        }else{
            response.code = 111;
            response.message = "Data tidak ditemukan";
            res.send(response.getResponse());
        }
    } catch (error) {
        response.code = 110;
        response.message = error.message;
        res.send(response.getResponse());
    }
})

router.get('/:id', async (req,res)=>{
    const options = {
        include:[
            {
                model : Jadwal,
                as : 'jadwal',
                attributes : ['id_jadwal','hari','jam_buka','jam_tutup','keterangan'],
            },
            {
                model : Kategori_Kuliner,
                as : 'kategori_kuliner',
                attributes:['jenis_kuliner']
            },
            {
                model : Kategori_Pariwisata,
                as : 'kategori_pariwisata',
                attributes:['kategori']
            },
            {
                model:Menu,
                as:'menu',
                attributes : ['id_menu_kuliner','nama_menu','harga','keterangan']
            },
            {
                model:Fasilitas,
                as:'fasilitas',
                attributes:['id_fasilitas','nama_fasilitas','keterangan']
            },
            {
                model:Gambar,
                as:'gambar',
                attributes:['id_gambar','gambar','keterangan','tanggal']
            }
        ],
    }

    options['where'] = {
        id_kuliner : req.params.id
    }

    try {
        const kuliner = await Kuliner.findOne(options)
        if(kuliner){
            response.code = 200;
            response.message = "Sukses";
            response.data = kuliner;
            res.send(response.getResponse());
        }else{
            response.code = 111;
            response.message = "Data tidak ditemukan";
            res.send(response.getResponse());
        }
    } catch (error) {
        response.code = 110;
        response.message = error.message;
        res.send(response.getResponse());
    }
})

router.post('/', validationKuliner, runValidation, async (req, res)=>{

    const lastest = await Kuliner.findOne({attributes:['id_kuliner'],order:[['created_at','DESC']]})
    const id_kuliner = parseInt(lastest.id_kuliner.slice(1))+1

    const modelAttr = Kuliner.rawAttributes
    const inputKuliner = {};

    Object.values(modelAttr).forEach((val) => {
        if (val.field != "id_kuliner") {
          if (req.body[val.field] != '') {
            inputKuliner[val.fieldName] = req.body[val.field];
          } else {
            inputKuliner[val.fieldName] = null;
          }
        }
    });

    inputKuliner['id_kuliner'] = `K`+id_kuliner

    
    try {
        const kuliner = await Kuliner.create(inputKuliner)
        response.code = 200;
        response.message = "Sukses";
        response.data = inputKuliner;
        res.send(response.getResponse());
    } catch (error) {
        response.code = 110;
        response.message = error.message;
        res.send(response.getResponse());
    }

})

router.put('/', validationKuliner, runValidation, async (req,res)=>{
    const options = {}
    options.where = {
        id_kuliner : req.body.id_kuliner
    }

    const modelAttr = Kuliner.rawAttributes
    const inputKuliner = {};
    inputKuliner.id_kuliner = req.body.id_kuliner
    Object.values(modelAttr).forEach((val) => {
        if (val.field != "id_kuliner") {
          if (req.body[val.field] != '') {
            inputKuliner[val.fieldName] = req.body[val.field];
          } else {
            inputKuliner[val.fieldName] = null;
          }
        }
    });
    console.log(inputKuliner)
    try {
        const kuliner = await Kuliner.update(inputKuliner, options);
        response.code = 200;
        response.message = "Sukses";
        response.data = inputKuliner;
        res.send(response.getResponse());
    } catch (error) {
        response.code = 110;
        response.message = error.message;
        res.send(response.getResponse());
    }
    
})


router.delete('/', async(req,res)=>{
    const options = {}
    options.where = {
        id_kuliner : req.body.id_kuliner
    }

    

    try {
        const kuliner = await Kuliner.destroy(options)
        response.code = 200;
        response.message = "Sukses";
        response.data = kuliner;
        res.send(response.getResponse());
    } catch (error) {
        response.code = 110;
        response.message = error.message;
        res.send(response.getResponse());
    }
})


// router.get("/find", (req, res) => {
//   let modelAttr = WisataKuliner.rawAttributes;
//   let wheres = {};
//   Object.values(modelAttr).forEach((val) => {
//     console.log(req.query[val.field]);
//     if (req.query[val.field] != null) {
//       wheres[val.field] = req.query[val.field];
//     }
//   });
//   console.log(wheres);
//   WisataKuliner.findAll({ where: wheres })
//   .then((wisata) => {
//     response.code = 200;
//     response.message = "Sukses";
//     response.data = wisata;
//     res.send(response.getResponse());
//   })
//   .catch((err) => response.error(res, { error: err.message }));
// });

// router.get("/:id", (req, res) => {
//   WisataKuliner.findOne({
//     where: { id: req.params.id },
//     include: [
//     { model: Kabkota },
//     { model: Tiket },
//     { model: Fasilitas },
//     { model: ItemWisata },
//     { model: GambarWisata },
//     { model: Jadwal },
//     ],
//   })
//   .then((data) => {
//     response.code = 200;
//     response.message = "Sukses";
//     response.data = data;
//     res.send(response.getResponse());
//   })
//   .catch((err) => {
//     response.code = 110;
//     response.message = err.message;
//     res.send(response.getResponse());
//   });
// });


// router.post("/insert", (req, res) => {
//   let Model = WisataKuliner.rawAttributes;

//   let input = {};
//   Object.values(Model).forEach((val) => {
//     if (val.field != "id") {
//       if (req.body[val.field] != null) {
//         input[val.fieldName] = req.body[val.field];
//       } else {
//         input[val.fieldName] = null;
//       }
//     }
//   });

//   console.log(input);

//   WisataKuliner.create(input)
//   .then((respon) => {
//     response.code = 200;
//     response.message = "Input Data Berhasil!";
//     response.data = input;
//     res.send(response.getResponse());
//   })
//   .catch((err) => {
//     response.code = 110;
//     response.message = err.message;
//     res.send(response.getResponse());
//   });
// });

// router.put("/update/:id", (req, res) => {
//   let Model = WisataKuliner.rawAttributes;
//   let input = {};
//   Object.values(Model).forEach((val) => {
//     input[val.fieldName] = req.body[val.field];
//   });

//   try {
//     const data = WisataKuliner.update(input, {
//       where: {
//         [WisataKuliner.primaryKeyAttribute]: req.params.id,
//       },
//     });
//     input["id"] = req.params.id;
//     response.code = 200;
//     response.message = "Ubah Data Berhasil";
//     response.data = input;
//     res.send(response.getResponse());
//   } catch (error) {
//     response.code = 110;
//     response.message = err.message;
//     res.send(response.getResponse());
//   }
// });

// router.delete("/delete", (req, res) => {
//   const id = req.body.id;
//   WisataKuliner.destroy({ where: { [WisataKuliner.primaryKeyAttribute]: id } })
//   .then((data) => {
//     response.code = 200;
//     response.message = "Delete Data Berhasil";
//     response.data = data;
//     res.send(response.getResponse());
//   })
//   .catch((err) => {
//     response.code = 110;
//     response.message = err.message;
//     res.send(response.getResponse());
//   });
// });

module.exports = router;