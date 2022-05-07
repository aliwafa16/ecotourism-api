const router = require("express").Router();
const Fasilitas = require("../models/FasilitasModel");
const response = require("../core/response");
const routes = require("../routers");
const crypto = require("crypto");
const { route } = require("./userController");
const Wisata = require("../models/TempatwisataModel");
const Sequelize = require("sequelize");

Fasilitas.hasOne(Wisata,{foreignKey:'id', sourceKey:'id_wisata'});

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
          Sequelize.fn("lower", Sequelize.col("fasilitas")),
          "LIKE",
          "%" + search.toLowerCase() + "%"
        ),
      }
    );

    options["where"] = {
      [Sequelize.Op.or]: wheres,
    };
  }
  Fasilitas.findAll(options)
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

router.get("/find", (req, res) => {
  let modelAttr = Fasilitas.rawAttributes;
  let wheres = {};
  console.log(modelAttr);
  Object.values(modelAttr).forEach((val) => {
    console.log(req.query[val.field]);
    if (req.query[val.field] != null) {
      wheres[val.field] = req.query[val.field];
    }
  });
  Fasilitas.findAll({ where: wheres })
  .then((data) => {
    response.code = 200;
    response.message = "Sukses";
    response.data = data;
    res.send(response.getResponse());
  })
  .catch((err) => response.error(res, { error: err.message }));
});

router.get('/:id', (req, res)=>{
  Fasilitas.findOne({
    where:{id:req.params.id},
    include:[{
      model:Wisata
    }]
  }).then((data)=>{
      response.code = 200;
      response.message = "Sukses";
      response.data = data;
      res.send(response.getResponse());
  }).catch(err=>{
      response.code = 110;
      response.message = err.message;
      res.send(response.getResponse());
  })
})


router.post("/insert", (req, res) => {
  let Model = Fasilitas.rawAttributes;
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

  Fasilitas.create(input)
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
  let Model = Fasilitas.rawAttributes;
  let input = {};
  Object.values(Model).forEach((val) => {
    input[val.fieldName] = req.body[val.field];
  });

  try {
    const data = Fasilitas.update(input, {
      where: {
        [Fasilitas.primaryKeyAttribute]: req.params.id,
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

router.delete("/delete", (req, res) => {
  const id = req.body.id;
  Fasilitas.destroy({ where: { [Fasilitas.primaryKeyAttribute]: id } })
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
