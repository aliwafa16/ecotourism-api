const req = require("express/lib/request");

const routes = (app) => {
  // app.use("/user", require("../controller/userController"));
  // app.use("/wisata", require("../controller/wisataController"));
  // app.use("/rating", require("../controller/ratingController"));
  // app.use("/simpan_wisata_kuliner", require("../controller/simpanwisatakulinerController"));
  // app.use("/suka_wisata_kuliner",require("../controller/sukawisatakulinerController"));
  // app.use("/tiket", require("../controller/tiketController"));
  // app.use("/item", require("../controller/itemwisataController"));
  // app.use("/jadwal", require("../controller/jadwalwisatakulinerController"));
  // app.use("/fasilitas", require("../controller/fasilitasController"));
  app.use("/gambar", require("../controller/gambarController"));

  app.use("/auth", require("../controller/authController"));
  app.use("/role", require("../controller/roleController"));
  app.use("/menu", require("../controller/menuController"));
  app.use("/access", require("../controller/accessmenuController"));
  app.use("/pariwisata", require("../controller/pariwisataController"));
  app.use("/wisata", require("../controller/wisataController"));
  app.use("/kuliner", require("../controller/kulinerController"));
  app.use("/penginapan", require("../controller/penginapanController"));
  app.use("/pengguna", require("../controller/PenggunaController"));
  app.use(
    "/kategori_wisata",
    require("../controller/kategoriwisataController")
  );

  app.use("/jadwal", require("../controller/jadwalController"))
  app.use("/tiket", require("../controller/tiketController"))
  app.use("/fasilitas", require("../controller/fasilitasController"));
  app.use('/kategori_kuliner', require('../controller/kategorikulinerController'))
  app.use('/menu_kuliner', require('../controller/menukulinerController'))
  app.use('/kategori_penginapan', require('../controller/kategoripenginapanController'))
  app.use("/jenis_kamar", require("../controller/kamarpenginapanController"));
  app.use(
    "/fasilitas_kamar",
    require("../controller/fasilitaskamarController")
  );
  app.use("/oleh_oleh", require('../controller/oleholehController'))
  
};

module.exports = routes;
