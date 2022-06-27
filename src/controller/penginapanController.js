const router = require("express").Router();
const response = require("../core/response");
const {Op} = require('sequelize')
const { runValidation, validationPenginapan } = require('../validation/index');

const Penginapan = require('../models/Penginapan_Model');
const Kategori_Penginapan = require('../models/KategoriPenginapan_Model');
const Kategori_Pariwisata = require('../models/Pariwisata_Model');
const Fasilitas = require('../models/Fasilitas_Model');
const Fasilitas_Kamar = require('../models/FasilitasKamar_Model');
const Kamar_Penginapan = require('../models/KamarPenginapan_Model');
const Gambar = require('../models/Gambar_Model');

Penginapan.hasMany(Fasilitas, { as: 'fasilitas', foreignKey: 'id_pariwisata' });
Penginapan.belongsTo(Kategori_Pariwisata, { as: 'kategori_pariwisata', foreignKey: 'kategori_pariwisata_id' });
Penginapan.belongsTo(Kategori_Penginapan, { as: 'kategori_penginapan', foreignKey: 'kategori_penginapan_id' });
Penginapan.hasMany(Kamar_Penginapan, { as: 'tipe_kamar', foreignKey: 'penginapan_id' });
Penginapan.hasMany(Gambar, { as: 'gambar', foreignKey: 'id_pariwisata' });
Kamar_Penginapan.hasMany(Fasilitas_Kamar, {
  as: "fasilitas_kamar",
  foreignKey: "kamar_penginapan_id",
});

router.get("/", async (req, res) => {
  const options = {
    include: [
      {
        model: Fasilitas,
        as: "fasilitas",
        attributes: [
          "id_fasilitas",
          "id_pariwisata",
          "nama_fasilitas",
          "keterangan",
        ],
      },
      {
        model: Kategori_Penginapan,
        as: "kategori_penginapan",
        attributes: [["kategori", "jenis_penginapan"]],
      },
      {
        model: Kategori_Pariwisata,
        as: "kategori_pariwisata",
        attributes: [["kategori", "kategori_pariwisata"]],
      },
      {
        model: Kamar_Penginapan,
        as: "tipe_kamar",
        attributes: [
          "id_kamar_penginapan",
          "tipe_kamar",
          "kapasitas",
          "harga",
          "keterangan",
        ],
        include: [
          {
            model: Fasilitas_Kamar,
            as: "fasilitas_kamar",
            attributes: [
              "id_fasilitas_kamar",
              "penginapan_id",
              "kamar_penginapan_id",
              "nama_fasilitas",
              "keterangan",
            ],
          },
        ],
      },
      {
        model: Gambar,
        as: "gambar",
        attributes: ["gambar", "keterangan", "tanggal"],
      },
    ],
  };

  try {
    const penginapan = await Penginapan.findAll(options);
    response.code = 200;
    response.message = "Sukses";
    response.data = penginapan;
    res.send(response.getResponse());
  } catch (error) {
    response.code = 110;
    response.message = error.message;
    res.send(response.getResponse());
  }
});

