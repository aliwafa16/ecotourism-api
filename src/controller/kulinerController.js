const router = require("express").Router();
const response = require("../core/response");
const {Op} = require('sequelize')
const { runValidation, validationKuliner } = require('../validation/index');
const { token } = require('../core/middleware')


const Kuliner = require('../models/Kuliner_Model');
const Menu = require('../models/MenuKuliner_Model');
const Jadwal = require('../models/Jadwal_Model');
const Kategori_Kuliner = require('../models/KategoriKuliner_Model');
const Fasilitas = require('../models/Fasilitas_Model');
const Gambar = require('../models/Gambar_Model');
const Kategori_Pariwisata = require('../models/Pariwisata_Model');
const Item = require("../models/ItemPariwisata_Model");

Kuliner.hasMany(Jadwal, { as: "jadwal", foreignKey: "id_pariwisata" });
Kuliner.hasMany(Menu, { as: "menu", foreignKey: "kuliner_id" });
Kuliner.belongsTo(Kategori_Kuliner, {
  as: "kategori_kuliner",
  foreignKey: "kategori_kuliner_id",
});
Kuliner.hasMany(Fasilitas, { as: "fasilitas", foreignKey: "id_pariwisata" });
Kuliner.hasMany(Gambar, { as: "gambar", foreignKey: "id_pariwisata" });
Kuliner.belongsTo(Kategori_Pariwisata, {
  as: "kategori_pariwisata",
  foreignKey: "kategori_pariwisata_id",
});
Kuliner.hasMany(Item, { as: "item", foreignKey: "id_pariwisata" });

router.get("/", async (req, res) => {
  const options = {
    include: [
      {
        model: Jadwal,
        as: "jadwal",
        attributes: ["id_jadwal","id_pariwisata", "hari", "jam_buka", "jam_tutup", 'keterangan'],
      },
      {
        model: Fasilitas,
        as: "fasilitas",
        attributes: ["id_fasilitas","nama_fasilitas", "keterangan"],
      },
      {
        model: Gambar,
        as: "gambar",
        attributes: ["id_gambar","gambar", "keterangan", "tanggal"],
      },
      {
        model: Kategori_Kuliner,
        as: "kategori_kuliner",
        attributes: ["jenis_kuliner"],
      },
      {
        model: Kategori_Pariwisata,
        as: "kategori_pariwisata",
        attributes: ["kategori"],
      },
      {
        model: Item,
        as: "item",
        attributes: ["id_item_pariwisata","id_pariwisata", 'qr_code', 'audio','deskripsi'],
      },
    ],
    order: [["created_at", "DESC"]],
  };

    try {
        const kuliner = await Kuliner.findAll(options)
        if (kuliner) {
            response.code = 200;
            response.message = "Sukses";
            response.data = kuliner;
            res.send(response.getResponse());
        } else {
            throw new Error('404|Kuliner tidak ditemukan')
        }
    } catch (error) {
        let errors = error.message || "";
        errors = errors.split('|');
        console.log(errors)
        response.code = errors.length>1?errors[0]:500
        response.message = errors.length>1?errors[1]:errors[0];
        res.send(response.getResponse());
    }
})

router.get('/search', async (req,res)=>{
    let search = req.query;
  const options = {
    include: [
      {
        model: Jadwal,
        as: "jadwal",
        attributes: ["id_jadwal","id_pariwisata", "hari", "jam_buka", "jam_tutup", 'keterangan'],
      },
      {
        model: Fasilitas,
        as: "fasilitas",
        attributes: ["id_fasilitas","nama_fasilitas", "keterangan"],
      },
      {
        model: Gambar,
        as: "gambar",
        attributes: ["id_gambar","gambar", "keterangan", "tanggal"],
      },
      {
        model: Kategori_Kuliner,
        as: "kategori_kuliner",
        attributes: ["jenis_kuliner"],
      },
      {
        model: Kategori_Pariwisata,
        as: "kategori_pariwisata",
        attributes: ["kategori"],
      },
      {
        model: Item,
        as: "item",
        attributes: ["id_item_pariwisata","id_pariwisata", 'qr_code', 'audio','deskripsi'],
      },
    ],
    order: [["created_at", "DESC"]],
  };

  try {
    const kuliner = await Kuliner.findAll(options);
    response.code = 200;
    response.message = "Sukses";
    response.data = kuliner;
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
        model: Jadwal,
        as: "jadwal",
        attributes: ["id_jadwal","id_pariwisata", "hari", "jam_buka", "jam_tutup", 'keterangan'],
      },
      {
        model: Fasilitas,
        as: "fasilitas",
        attributes: ["id_fasilitas","nama_fasilitas", "keterangan"],
      },
      {
        model: Gambar,
        as: "gambar",
        attributes: ["id_gambar","gambar", "keterangan", "tanggal"],
      },
      {
        model: Kategori_Kuliner,
        as: "kategori_kuliner",
        attributes: ["jenis_kuliner"],
      },
      {
        model: Kategori_Pariwisata,
        as: "kategori_pariwisata",
        attributes: ["kategori"],
      },
      {
        model: Item,
        as: "item",
        attributes: ["id_item_pariwisata","id_pariwisata", 'qr_code', 'audio','deskripsi'],
      },
    ],
    order: [["created_at", "DESC"]],
  };

    try {
        const kuliner = await Kuliner.findAll(options)
        if(kuliner.length != 0){
            response.code = 200;
            response.message = "Sukses";
            response.data = kuliner;
            res.send(response.getResponse());
        }else{
          throw new Error('404|Kuliner tidak ditemukan')
        }
    } catch (error) {
        let errors = error.message || "";
        errors = errors.split('|');
        console.log(errors)
        response.code = errors.length>1?errors[0]:500
        response.message = errors.length>1?errors[1]:errors[0];
        res.send(response.getResponse());
    }
})

