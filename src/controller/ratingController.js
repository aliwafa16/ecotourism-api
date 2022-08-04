const router = require("express").Router();
const response = require("../core/response");
const Rating = require("../models/Rating_Model");
const Pengguna = require("../models/Pengguna_Model")

router.get('/', async (req, res) => {
  try {
    let rating = await Rating.findAll()
    if (rating) {
    response.code = 200;
    response.message = "Sukses";
    response.data = rating;
    res.send(response.getResponse());
    } else {
      throw new Error("404|Rating tidak ditemukan")
  }
  } catch (error) {
    let errors = error.message || "";
    errors = errors.split('|');
    console.log(errors)
    response.code = errors.length>1?errors[0]:500
    response.message = errors.length>1?errors[1]:errors[0];
    res.send(response.getResponse());
  }
})

router.get('/find', async (req, res) => {
  try {
  const options = {}
  const find = req.query;
  let modelAttr = Rating.rawAttributes;
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
    let rating = await Rating.findAll(options)
    if (rating.length>0) {
    response.code = 200;
    response.message = "Sukses";
    response.data = rating;
    res.send(response.getResponse());
    } else {
      throw new Error('404|Rating tidak ditemukan')
    }
  } catch (error) {
    let errors = error.message || "";
    errors = errors.split('|');
    console.log(errors)
    response.code = errors.length>1?errors[0]:500
    response.message = errors.length>1?errors[1]:errors[0];
    res.send(response.getResponse());
  }
})

router.get('/:id', async (req, res) => {
  try {
    let rating = await Rating.findOne({ where: { id_rating: req.params.id } })
    if (rating) {
    response.code = 200;
    response.message = "Sukses";
    response.data = rating;
    res.send(response.getResponse());
    } else {
      throw new Error('404|Rating tidak ditemukan')
    }
  } catch (error) {
    let errors = error.message || "";
    errors = errors.split('|');
    console.log(errors)
    response.code = errors.length>1?errors[0]:500
    response.message = errors.length>1?errors[1]:errors[0];
    res.send(response.getResponse());
  }
})

router.post('/', async (req, res) => {
  try {
    const modelAttr = Rating.rawAttributes
    const inputRating = {};

    Object.values(modelAttr).forEach((val) => {
        if (val.field != "id_rating") {
          if (req.body[val.field] != '') {
            inputRating[val.fieldName] = req.body[val.field];
          } else {
            inputRating[val.fieldName] = null;
          }
        }
    });

    let pengguna = await Pengguna.findOne({ where: { id_pengguna: inputRating['pengguna_id'] } });
    if (pengguna) {
      let rating = await Rating.create(inputRating);
      response.code = 200;
      response.message = "Rating berhasil ditambahkan";
      response.data = inputRating;
      res.send(response.getResponse());
    } else {
      throw new Error("404|Pengguna tidak ditemukan")
    }
  } catch (error) {
    let errors = error.message || "";
    errors = errors.split('|');
    console.log(errors)
    response.code = errors.length>1?errors[0]:500
    response.message = errors.length>1?errors[1]:errors[0];
    res.send(response.getResponse());
  }
})

router.put('/', async (req, res) => {
  try {
    const options = {}
    options.where = {
        id_rating : req.body.id_rating
    }
    const modelAttr = Rating.rawAttributes
    const inputRating = {};

    Object.values(modelAttr).forEach((val) => {
        if (val.field != "id_rating") {
          if (req.body[val.field] != '') {
            inputRating[val.fieldName] = req.body[val.field];
          } else {
            inputRating[val.fieldName] = null;
          }
        }
    });

    let pengguna = await Pengguna.findOne({ where: { id_pengguna: req.body.pengguna_id } });
    if (pengguna) {
      let data = await Rating.findOne(options)
      if (data) {
      let rating = await Rating.update(inputRating,options);
      response.code = 200;
      response.message = "Rating berhasil diubah";
      response.data = inputRating;
      res.send(response.getResponse());
      } else {
        throw new Error("404|Rating tidak ditemukan")
      }
    } else {
      throw new Error("404|Pengguna tidak ditemukan")
    }
    
  } catch (error) {
    let errors = error.message || "";
    errors = errors.split('|');
    console.log(errors)
    response.code = errors.length>1?errors[0]:500
    response.message = errors.length>1?errors[1]:errors[0];
    res.send(response.getResponse());
  }
})

router.delete('/', async (req, res) => {
  try {
    const options = {}
    options.where = {
        id_rating : req.body.id_rating
    }

    let data = await Rating.findOne(options)
    if (data) {
      let rating = await Rating.destroy(options)
      response.code = 200;
      response.message = "Rating berhasil dihapus";
      response.data = rating;
      res.send(response.getResponse());
    } else {
      throw new Error("404|Rating tidak ditemukan")
    }
  } catch (error) {
    let errors = error.message || "";
    errors = errors.split('|');
    console.log(errors)
    response.code = errors.length>1?errors[0]:500
    response.message = errors.length>1?errors[1]:errors[0];
    res.send(response.getResponse());
  }
})


