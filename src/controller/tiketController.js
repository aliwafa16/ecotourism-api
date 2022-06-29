const router = require("express").Router();
const response = require("../core/response");
const Tiket = require('../models/Tiket_Model');

router.get('/', async (req, res) => {
  try {
    const tiket = await Tiket.findAll();
    response.code = 200;
    response.message = "Sukses";
    response.data = tiket;
    res.send(response.getResponse());
  } catch (error) {
    response.code = 110;
    response.message = error.message;
    res.send(response.getResponse());
  }
})

router.get("/find", async (req, res) => {
  const options = {}
  const find = req.query;
  let modelAttr = Tiket.rawAttributes;
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
    const tiket = await Tiket.findAll(options);
    if (tiket.length != 0) {
      response.code = 200;
      response.message = "Sukses";
      response.data = tiket;
      res.send(response.getResponse());
    } else {
      response.code = 111;
      response.message = "Data tidak ditemukan";
      res.send(response.getResponse());
    }
  } catch (error) {
    response.code = 110;
    response.message = error.message;
    res.send(response.getResponse());
  }
});

router.get('/:id', async (req, res) => {
    try {
        const tiket = await Tiket.findOne({
            where: {
                id_tiket:req.params.id
            }
        })

        response.code = 200;
        response.message = "Sukses";
        response.data = tiket;
        res.send(response.getResponse());

    } catch (error) {
        response.code = 110;
        response.message = error.message;
        res.send(response.getResponse());
    }
})


router.post('/', async (req, res) => {
  const modelAttr = Tiket.rawAttributes;
    const inputTiket = {};

    Object.values(modelAttr).forEach((val) => {
        if (val.field != "id_tiket") {
        if (req.body[val.field] != "") {
            inputTiket[val.fieldName] = req.body[val.field];
        } else {
            inputTiket[val.fieldName] = null;
        }
        }
    });


    try {
        const tiket = await Tiket.create(inputTiket)
        response.code = 200;
        response.message = "Tambah Data Tiket Berhasil";
        response.data = inputTiket;
        res.send(response.getResponse());
    } catch (error) {
        response.code = 110;
        response.message = error.message;
        res.send(response.getResponse());
    }
})

router.put('/', async (req, res) => {
    const options = {};
    options.where = {
        id_tiket: req.body.id_tiket,
    };
    
    try {
    const data = await Tiket.findOne(options);
    if (data) {
      const modelAttr = Tiket.rawAttributes;
      const inputTiket = {};
      inputTiket.id_tiket = req.body.id_tiket;
      Object.values(modelAttr).forEach((val) => {
        if (val.field != "id_tiket") {
          if (req.body[val.field] != "") {
            inputTiket[val.fieldName] = req.body[val.field];
          } else {
            inputTiket[val.fieldName] = null;
          }
        }
      });
      try {
        const tiket = await Tiket.update(inputTiket, options);
        response.code = 200;
        response.message = "Ubah Data Tiket Berhasil";
        response.data = inputTiket;
        res.send(response.getResponse());
      } catch (error) {
        response.code = 110;
        response.message = error.message;
        res.send(response.getResponse());
      }
    } else {
      response.code = 110;
      response.message = "Data tiket tidak ditemukan";
      res.send(response.getResponse());
    }

  } catch (error) {
    response.code = 110;
    response.message = error.message;
    res.send(response.getResponse());
  }
})


router.delete('/', async (req, res) => {
const options = {};
  options.where = {
    id_tiket: req.body.id_tiket,
  };

  try {
    const tiket = await Tiket.destroy(options);
    response.code = 200;
    response.message = "Data tiket berhasil dihapus";
    response.data = tiket;
    res.send(response.getResponse());
  } catch (error) {
    response.code = 110;
    response.message = error.message;
    res.send(response.getResponse());
  }
})


// const router = require("express").Router();
// const Tiket = require("../models/TiketModel");
// const Wisata = require("../models/TempatwisataModel");
// const response = require("../core/response");
// const routes = require("../routers");
// const crypto = require("crypto");
// const { Op } = require("sequelize");
// const Sequelize = require("sequelize");

// router.get("/", (req, res) => {
//   let { search } = req.query;

