const router = require("express").Router();
const response = require("../core/response");
const {
  validationKategoriWisata,
  runValidation,
} = require("../validation/index");
const Kategori_Wisata = require("../models/KategoriWisata_Model");
const { Op } = require("sequelize");

router.get("/", async (req, res) => {
  const options = {
    attributes: ["id_kategori_wisata", "kategori"],
  };
  try {
    const kategori_wisata = await Kategori_Wisata.findAll(options);
    if (kategori_wisata) {
      response.code = 200;
      response.message = "Sukses";
      response.data = kategori_wisata;
      res.send(response.getResponse());
    } else {
      throw new Error("101|Data kategori wisata tidak ditemukan");
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
    attributes: ["id_kategori_wisata", "kategori"],
    where: {
      id_kategori_wisata: req.params.id,
    },
  };
  try {
    const kategori_wisata = await Kategori_Wisata.findOne(options);
    if (kategori_wisata) {
      response.code = 200;
      response.message = "Sukses";
      response.data = kategori_wisata;
      res.send(response.getResponse());
    } else {
      throw new Error("101|Data kategori wisata tidak ditemukan");
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

router.post("/", validationKategoriWisata, runValidation, async (req, res) => {
  const modelAttr = Kategori_Wisata.rawAttributes;
  const inputKategori = {};

  Object.values(modelAttr).forEach((val) => {
    if (val.field != "id_kategori_wisata") {
      if (req.body[val.field] != "") {
        inputKategori[val.fieldName] = req.body[val.field];
      } else {
        inputKategori[val.fieldName] = null;
      }
    }
  });

  let data = await Kategori_Wisata.findOne({
    where: { kategori: inputKategori.kategori },
  });

  try {
    if (data) {
      throw new Error("Kategori wisata sudah ada");
    } else {
      const kategori = await Kategori_Wisata.create(inputKategori);
      response.code = 200;
      response.message = "Tambah data kategori wisata berhasil";
      response.data = kategori;
      res.send(response.getResponse());
    }
  } catch (error) {
    response.code = 110;
    response.message = error.message;
    res.send(response.getResponse());
  }
});

router.put("/", validationKategoriWisata, runValidation, async (req, res) => {
  const options = {};
  options.where = {
    id_kategori_wisata: req.body.id_kategori_wisata,
  };

  try {
    let data = await Kategori_Wisata.findOne(options);
    if (!data) {
      throw new Error("Data katagori wisata tidak ditemukan");
    } else {
      const modelAttr = Kategori_Wisata.rawAttributes;
      const inputKategori = {};
      inputKategori.id_kategori_wisata = req.body.id_kategori_wisata;
      Object.values(modelAttr).forEach((val) => {
        if (val.field != "id_kategori_wisata") {
          if (req.body[val.field] != "") {
            inputKategori[val.fieldName] = req.body[val.field];
          } else {
            inputKategori[val.fieldName] = null;
          }
        }
      });

      let check_data = await Kategori_Wisata.count({
        attributes: ["kategori"],
        where: {
          kategori: inputKategori.kategori,
          id_kategori_wisata: { [Op.not]: inputKategori.id_kategori_wisata },
        },
      });

      console.log(check_data);

      if (check_data) {
        throw new Error("Data kategori sudah ada");
      } else {
        const kategori = await Kategori_Wisata.update(inputKategori, options);
        response.code = 200;
        response.message = "Ubah data kategori wisata berhasil";
        response.data = inputKategori;
        res.send(response.getResponse());
      }

      // check_data.forEach(async (Element) => {
      //   if (Element.dataValues.kategori == inputKategori.kategori) {
      //     throw new Error("kategori wisata sudah ada");
      //   } else {
      //     const kategori = await Kategori_Wisata.update(inputKategori, options);
      //     response.code = 200;
      //     response.message = "Ubah data kategori wisata berhasil";
      //     response.data = inputKategori;
      //     res.send(response.getResponse());
      //   }
      // });

      // check_data.forEach((kategori) => {
      //   console.log(kategori.dataValues.kategori);
      // if (kategori.dataValues.kategori == inputKategori.kategori) {
      //   throw new Error("Data kategori sudah ada");
      // } else {
      //   inputKategori.kategori = inputKategori.kategori;
      // }
      // });
      //
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
    id_kategori_wisata: req.body.id_kategori_wisata,
  };

  try {
    let data = await Kategori_Wisata.findOne(options);
    if (data) {
      const kategori = await Kategori_Wisata.destroy(options);
      response.code = 200;
      response.message = "Data kategori wisata berhasil dihapus";
      response.data = kategori;
      res.send(response.getResponse());
    } else {
      throw new Error("Data kategori wisata tidak ditemukan");
    }
  } catch (error) {
    response.code = 110;
    response.message = error.message;
    res.send(response.getResponse());
  }
});





module.exports = router;
