const router = require("express").Router();
const response = require("../core/response");
const Kamar_Penginapan = require("../models/KamarPenginapan_Model");

router.get("/", async (req, res) => {

  try {
    const kamar_penginapan = await Kamar_Penginapan.findAll();
    if (kamar_penginapan) {
      response.code = 200;
      response.message = "Sukses";
      response.data = kamar_penginapan;
      res.send(response.getResponse());
    } else {
      throw new Error('404|Kamar penginapan tidak ditemukan')
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

router.get("/find", async (req, res) => {
  const options = {};
  const find = req.query;
  let modelAttr = Kamar_Penginapan.rawAttributes;
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
    const kamar_penginapan = await Kamar_Penginapan.findAll(options);
    if (kamar_penginapan.length != 0) {
      response.code = 200;
      response.message = "Sukses";
      response.data = kamar_penginapan;
      res.send(response.getResponse());
    } else {
      throw new Error('404|Kamar penginapan tidak ditemukan')
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
  try {
    const kamar_penginapan = await Kamar_Penginapan.findOne({
      where: {
        id_kamar_penginapan: req.params.id,
      },
    });

    response.code = 200;
    response.message = "Sukses";
    response.data = kamar_penginapan;
    res.send(response.getResponse());
  } catch (error) {
    response.code = 110;
    response.message = error.message;
    res.send(response.getResponse());
  }
});

router.post("/", async (req, res) => {
  const modelAttr = Kamar_Penginapan.rawAttributes;
  const inputKamar = {};

  Object.values(modelAttr).forEach((val) => {
    if (val.field != "id_kamar_penginapan") {
      if (req.body[val.field] != "") {
        inputKamar[val.fieldName] = req.body[val.field];
      } else {
        inputKamar[val.fieldName] = null;
      }
    }
  });

  try {
    const kamar_penginapan = await Kamar_Penginapan.create(inputKamar);
    response.code = 200;
    response.message = "Kamar penginapan berhasil ditambahkan";
    response.data = inputKamar;
    res.send(response.getResponse());
  } catch (error) {
    let errors = error.message || "";
    errors = errors.split('|');
    console.log(errors)
    response.code = errors.length>1?errors[0]:500
    response.message = errors.length>1?errors[1]:errors[0];
    res.send(response.getResponse());
  }
});

router.put("/", async (req, res) => {
  const options = {};
  options.where = {
    id_kamar_penginapan: req.body.id_kamar_penginapan,
  };

  const modelAttr = Kamar_Penginapan.rawAttributes;
  const inputKamar = {};
  inputKamar.id_kamar_penginapan = req.body.id_kamar_penginapan;
  Object.values(modelAttr).forEach((val) => {
    if (val.field != "id_kamar_penginapan") {
      if (req.body[val.field] != "") {
        inputKamar[val.fieldName] = req.body[val.field];
      } else {
        inputKamar[val.fieldName] = null;
      }
    }
  });
  console.log(inputKamar);
  try {
    let data = await Kamar_Penginapan.findOne(options);
    if (data) {
      const kamar_penginapan = await Kamar_Penginapan.update(inputKamar, options);
      response.code = 200;
      response.message = "Kamar penginapan berhasil diubah";
      response.data = inputKamar;
      res.send(response.getResponse());
    } else {
      throw new Error('404|Kamar penginapan tidak ditemukan')
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

router.delete("/", async (req, res) => {
  const options = {};
  options.where = {
    id_kamar_penginapan: req.body.id_kamar_penginapan,
  };

  try {
    let data = await Kamar_Penginapan.findOne(options)
    if (data) {
      const kamar_penginapan = await Kamar_Penginapan.destroy(options);
      response.code = 200;
      response.message = "Kamar penginapan berhasil dihapus";
      response.data = kamar_penginapan;
      res.send(response.getResponse());
    } else {
      throw new Error('404|Kamar penginapan tidak ditemukan')
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

module.exports = router;
