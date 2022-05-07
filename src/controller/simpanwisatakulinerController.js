const router = require("express").Router();
const SimpanWisataKuliner = require("../models/old/SimpanWisatakulinerMondel");
const response = require("../core/response");
const routes = require("../routers");
const crypto = require("crypto");
const User = require("../models/UserModel");
const Wisata = require("../models/TempatwisataModel");
const Sequelize = require("sequelize");
const GambarWisata = require("../models/old/GambarModel");

router.get("/", (req, res) => {
  let { search, userid } = req.query;

  const options = {
    include: [
      {
        model: Wisata,
        include : [{
          model : GambarWisata
        }]
      },
      {
        model: User,
      },
    ],
    where : {
      id_user : userid
    }
  };
  //cek jika ada query search
  if (search) {

    options.include[0]["where"] = {
      [Sequelize.Op.or] : [
        {
          nama_wisata: Sequelize.where(
            Sequelize.fn("lower", Sequelize.col("nama_wisata")),
            "LIKE",
            "%" + search.toLowerCase() + "%"
          ),
        },
        {
          deskripsi: Sequelize.where(
            Sequelize.fn("lower", Sequelize.col("alamat")),
            "LIKE",
            "%" + search.toLowerCase() + "%"
          ),
        }
      ]
      
    };
  }
  SimpanWisataKuliner.findAll(options)
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

router.get("/find", async (req, res) => {
  let modelAttr = SimpanWisataKuliner.rawAttributes;
  let wheres = {};
  Object.values(modelAttr).forEach((val) => {
    if (req.query[val.field] != null) {
      wheres[val.field] = req.query[val.field];
    }
  });

  try {
    let wisata;
    const params = {
      where: wheres,
      include: [{ model: Wisata }, { model: User }],
    };
    if (req.query.result) {
      if (req.query.result === "one") {
        wisata = await SimpanWisataKuliner.findOne(params);
      } else if (req.query.result === "all") {
        wisata = await SimpanWisataKuliner.findAll(params);
      }
    } else {
      wisata = await SimpanWisataKuliner.findAll(params);
    }

    response.code = 200;
    response.message = "Sukses";
    response.data = wisata;
    res.send(response.getResponse());
  } catch (error) {
    response.error(res, { error: error.message });
  }
});

router.get("/:id", (req, res) => {
  SimpanWisataKuliner.findOne({
    where: { id: req.params.id },
    include: [{ model: Wisata }, { model: User }],
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
  let Model = SimpanWisataKuliner.rawAttributes;

  let input = {};
  Object.values(Model).forEach((val) => {
    if (val.field != "id") {
      if (req.body[val.field] != null) {
        input[val.fieldName] = req.body[val.field];
      } else {
        input[val.fieldName] = null;
      }
    }
  });

  SimpanWisataKuliner.create(input)
    .then((respon) => {
      response.code = 200;
      response.message = "Input Data Berhasil!";
      response.data = input;
      res.send(response.getResponse());
    })
    .catch((err) => {
      response.code = 110;
      response.message = err.message;
      res.send(response.getResponse());
    });
});

router.put("/update/:id", (req, res) => {
  let Model = SimpanWisataKuliner.rawAttributes;
  let input = {};
  Object.values(Model).forEach((val) => {
    input[val.fieldName] = req.body[val.field];
  });

  try {
    const data = SimpanWisataKuliner.update(input, {
      where: {
        [SimpanWisataKuliner.primaryKeyAttribute]: req.params.id,
      },
    });
    input["id"] = req.params.id;
    response.code = 200;
    response.message = "Ubah Data Berhasil";
    response.data = input;
    res.send(response.getResponse());
  } catch (error) {
    response.code = 110;
    response.message = err.message;
    res.send(response.getResponse());
  }
});

router.delete("/delete/:id", (req, res) => {
  const id = req.params.id;
  SimpanWisataKuliner.destroy({
    where: {
      id: id,
    },
  })
    .then((data) => {
      response.code = 200;
      response.message = "Delete Data Berhasil";
      response.data = data;
      res.send(response.getResponse());
    })
    .catch((err) => {
      response.code = 110;
      response.message = err.message;
      res.send(response.getResponse());
    });
});

module.exports = router;
