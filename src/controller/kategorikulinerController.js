const router = require("express").Router();
const response = require("../core/response");
const { Op } = require("sequelize");
const {
  validationKategoriKuliner,
  runValidation,
} = require("../validation/index");
const Kategori_Kuliner = require("../models/KategoriKuliner_Model");

router.get("/", async (req, res) => {
  const options = {
    attributes: ["id_kategori_kuliner", "jenis_kuliner"],
  };
  try {
    const kategori_kuliner = await Kategori_Kuliner.findAll(options);
    if (kategori_kuliner) {
      response.code = 200;
      response.message = "Sukses";
      response.data = kategori_kuliner;
      res.send(response.getResponse());
    } else {
      throw new Error("Data kategori kuliner tidak ditemukan");
    }
  } catch (error) {
    response.code = 110;
    response.message = error.message;
    res.send(response.getResponse());
  }
});

router.get("/:id", async (req, res) => {
  const options = {
    attributes: ["id_kategori_kuliner", "jenis_kuliner"],
    where: {
      id_kategori_kuliner: req.params.id,
    },
  };
  try {
    const kategori_kuliner = await Kategori_Kuliner.findOne(options);
    if (kategori_kuliner) {
      response.code = 200;
      response.message = "Sukses";
      response.data = kategori_kuliner;
      res.send(response.getResponse());
    } else {
      throw new Error("Data kategori kuliner tidak ditemukan");
    }
  } catch (error) {
    response.code = 110;
    response.message = error.message;
    res.send(response.getResponse());
  }
});

router.post("/", validationKategoriKuliner, runValidation, async (req, res) => {
  const modelAttr = Kategori_Kuliner.rawAttributes;
  const inputKategori = {};

  Object.values(modelAttr).forEach((val) => {
    if (val.field != "id_kategori_kuliner") {
      if (req.body[val.field] != "") {
        inputKategori[val.fieldName] = req.body[val.field];
      } else {
        inputKategori[val.fieldName] = null;
      }
    }
  });

  let data = await Kategori_Kuliner.findOne({
    where: { jenis_kuliner: inputKategori.jenis_kuliner },
  });

  try {
    if (data) {
      throw new Error("Kategori kuliner sudah ada");
    } else {
      const kategori = await Kategori_Kuliner.create(inputKategori);
      response.code = 200;
      response.message = "Tambah data kategori kuliner berhasil";
      response.data = kategori;
      res.send(response.getResponse());
    }
  } catch (error) {
    response.code = 110;
    response.message = error.message;
    res.send(response.getResponse());
  }
});

router.put("/", validationKategoriKuliner, runValidation, async (req, res) => {
  const options = {};
  options.where = {
    id_kategori_kuliner: req.body.id_kategori_kuliner,
  };

  try {
    let data = await Kategori_Kuliner.findOne(options);
    if (!data) {
      throw new Error("Data katagori kuliner tidak ditemukan");
    } else {
      const modelAttr = Kategori_Kuliner.rawAttributes;
      const inputKategori = {};
      inputKategori.id_kategori_kuliner = req.body.id_kategori_kuliner;
      Object.values(modelAttr).forEach((val) => {
        if (val.field != "id_kategori_kuliner") {
          if (req.body[val.field] != "") {
            inputKategori[val.fieldName] = req.body[val.field];
          } else {
            inputKategori[val.fieldName] = null;
          }
        }
      });
      let check_data = await Kategori_Kuliner.count({
        attributes: ["jenis_kuliner"],
        where: {
          jenis_kuliner: inputKategori.jenis_kuliner,
          id_kategori_kuliner: { [Op.not]: inputKategori.id_kategori_kuliner },
        },
      });

      if (check_data) {
        throw new Error("Data kategori sudah ada");
      } else {
        const kategori = await Kategori_Kuliner.update(inputKategori, options);
        response.code = 200;
        response.message = "Ubah data kategori kuliner berhasil";
        response.data = inputKategori;
        res.send(response.getResponse());
      }
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
    id_kategori_kuliner: req.body.id_kategori_kuliner,
  };

  try {
    let data = await Kategori_Kuliner.findOne(options);
    if (data) {
      const kategori = await Kategori_Kuliner.destroy(options);
      response.code = 200;
      response.message = "Data kategori kuliner berhasil dihapus";
      response.data = kategori;
      res.send(response.getResponse());
    } else {
      throw new Error("Data kategori kuliner tidak ditemukan");
    }
  } catch (error) {
    response.code = 110;
    response.message = error.message;
    res.send(response.getResponse());
  }
});

module.exports = router;
