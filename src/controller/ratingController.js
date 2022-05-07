const router = require("express").Router();
const Rating = require("../models/old/RatingWisataModel");
const response = require("../core/response");
const routes = require("../routers");
const crypto = require("crypto");
const { route } = require("./userController");
const User = require("../models/UserModel");
const Wisata = require("../models/TempatwisataModel");
const Sequelize = require("sequelize");

Rating.belongsTo(Wisata,{foreignKey:'id_wisata'});

router.get("/", (req, res) => {
  let { search } = req.query; //sama dengan let search = req.query.search;

  const options = {
    include: [
    {
      model: User,
    },
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
      id_pengguna: Sequelize.where(
        Sequelize.fn("lower", Sequelize.col("id_pengguna")),
        "LIKE",
        "%" + search.toLowerCase() + "%"
        ),
    },
    {
      rating: Sequelize.where(
        Sequelize.fn("lower", Sequelize.col("rating")),
        "LIKE",
        "%" + search.toLowerCase() + "%"
        ),
    },
    {
      keterangan: Sequelize.where(
        Sequelize.fn("lower", Sequelize.col("keterangan")),
        "LIKE",
        "%" + search.toLowerCase() + "%"
        ),
    }
    );

    options["where"] = {
      [Sequelize.Op.or]: wheres,
    };
  }
  Rating.findAll(options)
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
  Rating.findOne({
    where:{id:req.params.id},
    include : [{
      model: User,
    },
    {
      model: Wisata,
    },]
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

router.post("/search", (req, res) => {
  let Model = Rating.rawAttributes;

  let input = {};
});

router.post("/insert", (req, res) => {
  let Model = Rating.rawAttributes;

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

  Rating.create(input)
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
  let Model = Rating.rawAttributes;
  let input = {};
  Object.values(Model).forEach((val) => {
    input[val.fieldName] = req.body[val.field];
  });

  try {
    const data = Rating.update(input, {
      where: {
        [Rating.primaryKeyAttribute]: req.params.id,
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
  Rating.destroy({ where: { [Rating.primaryKeyAttribute]: id } })
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