router.get('/filter', async (req,res)=>{
    const filter = req.query
  const options = {
    include: [
      {
        model: Jadwal,
        as: "jadwal",
        attributes: ["id_jadwal","id_pariwisata", "hari", "jam_buka", "jam_tutup", 'keterangan'],
      },
      {
        model: Fasilitas,
        as: "fasilitas",
        attributes: ["id_fasilitas","nama_fasilitas", "keterangan"],
      },
      {
        model: Gambar,
        as: "gambar",
        attributes: ["id_gambar","gambar", "keterangan", "tanggal"],
      },
      {
        model: Kategori_Kuliner,
        as: "kategori_kuliner",
        attributes: ["jenis_kuliner"],
      },
      {
        model: Kategori_Pariwisata,
        as: "kategori_pariwisata",
        attributes: ["kategori"],
      },
      {
        model: Item,
        as: "item",
        attributes: ["id_item_pariwisata","id_pariwisata", 'qr_code', 'audio','deskripsi'],
      },
    ],
    order: [["created_at", "DESC"]],
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
            throw new Error('404|Kuliner tidak ditemukan')
        }
      } catch (error) {
        let errors = error.message || "";
        errors = errors.split('|');
        console.log(errors)
        response.code = errors.length>1?errors[0]:500
        response.message = errors.length>1?errors[1]:errors[0];
        res.send(response.getResponse());
      }
})