router.get("/search", async (req, res) => {
  let search = req.query;
  const options = {
    include: [
      {
        model: Fasilitas,
        as: "fasilitas",
        attributes: [
          "id_fasilitas",
          "id_pariwisata",
          "nama_fasilitas",
          "keterangan",
        ],
      },
      {
        model: Kategori_Penginapan,
        as: "kategori_penginapan",
        attributes: [["kategori", "jenis_penginapan"]],
      },
      {
        model: Kategori_Pariwisata,
        as: "kategori_pariwisata",
        attributes: [["kategori", "kategori_pariwisata"]],
      },
      {
        model: Kamar_Penginapan,
        as: "tipe_kamar",
        attributes: [
          "id_kamar_penginapan",
          "tipe_kamar",
          "kapasitas",
          "harga",
          "keterangan",
        ],
        include: [
          {
            model: Fasilitas_Kamar,
            as: "fasilitas_kamar",
            attributes: [
              "id_fasilitas_kamar",
              "penginapan_id",
              "kamar_penginapan_id",
              "nama_fasilitas",
              "keterangan",
            ],
          },
        ],
      },
      {
        model: Gambar,
        as: "gambar",
        attributes: ["gambar", "keterangan", "tanggal"],
      },
    ],
  };

  options["where"] = {
    [Op.or]: [
      {
        nama_penginapan: {
          [Op.like]: `%${search.nama_penginapan}%`,
        },
      },
      {
        alamat_penginapan: {
          [Op.like]: `%${search.alamat_penginapan}%`,
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
        kategori_pariwisata_id: {
          [Op.like]: `%${search.kategori_pariwisata_id}%`,
        },
      },
      {
        kategori_penginapan_id: {
          [Op.like]: `%${search.kategori_penginapan_id}%`,
        },
      },
      {
        "$kategori_penginapan.kategori$": {
          [Op.like]: `%${search.jenis_penginapan}%`,
        },
      },
      {
        "$kategori_pariwisata.kategori$": {
          [Op.like]: `%${search.kategori_pariwisata}%`,
        },
      },
      {
        "$tipe_kamar.tipe_kamar$": {
          [Op.like]: `%${search.tipe_kamar}%`,
        },
      },
    ],
  };

  try {
    const penginapan = await Penginapan.findAll(options);
    if (penginapan.length != 0) {
      response.code = 200;
      response.message = "Sukses";
      response.data = penginapan;
      res.send(response.getResponse());
    } else {
      response.code = 111;
      response.message = "Data tidak ditemukan";
      res.send(response.getResponse());
    }
  } catch (error) {
    response.code = 110;
    response.message = error.message;
    res.send(response.getResponse());
  }
});

router.get("/filter", async (req, res) => {
  const filter = req.query;
  const options = {
    include: [
      {
        model: Fasilitas,
        as: "fasilitas",
        attributes: [
          "id_fasilitas",
          "id_pariwisata",
          "nama_fasilitas",
          "keterangan",
        ],
      },
      {
        model: Kategori_Penginapan,
        as: "kategori_penginapan",
        attributes: [["kategori", "jenis_penginapan"]],
      },
      {
        model: Kategori_Pariwisata,
        as: "kategori_pariwisata",
        attributes: [["kategori", "kategori_pariwisata"]],
      },
      {
        model: Kamar_Penginapan,
        as: "tipe_kamar",
        attributes: [
          "id_kamar_penginapan",
          "tipe_kamar",
          "kapasitas",
          "harga",
          "keterangan",
        ],
        include: [
          {
            model: Fasilitas_Kamar,
            as: "fasilitas_kamar",
            attributes: [
              "id_fasilitas_kamar",
              "penginapan_id",
              "kamar_penginapan_id",
              "nama_fasilitas",
              "keterangan",
            ],
          },
        ],
      },
      {
        model: Gambar,
        as: "gambar",
        attributes: ["gambar", "keterangan", "tanggal"],
      },
    ],
  };

  options["where"] = {
    ...options.where,
    [Op.and]: [],
  };

  if (filter.kategori_pariwisata_id) {
    options.where[Op.and].push({
      kategori_pariwisata_id: filter.kategori_pariwisata_id,
    });
  }

  if (filter.kategori_penginapan_id) {
    options.where[Op.and].push({
      kategori_penginapan_id: filter.kategori_penginapan_id,
    });
  }

  if (filter.status) {
    options.where[Op.and].push({
      status: filter.status,
    });
  }

  try {
    const penginapan = await Penginapan.findAll(options);
    if (penginapan.length != 0) {
      response.code = 200;
      response.message = "Sukses";
      response.data = penginapan;
      res.send(response.getResponse());
    } else {
      response.code = 111;
      response.message = "Data tidak ditemukan";
      res.send(response.getResponse());
    }
  } catch (error) {
    response.code = 110;
    response.message = error.message;
    res.send(response.getResponse());
  }
});

router.get("/find", async (req, res) => {
  const options = {
    include: [
      {
        model: Fasilitas,
        as: "fasilitas",
        attributes: [
          "id_fasilitas",
          "id_pariwisata",
          "nama_fasilitas",
          "keterangan",
        ],
      },
      {
        model: Kategori_Penginapan,
        as: "kategori_penginapan",
        attributes: [["kategori", "jenis_penginapan"]],
      },
      {
        model: Kategori_Pariwisata,
        as: "kategori_pariwisata",
        attributes: [["kategori", "kategori_pariwisata"]],
      },
      {
        model: Kamar_Penginapan,
        as: "tipe_kamar",
        attributes: [
          "id_kamar_penginapan",
          "tipe_kamar",
          "kapasitas",
          "harga",
          "keterangan",
        ],
        include: [
          {
            model: Fasilitas_Kamar,
            as: "fasilitas_kamar",
            attributes: [
              "id_fasilitas_kamar",
              "penginapan_id",
              "kamar_penginapan_id",
              "nama_fasilitas",
              "keterangan",
            ],
          },
        ],
      },
      {
        model: Gambar,
        as: "gambar",
        attributes: ["gambar", "keterangan", "tanggal"],
      },
    ],
  };

  const find = req.query;
  let modelAttr = Penginapan.rawAttributes;
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
  options["where"] = findwhere;

  try {
    const penginapan = await Penginapan.findAll(options);
    if (penginapan.length != 0) {
      response.code = 200;
      response.message = "Sukses";
      response.data = penginapan;
      res.send(response.getResponse());
    } else {
      response.code = 111;
      response.message = "Data tidak ditemukan";
      res.send(response.getResponse());
    }
  } catch (error) {
    response.code = 110;
    response.message = error.message;
    res.send(response.getResponse());
  }
});

router.get('/:id', async (req,res)=>{
  const options = {
    include: [
      {
        model: Fasilitas,
        as: "fasilitas",
        attributes: [
          "id_fasilitas",
          "id_pariwisata",
          "nama_fasilitas",
          "keterangan",
        ],
      },
      {
        model: Kategori_Penginapan,
        as: "kategori_penginapan",
        attributes: [["kategori", "jenis_penginapan"]],
      },
      {
        model: Kategori_Pariwisata,
        as: "kategori_pariwisata",
        attributes: [["kategori", "kategori_pariwisata"]],
      },
      {
        model: Kamar_Penginapan,
        as: "tipe_kamar",
        attributes: [
          "id_kamar_penginapan",
          "tipe_kamar",
          "kapasitas",
          "harga",
          "keterangan",
        ],
        include: [
          {
            model: Fasilitas_Kamar,
            as: "fasilitas_kamar",
            attributes: [
              "id_fasilitas_kamar",
              "penginapan_id",
              "kamar_penginapan_id",
              "nama_fasilitas",
              "keterangan",
            ],
          },
        ],
      },
      {
        model: Gambar,
        as: "gambar",
        attributes: ["gambar", "keterangan", "tanggal"],
      },
    ],
  };

    options['where'] = {
        id_penginapan : req.params.id
    }

    try {
        const penginapan = await Penginapan.findOne(options)
        if(penginapan){
            response.code = 200;
            response.message = "Sukses";
            response.data = penginapan;
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

router.post('/',validationPenginapan,runValidation, async (req, res)=>{

    const lastest = await Penginapan.findOne({attributes:['id_penginapan'],order:[['created_at','DESC']]})
    const id_penginapan = parseInt(lastest.id_penginapan.slice(1))+1

    const modelAttr = Penginapan.rawAttributes
    const inputPenginapan = {};

    Object.values(modelAttr).forEach((val) => {
        if (val.field != "id_penginapan") {
          if (req.body[val.field] != '') {
            inputPenginapan[val.fieldName] = req.body[val.field];
          } else {
            inputPenginapan[val.fieldName] = null;
          }
        }
    });

    inputPenginapan['id_penginapan'] = `P` + id_penginapan
    console.log(id_penginapan)
    
    try {
        const penginapan = await Penginapan.create(inputPenginapan)
        response.code = 200;
        response.message = "Sukses";
        response.data = inputPenginapan;
        res.send(response.getResponse());
    } catch (error) {
        response.code = 110;
        response.message = error.message;
        res.send(response.getResponse());
    }

})

router.put('/',validationPenginapan,runValidation, async (req,res)=>{
    const options = {}
    options.where = {
        id_penginapan : req.body.id_penginapan
    }

    const modelAttr = Penginapan.rawAttributes
    const inputPenginapan = {};
    inputPenginapan.id_kuliner = req.body.id_penginapan
    Object.values(modelAttr).forEach((val) => {
        if (val.field != "id_penginapan") {
          if (req.body[val.field] != '') {
            inputPenginapan[val.fieldName] = req.body[val.field];
          } else {
            inputPenginapan[val.fieldName] = null;
          }
        }
    });
    console.log(inputPenginapan)
    try {
        const penginapan = await Penginapan.update(inputPenginapan, options);
        response.code = 200;
        response.message = "Sukses";
        response.data = inputPenginapan;
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
        id_penginapan : req.body.id_penginapan
    }


    try {
        const penginapan = await Penginapan.destroy(options)
        response.code = 200;
        response.message = "Sukses";
        response.data = penginapan;
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