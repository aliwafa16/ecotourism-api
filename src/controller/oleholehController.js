const router = require("express").Router();
const response = require("../core/response");
const { Op } = require("sequelize");
const { runValidation, validationOlehOleh } = require('../validation/index')


const Oleh_Oleh = require('../models/OlehOleh_Model');
const Jadwal = require("../models/Jadwal_Model");
const Kategori_Pariwisata = require("../models/Pariwisata_Model");
const Fasilitas = require("../models/Fasilitas_Model");
const Gambar = require("../models/Gambar_Model");
const Item = require("../models/ItemPariwisata_Model");
const Item_Oleh = require("../models/ItemOlehOleh_Model");

Oleh_Oleh.hasMany(Jadwal, { as: "jadwal", foreignKey: "id_pariwisata" });

Oleh_Oleh.hasMany(Item, { as: 'item', foreignKey: 'id_pariwisata' });
Oleh_Oleh.belongsTo(Kategori_Pariwisata, {
  as: "kategori_pariwisata",
  foreignKey: "kategori_pariwisata_id",
});
Oleh_Oleh.hasMany(Fasilitas, { as: "fasilitas", foreignKey: "id_pariwisata" });
Oleh_Oleh.hasMany(Gambar, { as: "gambar", foreignKey: "id_pariwisata" });
Oleh_Oleh.hasMany(Item_Oleh, { as: 'item_oleh_oleh', foreignKey: "oleh_oleh_id" });

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
        model: Fasilitas,
        as: "fasilitas",
        attributes: ["id_fasilitas", "nama_fasilitas", "keterangan"],
      },
      {
        model: Gambar,
        as: "gambar",
        attributes: [
          "id_gambar",
          "id_pariwisata",
          "gambar",
          "keterangan",
          "tanggal",
        ],
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
      {
        model: Item_Oleh,
        as: "item_oleh_oleh",
        attributes: [
          "id_item_oleh_oleh",
          "oleh_oleh_id",
          "nama_item",
          "harga",
          "keterangan",
        ],
      },
    ],
    order: [["created_at", "DESC"]],
  };

  try {
    const oleh_oleh = await Oleh_Oleh.findAll(options);
    response.code = 200;
    response.message = "Sukses";
    response.data = oleh_oleh;
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
        model: Fasilitas,
        as: "fasilitas",
        attributes: ["id_fasilitas", "nama_fasilitas", "keterangan"],
      },
      {
        model: Gambar,
        as: "gambar",
        attributes: [
          "id_gambar",
          "id_pariwisata",
          "gambar",
          "keterangan",
          "tanggal",
        ],
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
      {
        model: Item_Oleh,
        as: "item_oleh_oleh",
        attributes: [
          "id_item_oleh_oleh",
          "oleh_oleh_id",
          "nama_item",
          "harga",
          "keterangan",
        ],
      },
    ],
    order: [["created_at", "DESC"]],
  };

  options["where"] = {
    [Op.or]: [
      {
        nama_oleh_oleh: {
          [Op.like]: `%${search.nama_oleh_oleh}%`,
        },
      },
      {
        alamat_oleh_oleh: {
          [Op.like]: `%${search.alamat_oleh_oleh}%`,
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
        "$kategori_pariwisata.kategori$": {
          [Op.like]: `%${search.kategori}%`,
        },
      },
    ],
  };

  try {
    const oleh_oleh = await Oleh_Oleh.findAll(options);
    if (oleh_oleh.length != 0) {
      response.code = 200;
      response.message = "Sukses";
      response.data = oleh_oleh;
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
        model: Fasilitas,
        as: "fasilitas",
        attributes: ["id_fasilitas", "nama_fasilitas", "keterangan"],
      },
      {
        model: Gambar,
        as: "gambar",
        attributes: [
          "id_gambar",
          "id_pariwisata",
          "gambar",
          "keterangan",
          "tanggal",
        ],
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
      {
        model: Item_Oleh,
        as: "item_oleh_oleh",
        attributes: [
          "id_item_oleh_oleh",
          "oleh_oleh_id",
          "nama_item",
          "harga",
          "keterangan",
        ],
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

  if (filter.status) {
    options.where[Op.and].push({
      status: filter.status,
    });
  }

  try {
    const oleh_oleh = await Oleh_Oleh.findAll(options);
    if (oleh_oleh.length != 0) {
      response.code = 200;
      response.message = "Sukses";
      response.data = oleh_oleh;
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
        model: Fasilitas,
        as: "fasilitas",
        attributes: ["id_fasilitas", "nama_fasilitas", "keterangan"],
      },
      {
        model: Gambar,
        as: "gambar",
        attributes: [
          "id_gambar",
          "id_pariwisata",
          "gambar",
          "keterangan",
          "tanggal",
        ],
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
      {
        model: Item_Oleh,
        as: "item_oleh_oleh",
        attributes: [
          "id_item_oleh_oleh",
          "oleh_oleh_id",
          "nama_item",
          "harga",
          "keterangan",
        ],
      },
    ],
    order: [["created_at", "DESC"]],
  };

  const find = req.query;
  let modelAttr = Oleh_Oleh.rawAttributes;
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
    const oleh_oleh = await Oleh_Oleh.findAll(options);
    if (oleh_oleh.length != 0) {
      response.code = 200;
      response.message = "Sukses";
      response.data = oleh_oleh;
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
        model: Fasilitas,
        as: "fasilitas",
        attributes: ["id_fasilitas", "nama_fasilitas", "keterangan"],
      },
      {
        model: Gambar,
        as: "gambar",
        attributes: [
          "id_gambar",
          "id_pariwisata",
          "gambar",
          "keterangan",
          "tanggal",
        ],
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
      {
        model: Item_Oleh,
        as: "item_oleh_oleh",
        attributes: [
          "id_item_oleh_oleh",
          "oleh_oleh_id",
          "nama_item",
          "harga",
          "keterangan",
        ],
      },
    ],
    order: [["created_at", "DESC"]],
  };
  options["where"] = {
    id_oleh_oleh: req.params.id,
  };

  try {
    const oleh_oleh = await Oleh_Oleh.findOne(options);
    if (oleh_oleh) {
      response.code = 200;
      response.message = "Sukses";
      response.data = oleh_oleh;
      res.send(response.getResponse());
    } else {
      response.code = 110;
      response.message = "Data tidak ditemukan";
      res.send(response.getResponse());
    }
  } catch (error) {
    response.code = 110;
    response.message = error.message;
    res.send(response.getResponse());
  }
});

router.post("/", validationOlehOleh, runValidation, async (req, res) => {
  const lastest = await Oleh_Oleh.findOne({
    attributes: ["id_oleh_oleh"],
    order: [["created_at", "DESC"]],
  });
  const id_oleh_oleh = parseInt(lastest.id_oleh_oleh.slice(1)) + 1;

  const modelAttr = Oleh_Oleh.rawAttributes;
  const inputOlehOleh = {};

  Object.values(modelAttr).forEach((val) => {
    if (val.field != "id_oleh_oleh") {
      if (req.body[val.field] != "") {
        inputOlehOleh[val.fieldName] = req.body[val.field];
      } else {
        inputOlehOleh[val.fieldName] = null;
      }
    }
  });
  inputOlehOleh["id_oleh_oleh"] = `O` + id_oleh_oleh;
  console.log(inputOlehOleh);

  try {
    const oleh_oleh = await Oleh_Oleh.create(inputOlehOleh);
    response.code = 200;
    response.message = "Tambah Data Wisata Oleh-Oleh Berhasil";
    response.data = inputOlehOleh;
    res.send(response.getResponse());
  } catch (error) {
    response.code = 110;
    response.message = error.message;
    res.send(response.getResponse());
  }
});

router.put("/", validationOlehOleh, runValidation, async (req, res) => {
  const options = {};
  options.where = {
    id_oleh_oleh: req.body.id_oleh_oleh,
  };

  try {
    const data = await Oleh_Oleh.findOne(options);
    if (data) {
      const modelAttr = Oleh_Oleh.rawAttributes;
      const inputOlehOleh = {};
      inputOlehOleh.id_oleh_oleh = req.body.id_oleh_oleh;
      Object.values(modelAttr).forEach((val) => {
        if (val.field != "id_oleh_oleh") {
          if (req.body[val.field] != "") {
            inputOlehOleh[val.fieldName] = req.body[val.field];
          } else {
            inputOlehOleh[val.fieldName] = null;
          }
        }
      });
      try {
        const oleh_oleh = await Oleh_Oleh.update(inputOlehOleh, options);
        response.code = 200;
        response.message = "Ubah Data Wisata Oleh-Oleh Berhasil";
        response.data = inputOlehOleh;
        res.send(response.getResponse());
      } catch (error) {
        response.code = 110;
        response.message = error.message;
        res.send(response.getResponse());
      }
    } else {
      response.code = 110;
      response.message = "Data wisata oleh-oleh tidak ditemukan";
      res.send(response.getResponse());
    }

  } catch (error) {
    response.code = 110;
    response.message = error.message;
    res.send(response.getResponse());
  }
});

router.delete("/", async (req, res) => {
  const options = {};
  options.where = {
    id_oleh_oleh: req.body.id_oleh_oleh,
  };

  try {
    const oleh_oleh = await Oleh_Oleh.destroy(options);
    response.code = 200;
    response.message = "Data wisata oleh-oleh berhasil dihapus";
    response.data = oleh_oleh;
    res.send(response.getResponse());
  } catch (error) {
    response.code = 110;
    response.message = error.message;
    res.send(response.getResponse());
  }
});


module.exports = router