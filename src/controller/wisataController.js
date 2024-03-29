const router = require("express").Router();
const response = require("../core/response");
const { Op } = require("sequelize");
const { runValidation, validationWisata } = require("../validation/index");
const { token } = require("../core/middleware");
const Wisata = require("../models/Wisata_Model");

const Jadwal = require("../models/Jadwal_Model");
const Kategori_Wisata = require("../models/KategoriWisata_Model");
const Kategori_Pariwisata = require("../models/Pariwisata_Model");
const Tiket = require("../models/Tiket_Model");
const Fasilitas = require("../models/Fasilitas_Model");
const Gambar = require("../models/Gambar_Model");
const Item = require("../models/ItemPariwisata_Model")

Wisata.hasMany(Jadwal, { as: 'jadwal', foreignKey: "id_pariwisata" });
Wisata.belongsTo(Kategori_Wisata, {
  as: "kategori_wisata",
  foreignKey: "kategori_wisata_id",
});
Wisata.hasMany(Item, { as: 'item', foreignKey: 'id_pariwisata' });
Wisata.hasMany(Tiket, { as: "tiket", foreignKey: 'id_pariwisata' });
Wisata.belongsTo(Kategori_Pariwisata, {
  as: "kategori_pariwisata",
  foreignKey: "kategori_pariwisata_id",
});
Wisata.hasMany(Fasilitas, { as: "fasilitas", foreignKey: "id_pariwisata" });
Wisata.hasMany(Gambar, { as: "gambar", foreignKey: "id_pariwisata" });

