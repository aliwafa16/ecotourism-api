const router = require("express").Router();
const response = require("../core/response");

const Kategori_Kuliner = require('../models/KategoriKuliner_Model');

router.get("/", async (req, res) => {
  const options = {
    attributes: ["id_kategori_kuliner", "jenis_kuliner"],
  };
  try {
    const kategori_kuliner = await Kategori_Kuliner.findAll(options);
    response.code = 200;
    response.message = "Sukses";
    response.data = kategori_kuliner;
    res.send(response.getResponse());
  } catch (error) {
    response.code = 110;
    response.message = error.message;
    res.send(response.getResponse());
  }
});

module.exports = router;
