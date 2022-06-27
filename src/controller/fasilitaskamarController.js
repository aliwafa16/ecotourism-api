const router = require("express").Router();
const response = require("../core/response");
const Fasilitas_Kamar = require("../models/FasilitasKamar_Model");

router.get("/", async (req, res) => {
  try {
    const fasilitas_kamar = await Fasilitas_Kamar.findAll();
    response.code = 200;
    response.message = "Sukses";
    response.data = fasilitas_kamar;
    res.send(response.getResponse());
  } catch (error) {
    response.code = 110;
    response.message = error.message;
    res.send(response.getResponse());
  }
});

router.get("/find", async (req, res) => {
  const options = {};
  const find = req.query;
  let modelAttr = Fasilitas_Kamar.rawAttributes;
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
    const fasilitas_kamar = await Fasilitas_Kamar.findAll();
    if (fasilitas_kamar.length != 0) {
      response.code = 200;
      response.message = "Sukses";
      response.data = fasilitas_kamar;
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
  try {
    const fasilitas_kamar = await Fasilitas_Kamar.findOne({
      where: {
        id_fasilitas_kamar: req.params.id,
      },
    });

    response.code = 200;
    response.message = "Sukses";
    response.data = fasilitas_kamar;
    res.send(response.getResponse());
  } catch (error) {
    response.code = 110;
    response.message = error.message;
    res.send(response.getResponse());
  }
});

router.post("/", async (req, res) => {
  const modelAttr = Fasilitas_Kamar.rawAttributes;
  const inputFasilitasKamar = {};

  Object.values(modelAttr).forEach((val) => {
    if (val.field != "id_fasilitas_kamar") {
      if (req.body[val.field] != "") {
        inputFasilitasKamar[val.fieldName] = req.body[val.field];
      } else {
        inputFasilitasKamar[val.fieldName] = null;
      }
    }
  });

  try {
    const fasilitas_kamar = await Fasilitas_Kamar.create(inputFasilitasKamar);
    response.code = 200;
    response.message = "Sukses";
    response.data = inputFasilitasKamar;
    res.send(response.getResponse());
  } catch (error) {
    response.code = 110;
    response.message = error.message;
    res.send(response.getResponse());
  }
});

module.exports = router;
