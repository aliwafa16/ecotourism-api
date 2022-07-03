const router = require("express").Router();
const response = require("../core/response");
const { Op } = require("sequelize");
const {
  validationKategoriPenginapan,
  runValidation,
} = require("../validation/index");
const Kategori_Penginapan = require("../models/KategoriPenginapan_Model");

router.get("/", async (req, res) => {
  const options = {
    attributes: ["id_kategori_penginapan", "kategori"],
  };
  try {
    const kategori_penginapan = await Kategori_Penginapan.findAll(options);
    if (kategori_penginapan) {
      response.code = 200;
      response.message = "Sukses";
      response.data = kategori_penginapan;
      res.send(response.getResponse());
    } else {
      throw new Error("Data kategori penginapan tidak ditemukan");
    }
  } catch (error) {
    response.code = 110;
    response.message = error.message;
    res.send(response.getResponse());
  }
});

router.get("/:id", async (req, res) => {
  const options = {
    attributes: ["id_kategori_penginapan", "kategori"],
    where: {
      id_kategori_penginapan: req.params.id,
    },
  };
  try {
    const kategori_penginapan = await Kategori_Penginapan.findOne(options);
    if (kategori_penginapan) {
      response.code = 200;
      response.message = "Sukses";
      response.data = kategori_penginapan;
      res.send(response.getResponse());
    } else {
      throw new Error("Data kategori penginapan tidak ditemukan");
    }
  } catch (error) {
    response.code = 110;
    response.message = error.message;
    res.send(response.getResponse());
  }
});

router.post(
  "/",
  validationKategoriPenginapan,
  runValidation,
  async (req, res) => {
    const modelAttr = Kategori_Penginapan.rawAttributes;
    const inputKategori = {};

    Object.values(modelAttr).forEach((val) => {
      if (val.field != "id_kategori_penginapan") {
        if (req.body[val.field] != "") {
          inputKategori[val.fieldName] = req.body[val.field];
        } else {
          inputKategori[val.fieldName] = null;
        }
      }
    });

    let data = await Kategori_Penginapan.findOne({
      where: { kategori: inputKategori.kategori },
    });

    try {
      if (data) {
        throw new Error("Kategori penginapan sudah ada");
      } else {
        const kategori = await Kategori_Penginapan.create(inputKategori);
        response.code = 200;
        response.message = "Tambah data kategori penginapan berhasil";
        response.data = kategori;
        res.send(response.getResponse());
      }
    } catch (error) {
      response.code = 110;
      response.message = error.message;
      res.send(response.getResponse());
    }
  }
);

router.put(
  "/",
  validationKategoriPenginapan,
  runValidation,
  async (req, res) => {
    const options = {};
    options.where = {
      id_kategori_penginapan: req.body.id_kategori_penginapan,
    };

    try {
      let data = await Kategori_Penginapan.findOne(options);
      if (!data) {
        throw new Error("Data katagori penginapan tidak ditemukan");
      } else {
        const modelAttr = Kategori_Penginapan.rawAttributes;
        const inputKategori = {};
        inputKategori.id_kategori_penginapan = req.body.id_kategori_penginapan;
        Object.values(modelAttr).forEach((val) => {
          if (val.field != "id_kategori_penginapan") {
            if (req.body[val.field] != "") {
              inputKategori[val.fieldName] = req.body[val.field];
            } else {
              inputKategori[val.fieldName] = null;
            }
          }
        });

        let check_data = await Kategori_Penginapan.count({
          attributes: ["kategori"],
          where: {
            kategori: inputKategori.kategori,
            id_kategori_penginapan: {
              [Op.not]: inputKategori.id_kategori_penginapan,
            },
          },
        });

        if (check_data) {
          throw new Error("Data kategori sudah ada");
        } else {
          const kategori = await Kategori_Penginapan.update(
            inputKategori,
            options
          );
          response.code = 200;
          response.message = "Ubah data kategori penginapan berhasil";
          response.data = inputKategori;
          res.send(response.getResponse());
        }

        // let check_data = await Kategori_Wisata.findAll({
        //   attributes: ["kategori"],
        //   where: { [Op.not]: [{ kategori: inputKategori.kategori }] },
        // });

        // check_data.forEach((kategori) => {
        //   if (kategori.dataValues.kategori == inputKategori.kategori) {
        //     throw new Error("Data kategori sudah ada");
        //   } else {
        //     inputKategori.kategori = inputKategori.kategori;
        //   }
        // });
      }
    } catch (error) {
      response.code = 110;
      response.message = error.message;
      res.send(response.getResponse());
    }
  }
);

router.delete("/", async (req, res) => {
  const options = {};
  options.where = {
    id_kategori_penginapan: req.body.id_kategori_penginapan,
  };

  try {
    let data = await Kategori_Penginapan.findOne(options);
    if (data) {
      const kategori = await Kategori_Penginapan.destroy(options);
      response.code = 200;
      response.message = "Data kategori penginapan berhasil dihapus";
      response.data = kategori;
      res.send(response.getResponse());
    } else {
      throw new Error("Data kategori penginapan tidak ditemukan");
    }
  } catch (error) {
    response.code = 110;
    response.message = error.message;
    res.send(response.getResponse());
  }
});

module.exports = router;
