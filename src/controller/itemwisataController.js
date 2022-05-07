const router = require("express").Router();
const Item = require("../models/old/ItemWisataModel");
const response = require("../core/response");
const routes = require("../routers");
const {existsSync} = require('fs');
const crypto = require("crypto");
const ItemWisata = require("../models/old/ItemWisataModel");
const Wisata = require("../models/TempatwisataModel");

ItemWisata.belongsTo(Wisata, { foreignKey: "id_wisata" });

router.get("/", (req, res) => {
  let { search } = req.query; //sama dengan let search = req.query.search;

  const options = {
    include: [
      {
        model: Wisata,
      },
    ],
  };
  //cek jika ada query search
  if (search) {
    let wheres = [];
    wheres.push(
      {
        id_wisata: Sequelize.where(
          Sequelize.fn("lower", Sequelize.col("id_wisata")),
          "LIKE",
          "%" + search.toLowerCase() + "%"
        ),
      },
      {
        fasilitas: Sequelize.where(
          Sequelize.fn("lower", Sequelize.col("deskripsi")),
          "LIKE",
          "%" + search.toLowerCase() + "%"
        ),
      }
    );

    options["where"] = {
      [Sequelize.Op.or]: wheres,
    };
  }
  ItemWisata.findAll(options)
    .then((data) => {
      response.code = 200;
      response.message = "Sukses";
      response.data = data;
      res.send(response.getResponse());
    })
    .catch((err) => {
      response.code = 110;
      response.message = err.message;
      res.send(response.getResponse());
    });
});

router.get("/load", (req, res) => {
  const { filename, filepath } = req.query;
  const filePath = `${filepath}${filename}`;
  const existFile = existsSync(filePath);
  if (existFile) res.download(filePath);
  else {
    response.code = "404";
    response.message = "File tidak ditemukan";
    res.send(response.getResponse());
  }
});

router.get("/:id", (req, res) => {
  const id = req.body.id;
  Item.findOne({
    where: {
      id: req.params.id,
    },
    include: {
      model: Wisata,
    },
  })
    .then((data) => {
      response.code = 200;
      response.message = "Sukses";
      data.audio = {
        filepath: `public/audio/${data.id}/`,
        filename: `${data.audio}`,
      };
      response.data = data;
      res.send(response.getResponse());
    })
    .catch((err) => {
      response.code = 110;
      response.message = err.message;
      res.send(response.getResponse());
    });
});

router.post("/insert", (req, res) => {
  let modelAttr = Item.rawAttributes;
  console.log(req.body);
  let inputs = {};
  Object.values(modelAttr).forEach((val) => {
    console.log(val.field);
    if (val.field != "id") {
      if (req.body[val.field] != null) {
        inputs[val.fieldName] = req.body[val.field];
      } else {
        inputs[val.fieldName] = null;
      }
    }
  });

  console.log(inputs);
  Item.create(inputs)
    .then((resp) => {
      response.code = 200;
      response.message = "Input data berhasil";
      response.data = inputs;
      res.send(response.getResponse());
    })
    .catch((err) => {
      response.code = 110;
      response.message = err.message;
      res.render(response.getResponse());
    });
});

router.put("/update/:id", (req, res) => {
  let modelAttr = Item.rawAttributes;
  let inputs = {};
  Object.values(modelAttr).forEach((val) => {
    if (req.body[val.field] != null) {
      inputs[val.fieldName] = req.body[val.field];
    }
  });

  try {
    inputs["id"] = req.params.id;
    const data = Item.update(inputs, {
      where: {
        [Item.primaryKeyAttribute]: req.params.id,
      },
    });

    response.code = 200;
    response.message = "Update Data Berhasil";
    response.data = inputs;
    res.send(response.getResponse());
  } catch (error) {
    response.code = 110;
    response.message = err.message;
    res.send(response.getResponse());
  }
});

router.delete("/delete", (req, res) => {
  const id = req.body.id;
  console.log(id);
  Item.destroy({
    where: {
      [Item.primaryKeyAttribute]: id,
    },
  })
    .then((resp) => {
      response.code = 200;
      response.message = "Delete Data Berhasil";
      response.data = resp;
      res.send(response.getResponse());
    })
    .catch((err) => {
      response.code = 110;
      response.message = err.message;
      res.send(response.getResponse());
    });
});

module.exports = router;
