const router = require("express").Router();
const Tiket = require("../models/TiketModel");
const Wisata = require("../models/TempatwisataModel");
const response = require("../core/response");
const routes = require("../routers");
const crypto = require("crypto");
const { Op } = require("sequelize");
const Sequelize = require("sequelize");

router.get("/", (req, res) => {
  let { search } = req.query;

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
        jenis_tiket: Sequelize.where(
          Sequelize.fn("lower", Sequelize.col("jenis_tiket")),
          "LIKE",
          "%" + search.toLowerCase() + "%"
        ),
      },
      {
        harga_tiket: Sequelize.where(
          Sequelize.fn("lower", Sequelize.col("harga_tiket")),
          "LIKE",
          "%" + search.toLowerCase() + "%"
        ),
      }
    );

    options["where"] = {
      [Sequelize.Op.or]: wheres,
    };
  }
  Tiket.findAll(options)
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

router.get("/:id", (req, res) => {
  const id = req.body.id;
  Tiket.findOne({
    where: {
      id: req.params.id,
    },
  })
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

router.post("/insert", (req, res) => {
  let modelAttr = Tiket.rawAttributes;
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
  Tiket.create(inputs)
    .then((resp) => {
      response.code = 200;
      response.message = "Input data berhasil";
      response.data = inputs;
      res.send(response.getResponse());
    })
    .catch((err) => {
      response.code = 110;
      response.message = err.message;
      res.send(response.getResponse());
    });
});

router.put("/update/:id", (req, res) => {
  let modelAttr = Tiket.rawAttributes;
  let inputs = {};
  Object.values(modelAttr).forEach((val) => {
    if (req.body[val.field] != null) {
      inputs[val.fieldName] = req.body[val.field];
    }
  });

  try {
    inputs["id"] = req.params.id;
    const data = Tiket.update(inputs, {
      where: {
        [Tiket.primaryKeyAttribute]: req.params.id,
      },
    });

    response.code = 200;
    response.message = "Update Data Berhasil!";
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
  Tiket.destroy({ where: { [Tiket.primaryKeyAttribute]: id } })
    .then((resp) => {
      response.code = 200;
      response.message = "Deleted Data Berhasil";
      response.data = resp;
      res.send(response.getResponse());
    })
    .catch((err) => {
      response.code = 110;
      response.message = err.message;
      res.send(response.getResponse());
    });
});

router.post("/search", (req, res) => {
  const jenis_tiket = req.body.jenis_tiket;
  const harga_tiket = req.body.harga_tiket;
  Tiket.findAll({
    where: {
      [Op.or]: [
        {
          jenis_tiket: {
            [Op.like]: "%" + jenis_tiket + "%",
          },
        },
        {
          harga_tiket: {
            [Op.like]: "%" + harga_tiket + "%",
          },
        },
      ],
    },
  })
    .then((data) => {
      if (data != null) {
        response.code = 200;
        response.message = "Data Ditemukan";
        response.data = data;
        res.send(response.getResponse());
      } else {
        response.code = 200;
        response.message = "Data tidak ditemukan";
        res.send(response.getResponse());
      }
    })
    .catch((err) => {
      response.code = 110;
      response.message = err.message;
      res.send(response.getResponse());
    });
});

module.exports = router;