// const router = require("express").Router();
// const Rating = require("../models/old/RatingWisataModel");
// const response = require("../core/response");
// const routes = require("../routers");
// const crypto = require("crypto");
// const { route } = require("./userController");
// const User = require("../models/UserModel");
// const Wisata = require("../models/TempatwisataModel");
// const Sequelize = require("sequelize");

// Rating.belongsTo(Wisata,{foreignKey:'id_wisata'});

// router.get("/", (req, res) => {
//   let { search } = req.query; //sama dengan let search = req.query.search;

//   const options = {
//     include: [
//     {
//       model: User,
//     },
//     {
//       model: Wisata,
//     },
//     ],
//   };
//   //cek jika ada query search
//   if (search) {
//     let wheres = [];
//     wheres.push(
//     {
//       id_wisata: Sequelize.where(
//         Sequelize.fn("lower", Sequelize.col("id_wisata")),
//         "LIKE",
//         "%" + search.toLowerCase() + "%"
//         ),
//     },
//     {
//       id_pengguna: Sequelize.where(
//         Sequelize.fn("lower", Sequelize.col("id_pengguna")),
//         "LIKE",
//         "%" + search.toLowerCase() + "%"
//         ),
//     },
//     {
//       rating: Sequelize.where(
//         Sequelize.fn("lower", Sequelize.col("rating")),
//         "LIKE",
//         "%" + search.toLowerCase() + "%"
//         ),
//     },
//     {
//       keterangan: Sequelize.where(
//         Sequelize.fn("lower", Sequelize.col("keterangan")),
//         "LIKE",
//         "%" + search.toLowerCase() + "%"
//         ),
//     }
//     );

//     options["where"] = {
//       [Sequelize.Op.or]: wheres,
//     };
//   }
//   Rating.findAll(options)
//   .then((data) => {
//     response.code = 200;
//     response.message = "Sukses";
//     response.data = data;
//     res.send(response.getResponse());
//   })
//   .catch((err) => {
//     response.code = 110;
//     response.message = err.message;
//     res.send(response.getResponse());
//   });
// });

// router.get('/:id',(req,res)=>{
//   Rating.findOne({
//     where:{id:req.params.id},
//     include : [{
//       model: User,
//     },
//     {
//       model: Wisata,
//     },]
//   }).then((data)=>{
//     response.code = 200;
//     response.message = "Sukses";
//     response.data = data;
//     res.send(response.getResponse());
//   }).catch((err)=>{
//    response.code = 110;
//    response.message = err.message;
//    res.send(response.getResponse());
//  })
// })

// router.post("/search", (req, res) => {
//   let Model = Rating.rawAttributes;

//   let input = {};
// });

// router.post("/insert", (req, res) => {
//   let Model = Rating.rawAttributes;

//   let input = {};
//   Object.values(Model).forEach((val) => {
//     if (val.field != "id") {
//       if (req.body[val.field] != null) {
//         input[val.fieldName] = req.body[val.field];
//       } else {
//         input[val.fieldName] = null;
//       }
//     }
//   });

//   Rating.create(input)
//   .then((respon) => {
//     response.code = 200;
//     response.message = "Input Data Berhasil!";
//     response.data = input;
//     res.send(response.getResponse());
//   })
//   .catch((err) => {
//     response.code = 110;
//     response.message = err.message;
//     res.send(response.getResponse());
//   });
// });

// router.put("/update/:id", (req, res) => {
//   let Model = Rating.rawAttributes;
//   let input = {};
//   Object.values(Model).forEach((val) => {
//     input[val.fieldName] = req.body[val.field];
//   });

//   try {
//     const data = Rating.update(input, {
//       where: {
//         [Rating.primaryKeyAttribute]: req.params.id,
//       },
//     });
//     input["id"] = req.params.id;
//     response.code = 200;
//     response.message = "Ubah Data Berhasil";
//     response.data = input;
//     res.send(response.getResponse());
//   } catch (error) {
//     response.code = 110;
//     response.message = err.message;
//     res.send(response.getResponse());
//   }
// });

// router.delete("/delete", (req, res) => {
//   const id = req.body.id;
//   Rating.destroy({ where: { [Rating.primaryKeyAttribute]: id } })
//   .then((data) => {
//     response.code = 200;
//     response.message = "Delete Data Berhasil";
//     response.data = data;
//     res.send(response.getResponse());
//   })
//   .catch((err) => {
//     response.code = 110;
//     response.message = err.message;
//     res.send(response.getResponse());
//   });
// });

module.exports = router;
