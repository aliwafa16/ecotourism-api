const router = require("express").Router();
const response = require("../core/response");

const Kategori_Penginapan = require("../models/KategoriPenginapan_Model");

router.get("/", async (req, res) => {
  const options = {
    attributes: ["id_kategori_penginapan", "kategori"],
  };
  try {
    const kategori_penginapan = await Kategori_Penginapan.findAll(options);
    response.code = 200;
    response.message = "Sukses";
    response.data = kategori_penginapan;
    res.send(response.getResponse());
  } catch (error) {
    response.code = 110;
    response.message = error.message;
    res.send(response.getResponse());
  }
});

module.exports = router;
