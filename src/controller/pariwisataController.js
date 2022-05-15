const router = require("express").Router();
const response = require("../core/response");
const { Op } = require("sequelize");

const Pariwisata = require("../models/Pariwisata_Model");
const Wisata = require("../models/Wisata_Model");
const Oleh_Oleh = require("../models/OlehOleh_Model");
const Penginapan = require("../models/Penginapan_Model");
const Kuliner = require("../models/Kuliner_Model");
const {runValidation, validationPariwisata} = require("../validation/index");

Pariwisata.hasMany(Wisata,{as:'wisata',foreignKey:'kategori_pariwisata_id'})
Pariwisata.hasMany(Oleh_Oleh,{as : 'oleh_oleh',foreignKey:'kategori_pariwisata_id'})
Pariwisata.hasMany(Penginapan,{as: 'penginapan', foreignKey:'kategori_pariwisata_id'});
Pariwisata.hasMany(Kuliner,{as:'kuliner', foreignKey:'kategori_pariwisata_id'});


router.get('/', async (req, res) => {
    const options = {
        include:[
            {
                model:Wisata,
                as: 'wisata'
            },{
                model:Oleh_Oleh,
                as: 'oleh_oleh'
            },{
                model:Penginapan,
                as: 'penginapan'
            },{
                model: Kuliner,
                as:'kuliner'
            }],
            attributes:{
                exclude:['created_at','deleted_at','updated_at']
            }
    }
    try {
        const pariwisata = await Pariwisata.findAll(options)
        response.code = 200;
        response.message = "Sukses";
        response.data = pariwisata;
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
                model:Wisata,
                as: 'wisata'
            },{
                model:Oleh_Oleh,
                as: 'oleh_oleh'
            },{
                model:Penginapan,
                as: 'penginapan'
            },{
                model: Kuliner,
                as:'kuliner'
            }],
            attributes:{
                exclude:['created_at','deleted_at','updated_at']
            }
    }

    options["where"] = {
        [Op.or]: [
          {
            "$wisata.nama_wisata$": {
              [Op.like]: `%${search.nama_wisata}%`,
            },
          },
          {
            "$oleh_oleh.nama_oleh_oleh$": {
              [Op.like]: `%${search.nama_oleh_oleh}%`,
            },
          },

          {
            "$penginapan.nama_penginapan$": {
              [Op.like]: `%${search.nama_penginapan}%`,
            },
          },
          {
            "$kuliner.nama_kuliner$": {
              [Op.like]: `%${search.nama_kuliner}%`,
            },
          },
          {
              kategori : {
                  [Op.like] : `%${search.kategori}%`
              }
          },
          {
              id_kategori_pariwisata : {
                  [Op.like] : `%${search.id_kategori_pariwisata}%`
              }
          }
        ],
    };
    try {
        const pariwisata = await Pariwisata.findAll(options)
        if(pariwisata.length!=0){
            response.code = 200;
            response.message = "Sukses";
            response.data = pariwisata;
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

router.get('/filter', async(req,res)=>{
    let filter = req.query;

    const options = {
        include:[
            {
                model:Wisata,
                as: 'wisata'
            },{
                model:Oleh_Oleh,
                as: 'oleh_oleh'
            },{
                model:Penginapan,
                as: 'penginapan'
            },{
                model: Kuliner,
                as:'kuliner'
            }],
            attributes:{
                exclude:['created_at','deleted_at','updated_at']
            }
    }

    options["where"] = {
        ...options.where,
        [Op.and]: [],
      };

      if (filter.id_kategori_pariwisata) {
        options.where[Op.and].push({
          id_kategori_pariwisata: filter.id_kategori_pariwisata,
        });
      }

      if (filter.kategori) {
        options.where[Op.and].push({
          kategori: filter.kategori,
        });
      }

      if (filter.kategori_wisata_id) {
        options.where[Op.and].push({
          "$wisata.kategori_wisata_id$": filter.kategori_wisata_id,
        });
      }

      if (filter.kategori_kuliner_id) {
        options.where[Op.and].push({
          "$kuliner.kategori_kuliner_id$": filter.kategori_kuliner_id,
        });
      }

      if (filter.kategori_penginapan_id) {
        options.where[Op.and].push({
          "$penginapan.kategori_penginapan_id$": filter.kategori_penginapan_id,
        });
      }
      try {
        const pariwisata = await Pariwisata.findAll(options)
        if(pariwisata.length!=0){
            response.code = 200;
            response.message = "Sukses";
            response.data = pariwisata;
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
                model:Wisata,
                as: 'wisata'
            },{
                model:Oleh_Oleh,
                as: 'oleh_oleh'
            },{
                model:Penginapan,
                as: 'penginapan'
            },{
                model: Kuliner,
                as:'kuliner'
            }],
            attributes:{
                exclude:['created_at','deleted_at','updated_at']
            }
    }
    let find = req.query
    let modelAttr = Pariwisata.rawAttributes;
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
        const pariwisata = await Pariwisata.findAll(options)
        if(pariwisata.length!=0){
            response.code = 200;
            response.message = "Sukses";
            response.data = pariwisata;
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

router.get('/:id', async(req,res)=>{
    const options = {
        include:[
            {
                model:Wisata,
                as: 'wisata'
            },{
                model:Oleh_Oleh,
                as: 'oleh_oleh'
            },{
                model:Penginapan,
                as: 'penginapan'
            },{
                model: Kuliner,
                as:'kuliner'
            }],
            attributes:{
                exclude:['created_at','deleted_at','updated_at']
            }
    }

    options['where'] = {
        id_kategori_pariwisata : req.params.id
    }

    try {
        const pariwisata = await Pariwisata.findAll(options)
        if(pariwisata.length!=0){
            response.code = 200;
            response.message = "Sukses";
            response.data = pariwisata;
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

router.post('/', validationPariwisata, runValidation, async(req,res)=>{
    const modelAttr = Pariwisata.rawAttributes;
    const inputPariwisata = {};

    Object.values(modelAttr).forEach((val) => {
      if (val.field != "id_kategori_pariwisata") {
        if (req.body[val.field] != null) {
          inputPariwisata[val.fieldName] = req.body[val.field];
        } else {
          inputPariwisata[val.fieldName] = null;
        }
      }
    });

    try {
        const pariwisata = await Pariwisata.create(inputPariwisata)
        response.code = 200;
        response.message = "Sukses";
        response.data = inputPariwisata;
        res.send(response.getResponse());
    } catch (error) {
        response.code = 110;
        response.message = error.message;
        res.send(response.getResponse());
    }
   
})


router.put('/:id', validationPariwisata, runValidation, async(req, res)=>{
    const options = {};
     options.where = {
        id_kategori_pariwisata : req.params.id
    }

    const modelAttr = Pariwisata.rawAttributes;
    const inputPariwisata = {};
    inputPariwisata.id_kategori_pariwisata = req.params.id
    Object.values(modelAttr).forEach((val) => {
      if (val.field != "id_kategori_pariwisata") {
        if (req.body[val.field] != null) {
          inputPariwisata[val.fieldName] = req.body[val.field];
        } else {
          inputPariwisata[val.fieldName] = null;
        }
      }
    });
    try {
        const pariwisata = await Pariwisata.update(inputPariwisata,options);
        response.code = 200;
        response.message = "Sukses";
        response.data = inputPariwisata;
        res.send(response.getResponse());
    } catch (error) {
        response.code = 110;
        response.message = error.message;
        res.send(response.getResponse());
    }
})


router.delete('/:id', async(req,res)=>{
    const options = {}
    options.where = {
        id_kategori_pariwisata : req.params.id
    }

    try {
        const pariwisata = await Pariwisata.destroy(options)
        response.code = 200;
        response.message = "Sukses";
        response.data = pariwisata;
        res.send(response.getResponse());
    } catch (error) {
        response.code = 110;
        response.message = error.message;
        res.send(response.getResponse());
    }
})


// router.get("/find", async (req, res) => {
// //   let modelAttr = Pariwisata.rawAttributes;
// //   let wheres = {};
// //   Object.values(modelAttr).forEach((val) => {
// //     console.log(req.query[val.field]);
// //     if (req.query[val.field] != null) {
// //       wheres[val.field] = req.query[val.field];
// //     }
// //   });
// //   console.log(wheres);
//   Pariwisata.findAll({
//     include:[
//         {
//         model:Wisata,
//         as: 'wisata'
//     },{
//         model:Oleh_Oleh,
//         as: 'oleh_oleh'
//     },{
//         model:Penginapan,
//         as: 'penginapan'
//     },{
//         model: Kuliner,
//         as:'kuliner'
//     }],
//     attributes:{
//         exclude:['created_at','deleted_at','updated_at']
//     },
//     where:req.query
//   })
//   .then((result) => {
//     response.code = 200;
//     response.message = "Sukses";
//     response.data = result;
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