router.get('/find', async(req,res)=>{
  const options = {
    include: [
      {
        model: Jadwal,
        as: "jadwal",
        attributes: ["id_jadwal","id_pariwisata", "hari", "jam_buka", "jam_tutup", 'keterangan'],
      },
      {
        model: Fasilitas,
        as: "fasilitas",
        attributes: ["id_fasilitas","nama_fasilitas", "keterangan"],
      },
      {
        model: Gambar,
        as: "gambar",
        attributes: ["id_gambar","gambar", "keterangan", "tanggal"],
      },
      {
        model: Kategori_Kuliner,
        as: "kategori_kuliner",
        attributes: ["jenis_kuliner"],
      },
      {
        model: Kategori_Pariwisata,
        as: "kategori_pariwisata",
        attributes: ["kategori"],
      },
      {
        model: Item,
        as: "item",
        attributes: ["id_item_pariwisata","id_pariwisata", 'qr_code', 'audio','deskripsi'],
      },
    ],
    order: [["created_at", "DESC"]],
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

  if (filter.kategori_kuliner_id) {
    options.where[Op.and].push({
      kategori_kuliner_id: filter.kategori_kuliner_id,
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
            throw new Error('Kuliner tidak ditemukan')
        }
    } catch (error) {
        let errors = error.message || "";
        errors = errors.split('|');
        console.log(errors)
        response.code = errors.length>1?errors[0]:500
        response.message = errors.length>1?errors[1]:errors[0];
        res.send(response.getResponse());
    }
});

router.get("/:id", async (req, res) => {
  const options = {
    include: [
      {
        model: Jadwal,
        as: "jadwal",
        attributes: [
          "id_jadwal",
          "hari",
          "jam_buka",
          "jam_tutup",
          "keterangan",
        ],
      },
      {
        model: Kategori_Kuliner,
        as: "kategori_kuliner",
        attributes: ["jenis_kuliner"],
      },
      {
        model: Kategori_Pariwisata,
        as: "kategori_pariwisata",
        attributes: ["kategori"],
      },
      {
        model: Menu,
        as: "menu",
        attributes: ["id_menu_kuliner", "nama_menu", "harga", "keterangan"],
      },
      {
        model: Fasilitas,
        as: "fasilitas",
        attributes: ["id_fasilitas", "nama_fasilitas", "keterangan"],
      },
      {
        model: Gambar,
        as: "gambar",
        attributes: ["id_gambar", "gambar", "keterangan", "tanggal"],
      },
      {
        model: Item,
        as: "item",
        attributes: [
          "id_item_pariwisata",
          "id_pariwisata",
          "qr_code",
          "audio",
          "deskripsi",
        ],
      },
    ],
  };

  options["where"] = {
    id_kuliner: req.params.id,
  };

    try {
        const kuliner = await Kuliner.findOne(options)
        if(kuliner){
            response.code = 200;
            response.message = "Sukses";
            response.data = kuliner;
            res.send(response.getResponse());
        }else{
            throw new Error('404|Kuliner tidak ditemukan')
        }
    } catch (error) {
        let errors = error.message || "";
        errors = errors.split('|');
        console.log(errors)
        response.code = errors.length>1?errors[0]:500
        response.message = errors.length>1?errors[1]:errors[0];
        res.send(response.getResponse());
    }
});

router.post("/", token, validationKuliner, runValidation, async (req, res) => {
  try {
    const lastest = await Kuliner.findOne({
      attributes: ["id_kuliner"],
      order: [["created_at", "DESC"]],
    });
    const id_kuliner = parseInt(lastest.id_kuliner.slice(1)) + 1;

    const modelAttr = Kuliner.rawAttributes;
    const inputKuliner = {};

    Object.values(modelAttr).forEach((val) => {
      if (val.field != "id_kuliner") {
        if (req.body[val.field] != "") {
          inputKuliner[val.fieldName] = req.body[val.field];
        } else {
          inputKuliner[val.fieldName] = null;
        }
      }
    });

    inputKuliner["id_kuliner"] = `K` + id_kuliner;

    let data = await Kuliner.findOne({
      where: { nama_kuliner: inputKuliner["nama_kuliner"] },
    });

    if (data) {
      throw new Error("403|Kuliner sudah ada");
    } else {
      const kuliner = await Kuliner.create(inputKuliner);
      response.code = 200;
      response.message = "Kuliner berhasil ditambahkan";
      response.data = inputKuliner;
      res.send(response.getResponse());
    }
  } catch (error) {
    let errors = error.message || "";
    errors = errors.split("|");
    console.log(errors);
    response.code = errors.length > 1 ? errors[0] : 500;
    response.message = errors.length > 1 ? errors[1] : errors[0];
    res.send(response.getResponse());
  }
});

router.put("/", token, validationKuliner, runValidation, async (req, res) => {
  const options = {};
  options.where = {
    id_kuliner: req.body.id_kuliner,
  };

  const modelAttr = Kuliner.rawAttributes;
  const inputKuliner = {};
  inputKuliner.id_kuliner = req.body.id_kuliner;
  Object.values(modelAttr).forEach((val) => {
    if (val.field != "id_kuliner") {
      if (req.body[val.field] != "") {
        inputKuliner[val.fieldName] = req.body[val.field];
      } else {
        inputKuliner[val.fieldName] = null;
      }
    }
  });
  try {
    const data = await Kuliner.findOne(options);
    if (data) {
      let check_data = await Kuliner.count({
        attributes: ["nama_kuliner"],
        where: {
          nama_kuliner: inputKuliner.nama_kuliner,
          id_kuliner: { [Op.not]: inputKuliner.id_kuliner },
        },
      });

      if (check_data) {
        throw new Error("403|Kuliner sudah ada");
      } else {
        const kuliner = await Kuliner.update(inputKuliner, options);
        response.code = 200;
        response.message = "Kuliner berhasil diubah";
        response.data = inputKuliner;
        res.send(response.getResponse());
      }
    } else {
      throw new Error("404|Kuliner tidak ditemukan");
    }
  } catch (error) {
    let errors = error.message || "";
    errors = errors.split("|");
    console.log(errors);
    response.code = errors.length > 1 ? errors[0] : 500;
    response.message = errors.length > 1 ? errors[1] : errors[0];
    res.send(response.getResponse());
  }
});

router.delete("/", token,  async (req, res) => {
  const options = {};
  options.where = {
    id_kuliner: req.body.id_kuliner,
  };

  try {
    let data = await Kuliner.findOne(options);
    if (data) {
      const kuliner = await Kuliner.destroy(options);
      response.code = 200;
      response.message = "Kuliner berhasil dihapus";
      response.data = kuliner;
      res.send(response.getResponse());
    } else {
      throw new Error("404|Kuliner tidak ditemukan");
    }
  } catch (error) {
    let errors = error.message || "";
    errors = errors.split("|");
    console.log(errors);
    response.code = errors.length > 1 ? errors[0] : 500;
    response.message = errors.length > 1 ? errors[1] : errors[0];
    res.send(response.getResponse());
  }
});


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
