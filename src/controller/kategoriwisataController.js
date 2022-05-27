const router = require("express").Router();
const response = require("../core/response");

const Kategori_Wisata = require("../models/KategoriWisata_Model");

router.get("/", async (req, res) => {
  const options = {
    attributes: ["id_kategori_wisata", "kategori"],
  };
  try {
    const kategori_wisata = await Kategori_Wisata.findAll(options);
    response.code = 200;
    response.message = "Sukses";
    response.data = kategori_wisata;
    res.send(response.getResponse());
  } catch (error) {
    response.code = 110;
    response.message = error.message;
    res.send(response.getResponse());
  }
});

module.exports = router;