router.get("/", async (req, res) => {
  const options = {
    include: [
      {
        model: Jadwal,
        as: "jadwal",
        attributes: [
          "id_jadwal",
          "id_pariwisata",
          "hari",
          "jam_buka",
          "jam_tutup",
          "keterangan",
        ],
      },
      {
        model: Tiket,
        as: "tiket",
        attributes: [
          "id_tiket",
          "id_pariwisata",
          "tiket",
          "harga",
          "keterangan",
        ],
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
        model: Kategori_Wisata,
        as: "kategori_wisata",
        attributes: ["kategori"],
      },
      {
        model: Kategori_Pariwisata,
        as: "kategori_pariwisata",
        attributes: ["kategori"],
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
    order: [["created_at", "DESC"]],
  };

  try {
    const wisata = await Wisata.findAll(options);
    if (wisata) {
      response.code = 200;
      response.message = "Sukses";
      response.data = wisata;
      res.send(response.getResponse());
    } else {
      throw new Error("404|Wisata tidak ditemukan");
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

router.get("/search", async (req, res) => {
  let search = req.query;
  const options = {
    include: [
      {
        model: Jadwal,
        as: "jadwal",
        attributes: [
          "id_jadwal",
          "id_pariwisata",
          "hari",
          "jam_buka",
          "jam_tutup",
          "keterangan",
        ],
      },
      {
        model: Tiket,
        as: "tiket",
        attributes: [
          "id_tiket",
          "id_pariwisata",
          "tiket",
          "harga",
          "keterangan",
        ],
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
        model: Kategori_Wisata,
        as: "kategori_wisata",
        attributes: ["kategori"],
      },
      {
        model: Kategori_Pariwisata,
        as: "kategori_pariwisata",
        attributes: ["kategori"],
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
    [Op.or]: [
      {
        nama_wisata: {
          [Op.like]: `%${search.nama_wisata}%`,
        },
      },
      {
        alamat_wisata: {
          [Op.like]: `%${search.alamat_wisata}%`,
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
        kategori_wisata_id: {
          [Op.like]: `%${search.kategori_wisata_id}%`,
        },
      },
      {
        "$kategori_wisata.kategori$": {
          [Op.like]: `%${search.kategori}%`,
        },
      },
    ],
  };

  try {
    const wisata = await Wisata.findAll(options);
    if (wisata.length != 0) {
      response.code = 200;
      response.message = "Sukses";
      response.data = wisata;
      res.send(response.getResponse());
    } else {
      throw new Error("404|Wisata tidak ditemukan");
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

router.get("/filter", async (req, res) => {
  const filter = req.query;
  const options = {
    include: [
      {
        model: Jadwal,
        as: "jadwal",
        attributes: [
          "id_jadwal",
          "id_pariwisata",
          "hari",
          "jam_buka",
          "jam_tutup",
          "keterangan",
        ],
      },
      {
        model: Tiket,
        as: "tiket",
        attributes: [
          "id_tiket",
          "id_pariwisata",
          "tiket",
          "harga",
          "keterangan",
        ],
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
        model: Kategori_Wisata,
        as: "kategori_wisata",
        attributes: ["kategori"],
      },
      {
        model: Kategori_Pariwisata,
        as: "kategori_pariwisata",
        attributes: ["kategori"],
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
    ...options.where,
    [Op.and]: [],
  };

  if (filter.kategori_pariwisata_id) {
    options.where[Op.and].push({
      kategori_pariwisata_id: filter.kategori_pariwisata_id,
    });
  }

  if (filter.kategori_wisata_id) {
    options.where[Op.and].push({
      kategori_wisata_id: filter.kategori_wisata_id,
    });
  }

  if (filter.status) {
    options.where[Op.and].push({
      status: filter.status,
    });
  }

  try {
    const wisata = await Wisata.findAll(options);
    if (wisata.length != 0) {
      response.code = 200;
      response.message = "Sukses";
      response.data = wisata;
      res.send(response.getResponse());
    } else {
      throw new Error("404|Wisata tidak ditemukan");
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

router.get("/find", async (req, res) => {
  const options = {
    include: [
      {
        model: Jadwal,
        as: "jadwal",
        attributes: [
          "id_jadwal",
          "id_pariwisata",
          "hari",
          "jam_buka",
          "jam_tutup",
          "keterangan",
        ],
      },
      {
        model: Tiket,
        as: "tiket",
        attributes: [
          "id_tiket",
          "id_pariwisata",
          "tiket",
          "harga",
          "keterangan",
        ],
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
        model: Kategori_Wisata,
        as: "kategori_wisata",
        attributes: ["kategori"],
      },
      {
        model: Kategori_Pariwisata,
        as: "kategori_pariwisata",
        attributes: ["kategori"],
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

  const find = req.query;
  let modelAttr = Wisata.rawAttributes;
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
    const wisata = await Wisata.findAll(options);
    if (wisata.length != 0) {
      response.code = 200;
      response.message = "Sukses";
      response.data = wisata;
      res.send(response.getResponse());
    } else {
      throw new Error("404|Wisata tidak ditemukan");
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

router.get("/:id", async (req, res) => {
  const options = {
    include: [
      {
        model: Jadwal,
        as: "jadwal",
        attributes: [
          "id_jadwal",
          "id_pariwisata",
          "hari",
          "jam_buka",
          "jam_tutup",
          "keterangan",
        ],
      },
      {
        model: Tiket,
        as: "tiket",
        attributes: [
          "id_tiket",
          "id_pariwisata",
          "tiket",
          "harga",
          "keterangan",
        ],
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
        model: Kategori_Wisata,
        as: "kategori_wisata",
        attributes: ["kategori"],
      },
      {
        model: Kategori_Pariwisata,
        as: "kategori_pariwisata",
        attributes: ["kategori"],
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
    id_wisata: req.params.id,
  };

  try {
    const wisata = await Wisata.findOne(options);
    if (wisata) {
      response.code = 200;
      response.message = "Sukses";
      response.data = wisata;
      res.send(response.getResponse());
    } else {
      throw new Error("404|Wisata tidak ditemukan");
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

router.post("/", token,validationWisata, runValidation, async (req, res) => {
  const lastest = await Wisata.findOne({
    attributes: ["id_wisata"],
    order: [["created_at", "DESC"]],
  });
  const id_wisata = parseInt(lastest.id_wisata.slice(1)) + 1;

  const modelAttr = Wisata.rawAttributes;
  const inputWisata = {};

  Object.values(modelAttr).forEach((val) => {
    if (val.field != "id_wisata") {
      if (req.body[val.field] != "") {
        inputWisata[val.fieldName] = req.body[val.field];
      } else {
        inputWisata[val.fieldName] = null;
      }
    }
  });
  inputWisata["id_wisata"] = `W` + id_wisata;
  console.log(inputWisata);

  try {
    let data = await Wisata.findOne({
      where: { nama_wisata: inputWisata["nama_wisata"] },
    });
    if (data) {
      throw new Error("403|Wisata sudah ada");
    } else {
      const wisata = await Wisata.create(inputWisata);
      response.code = 200;
      response.message = "Wisata berhasil ditambahkan";
      response.data = inputWisata;
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

router.put("/", token, validationWisata, runValidation, async (req, res) => {
  const options = {};
  options.where = {
    id_wisata: req.body.id_wisata,
  };

  try {
    const data = await Wisata.findOne(options);
    if (data) {
      const modelAttr = Wisata.rawAttributes;
      const inputWisata = {};
      inputWisata.id_wisata = req.body.id_wisata;
      Object.values(modelAttr).forEach((val) => {
        if (val.field != "id_wisata") {
          if (req.body[val.field] != "") {
            inputWisata[val.fieldName] = req.body[val.field];
          } else {
            inputWisata[val.fieldName] = null;
          }
        }
      });

      let check_data = await Wisata.count({
        attributes: ["nama_wisata"],
        where: {
          nama_wisata: inputWisata.nama_wisata,
          id_wisata: { [Op.not]: inputWisata.id_wisata },
        },
      });

      if (check_data) {
        throw new Error("403|Wisata sudah ada");
      } else {
        const wisata = await Wisata.update(inputWisata, options);
        response.code = 200;
        response.message = "Wisata berhasil diubah";
        response.data = inputWisata;
        res.send(response.getResponse());
      }
    } else {
      throw new Error("404|Wisata tidak ditemukan");
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

router.delete("/",token, async (req, res) => {
  const options = {};
  options.where = {
    id_wisata: req.body.id_wisata,
  };

  try {
    const data = await Wisata.findOne(options);
    if (data) {
      const wisata = await Wisata.destroy(options);
      response.code = 200;
      response.message = "Wisata berhasil dihapus";
      response.data = wisata;
      res.send(response.getResponse());
    } else {
      throw new Error("404|Wisata tidak ditemukan");
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
