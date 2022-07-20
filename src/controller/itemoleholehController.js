const router = require("express").Router();
const response = require("../core/response");
const { Op } = require("sequelize");
const Item_Oleh_Oleh = require("../models/ItemOlehOleh_Model");

router.get("/", async (req, res) => {
  try {
    const item = await Item_Oleh_Oleh.findAll();
    if (item) {
      response.code = 200;
      response.message = "Sukses";
      response.data = item;
      res.send(response.getResponse());
    } else {
      throw new Error("110|File tidak ditemukan");
    }
  } catch (error) {
    let errors = error.message || "";
    errors = errors.split("|");
    console.log(errors);
    response.code = errors.length > 1 ? errors[0] : 500;
    response.message = errors.length > 1 ? errors[1] : errors[0];
    res.send(response.getResponse());
  }
});

router.get("/find", async (req, res) => {
  const options = {};
  const find = req.query;
  let modelAttr = Item_Oleh_Oleh.rawAttributes;
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
    const item = await Item_Oleh_Oleh.findAll(options);
    if (item.length != 0) {
      response.code = 200;
      response.message = "Sukses";
      response.data = item;
      res.send(response.getResponse());
    } else {
      throw new Error("110|File tidak ditemukan");
    }
  } catch (error) {
    let errors = error.message || "";
    errors = errors.split("|");
    console.log(errors);
    response.code = errors.length > 1 ? errors[0] : 500;
    response.message = errors.length > 1 ? errors[1] : errors[0];
    res.send(response.getResponse());
  }
});

router.get("/:id", async (req, res) => {
  try {
    const item = await Item_Oleh_Oleh.findOne({
      where: {
        id_item_oleh_oleh: req.params.id,
      },
    });

    if (item) {
      response.code = 200;
      response.message = "Sukses";
      response.data = item;
      res.send(response.getResponse());
    } else {
      throw new Error("110|File tidak ditemukan");
    }
  } catch (error) {
    let errors = error.message || "";
    errors = errors.split("|");
    console.log(errors);
    response.code = errors.length > 1 ? errors[0] : 500;
    response.message = errors.length > 1 ? errors[1] : errors[0];
    res.send(response.getResponse());
  }
});

router.post("/", async (req, res) => {
  const modelAttr = Item_Oleh_Oleh.rawAttributes;
  const inputItem = {};

  Object.values(modelAttr).forEach((val) => {
    if (val.field != "id_item_oleh_oleh") {
      if (req.body[val.field] != "") {
        inputItem[val.fieldName] = req.body[val.field];
      } else {
        inputItem[val.fieldName] = null;
      }
    }
  });

  let data = await Item_Oleh_Oleh.findOne({
    where: {
      nama_item: inputItem.nama_item,
      oleh_oleh_id: inputItem.oleh_oleh_id,
    },
  });

  try {
    if (data) {
      throw new Error("Data sudah ada");
    } else {
      const item = await Item_Oleh_Oleh.create(inputItem);
      response.code = 200;
      response.message = "Tambah data berhasil";
      response.data = inputItem;
      res.send(response.getResponse());
    }
  } catch (error) {
    response.code = 110;
    response.message = error.message;
    res.send(response.getResponse());
  }
});

router.put("/", async (req, res) => {
  const options = {};
  options.where = {
    id_item_oleh_oleh: req.body.id_item_oleh_oleh,
  };

  try {
    let data = await Item_Oleh_Oleh.findOne(options);
    if (!data) {
      throw new Error("Data tidak ditemukan");
    } else {
      const modelAttr = Item_Oleh_Oleh.rawAttributes;
      const inputItem = {};
      inputItem.id_item_oleh_oleh = req.body.id_item_oleh_oleh;
      Object.values(modelAttr).forEach((val) => {
        if (val.field != "id_item_oleh_oleh") {
          if (req.body[val.field] != "") {
            inputItem[val.fieldName] = req.body[val.field];
          } else {
            inputItem[val.fieldName] = null;
          }
        }
      });

      let check_data = await Item_Oleh_Oleh.count({
        attributes: ["nama_item"],
        where: {
          nama_item: inputItem.nama_item,
          id_item_oleh_oleh: { [Op.not]: inputItem.id_item_oleh_oleh },
          oleh_oleh_id: inputItem.oleh_oleh_id,
        },
      });

      console.log(check_data);

      if (check_data) {
        throw new Error("Data sudah ada");
      } else {
        const kategori = await Item_Oleh_Oleh.update(inputItem, options);
        response.code = 200;
        response.message = "Ubah data berhasil";
        response.data = inputItem;
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
    id_item_oleh_oleh: req.body.id_item_oleh_oleh,
  };

  try {
    let data = await Item_Oleh_Oleh.findOne(options);
    if (data) {
      const item = await Item_Oleh_Oleh.destroy(options);
      response.code = 200;
      response.message = "Data berhasil dihapus";
      response.data = item;
      res.send(response.getResponse());
    } else {
      throw new Error("Data tidak ditemukan");
    }
  } catch (error) {
    response.code = 110;
    response.message = error.message;
    res.send(response.getResponse());
  }
});

module.exports = router;