//   const options = {
//     include: [
//       {
//         model: Wisata,
//       },
//     ],
//   };
//   //cek jika ada query search
//   if (search) {
//     let wheres = [];
//     wheres.push(
//       {
//         id_wisata: Sequelize.where(
//           Sequelize.fn("lower", Sequelize.col("id_wisata")),
//           "LIKE",
//           "%" + search.toLowerCase() + "%"
//         ),
//       },
//       {
//         jenis_tiket: Sequelize.where(
//           Sequelize.fn("lower", Sequelize.col("jenis_tiket")),
//           "LIKE",
//           "%" + search.toLowerCase() + "%"
//         ),
//       },
//       {
//         harga_tiket: Sequelize.where(
//           Sequelize.fn("lower", Sequelize.col("harga_tiket")),
//           "LIKE",
//           "%" + search.toLowerCase() + "%"
//         ),
//       }
//     );

//     options["where"] = {
//       [Sequelize.Op.or]: wheres,
//     };
//   }
//   Tiket.findAll(options)
//     .then((data) => {
//       response.code = 200;
//       response.message = "Sukses";
//       response.data = data;
//       res.send(response.getResponse());
//     })
//     .catch((err) => {
//       response.code = 110;
//       response.message = err.message;
//       res.send(response.getResponse());
//     });
// });

// router.get("/:id", (req, res) => {
//   const id = req.body.id;
//   Tiket.findOne({
//     where: {
//       id: req.params.id,
//     },
//   })
//     .then((data) => {
//       response.code = 200;
//       response.message = "Sukses";
//       response.data = data;
//       res.send(response.getResponse());
//     })
//     .catch((err) => {
//       response.code = 110;
//       response.message = err.message;
//       res.send(response.getResponse());
//     });
// });

// router.post("/insert", (req, res) => {
//   let modelAttr = Tiket.rawAttributes;
//   console.log(req.body);
//   let inputs = {};
//   Object.values(modelAttr).forEach((val) => {
//     console.log(val.field);
//     if (val.field != "id") {
//       if (req.body[val.field] != null) {
//         inputs[val.fieldName] = req.body[val.field];
//       } else {
//         inputs[val.fieldName] = null;
//       }
//     }
//   });

//   console.log(inputs);
//   Tiket.create(inputs)
//     .then((resp) => {
//       response.code = 200;
//       response.message = "Input data berhasil";
//       response.data = inputs;
//       res.send(response.getResponse());
//     })
//     .catch((err) => {
//       response.code = 110;
//       response.message = err.message;
//       res.send(response.getResponse());
//     });
// });

// router.put("/update/:id", (req, res) => {
//   let modelAttr = Tiket.rawAttributes;
//   let inputs = {};
//   Object.values(modelAttr).forEach((val) => {
//     if (req.body[val.field] != null) {
//       inputs[val.fieldName] = req.body[val.field];
//     }
//   });

//   try {
//     inputs["id"] = req.params.id;
//     const data = Tiket.update(inputs, {
//       where: {
//         [Tiket.primaryKeyAttribute]: req.params.id,
//       },
//     });

//     response.code = 200;
//     response.message = "Update Data Berhasil!";
//     response.data = inputs;
//     res.send(response.getResponse());
//   } catch (error) {
//     response.code = 110;
//     response.message = err.message;
//     res.send(response.getResponse());
//   }
// });

// router.delete("/delete", (req, res) => {
//   const id = req.body.id;
//   console.log(id);
//   Tiket.destroy({ where: { [Tiket.primaryKeyAttribute]: id } })
//     .then((resp) => {
//       response.code = 200;
//       response.message = "Deleted Data Berhasil";
//       response.data = resp;
//       res.send(response.getResponse());
//     })
//     .catch((err) => {
//       response.code = 110;
//       response.message = err.message;
//       res.send(response.getResponse());
//     });
// });

// router.post("/search", (req, res) => {
//   const jenis_tiket = req.body.jenis_tiket;
//   const harga_tiket = req.body.harga_tiket;
//   Tiket.findAll({
//     where: {
//       [Op.or]: [
//         {
//           jenis_tiket: {
//             [Op.like]: "%" + jenis_tiket + "%",
//           },
//         },
//         {
//           harga_tiket: {
//             [Op.like]: "%" + harga_tiket + "%",
//           },
//         },
//       ],
//     },
//   })
//     .then((data) => {
//       if (data != null) {
//         response.code = 200;
//         response.message = "Data Ditemukan";
//         response.data = data;
//         res.send(response.getResponse());
//       } else {
//         response.code = 200;
//         response.message = "Data tidak ditemukan";
//         res.send(response.getResponse());
//       }
//     })
//     .catch((err) => {
//       response.code = 110;
//       response.message = err.message;
//       res.send(response.getResponse());
//     });
// });

module.exports = router;
