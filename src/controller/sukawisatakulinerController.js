const router = require("express").Router();
const SukaWisatakuliner = require("../models/SukaWisatakulinerModel");
const response = require("../core/response");
const routes = require("../routers");
const crypto = require("crypto");
const User = require("../models/UserModel");
const Wisata = require("../models/TempatwisataModel");

SukaWisatakuliner.belongsTo(User,{foreignKey:'id_user'});
SukaWisatakuliner.belongsTo(Wisata,{foreignKey:'id_wisata'});

router.get("/", (req, res) => {
  let { search } = req.query;

  const options = {
    include: [
      {
        model: Wisata,
      },
      {
        model: User,
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
        id_user: Sequelize.where(
          Sequelize.fn("lower", Sequelize.col("id_user")),
          "LIKE",
          "%" + search.toLowerCase() + "%"
        ),
      }
    );

    options["where"] = {
      [Sequelize.Op.or]: wheres,
    };
  }
  SukaWisatakuliner.findAll(options)
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

router.get('/:id',(req,res)=>{
  SukaWisatakuliner.findOne({
    where:{id:req.params.id},
    include : [{model:User},{model:Wisata}]
  }).then((data)=>{
    response.code = 200;
      response.message = "Sukses";
      response.data = data;
      res.send(response.getResponse());
  }).catch((err)=>{
    response.code = 110;
      response.message = err.message;
      res.send(response.getResponse());
  })
})

router.post("/insert", (req, res) => {
  let Model = SukaWisatakuliner.rawAttributes;

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

  SukaWisatakuliner.create(input)
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
  let Model = SukaWisatakuliner.rawAttributes;
  let input = {};
  Object.values(Model).forEach((val) => {
    input[val.fieldName] = req.body[val.field];
  });

  try {
    const data = SukaWisatakuliner.update(input, {
      where: {
        [SukaWisatakuliner.primaryKeyAttribute]: req.params.id,
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
  SukaWisatakuliner.destroy({
    where: { [SukaWisatakuliner.primaryKeyAttribute]: id },
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
