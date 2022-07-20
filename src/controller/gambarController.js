const router = require("express").Router();
const response = require("../core/response");
const fs = require('fs')

const multer = require('multer');
const path = require('path');
const { diskStorage } = require('multer');

const Gambar = require("../models/Gambar_Model");



const storage = multer.diskStorage({ 
    destination: (req, file, cb) => {
        cb(null, path.join('public/gambarwisata'));
    },
    filename: (req, file, cb) => {
        cb(null, 'pariwisata' + '-' + Date.now() + path.extname(file.originalname))        
    }
});


const fileFilter = (req, file, cb) => {
    if(file.mimetype === 'image/png'|| file.mimetype === 'image/jpeg' || file.mimetype === 'image/jpg' ){
        cb(null, true);
    }else{
        cb(null, false);
    }
}

router.get("/", async (req, res) => {
  const options = {
    attributes: ["id_gambar", "id_pariwisata","gambar","keterangan","tanggal"],
  };
  try {
    const gambar = await Gambar.findAll(options);
    if (gambar) {
      response.code = 200;
      response.message = "Sukses";
      response.data = gambar;
      res.send(response.getResponse());
    } else {
      throw new Error("404|Gambar tidak ditemukan");
    }
  } catch (error) {
    let errors = error.message || "";
    errors = errors.split('|');
    console.log(errors)
    response.code = errors.length>1?errors[0]:500
    response.message = errors.length>1?errors[1]:errors[0];
    res.send(response.getResponse());
  }
});

router.get('/find', async (req, res) => {
  const options = {}
  const find = req.query;
  let modelAttr = Gambar.rawAttributes;
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
    const gambar = await Gambar.findAll(options);
    if (gambar.length != 0) {
      response.code = 200;
      response.message = "Sukses";
      response.data = gambar;
      res.send(response.getResponse());
    } else {
      throw new Error('404|Gambar tidak ditemukan')
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

router.get("/:id", async (req, res) => {
  const options = {
    attributes: [
      "id_gambar",
      "id_pariwisata",
      "gambar",
      "keterangan",
      "tanggal",
    ],
    where: {
      id_gambar: req.params.id,
    },
  };
  try {
    const gambar = await Gambar.findOne(options);
    if (gambar) {
      response.code = 200;
      response.message = "Sukses";
      response.data = gambar;
      res.send(response.getResponse());
    } else {
      throw new Error("101|Data tidak ditemukan");
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

router.post('/', multer({ storage: storage, fileFilter: fileFilter }).single('gambar'), async (req, res) => {
  try {
    if (req.file) {
      const gambar = req.file
      const gambar_pariwisata = req.file.path.split("\\").join('/')
      if (!gambar) {
        throw new Error("110|Gambar kosong")
      } else {
        const modelAttr = Gambar.rawAttributes;
        const inputGambar = {};

          Object.values(modelAttr).forEach((val) => {
            if (val.field != "id_gambar") {
              if (req.body[val.field] != "") {
                inputGambar[val.fieldName] = req.body[val.field];
              } else {
                inputGambar[val.fieldName] = null;
              }
            }
          });
        inputGambar['gambar'] = gambar_pariwisata
        let gambar = await Gambar.create(inputGambar);
        response.code = 200;
        response.message = "Gambar berhasil ditambahkan";
        response.data = gambar;
        res.send(response.getResponse());
      }
    } else {
      throw new Error("403|Format file salah")
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

router.put('/', multer({ storage: storage, fileFilter: fileFilter }).single('gambar'), async (req, res) => {
    const options = {};
    options.where = {
      id_gambar: req.body.id_gambar,
  };
  let gambar_pariwisata = ''

  try {
    let data = await Gambar.findOne(options);
    if (!data) {
      throw new Error('404|Gambar tidak ditemukan')
    } else {
      if (req.file) {
        fs.unlink(data.dataValues.gambar, (errors) => {
          console.log(errors)
        });
        gambar_pariwisata = req.file.path.split("\\").join('/')
      } else {
        gambar_pariwisata = data.dataValues.gambar
      }

        const modelAttr = Gambar.rawAttributes;
        const inputGambar = {};

          Object.values(modelAttr).forEach((val) => {
            if (val.field != "id_gambar") {
              if (req.body[val.field] != "") {
                inputGambar[val.fieldName] = req.body[val.field];
              } else {
                inputGambar[val.fieldName] = null;
              }
            }
          });
        inputGambar['gambar'] = gambar_pariwisata
        let gambar = await Gambar.update(inputGambar, options);
        response.code = 200;
        response.message = "Gambar berhasil diubah";
        response.data = gambar;
        res.send(response.getResponse());
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
    const options = {};
  options.where = {
    id_gambar: req.body.id_gambar,
  };
  try {
    let data = await Gambar.findOne(options);
    if (data) {
      fs.unlink(data.dataValues.gambar, (errors) => {
        console.log(errors)
      });
      const gambar = await Gambar.destroy(options);
      response.code = 200;
      response.message = "Gambar berhasil dihapus";
      response.data = gambar;
      res.send(response.getResponse());
    } else {
      throw new Error("404|Gambar tidak ditemukan");
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

// const response = require("../core/response");
// const routes = require("../routers");
// const crypto = require("crypto");
// const { route } = require("./userController");
// const Wisata = require("../models/TempatwisataModel");
// const Sequelize = require("sequelize");

// GambarWisata.belongsTo(Wisata, {
//   foreignKey: "id_wisata",
// });

// router.get("/", (req, res) => {
//   let { search } = req.query; //sama dengan let search = req.query.search;

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
//         gambar: Sequelize.where(
//           Sequelize.fn("lower", Sequelize.col("gambar")),
//           "LIKE",
//           "%" + search.toLowerCase() + "%"
//         ),
//       }
//     );

//     options["where"] = {
//       [Sequelize.Op.or]: wheres,
//     };
//   }
//   GambarWisata.findAll(options)
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

// router.get("/find", (req, res) => {
//   let modelAttr = GambarWisata.rawAttributes;
//   let wheres = {};
//   console.log(modelAttr);
//   Object.values(modelAttr).forEach((val) => {
//     console.log(req.query[val.field]);
//     if (req.query[val.field] != null) {
//       wheres[val.field] = req.query[val.field];
//     }
//   });
//   GambarWisata.findAll({ where: wheres })
//   .then((data) => {
//     response.code = 200;
//     response.message = "Sukses";
//     response.data = data;
//     res.send(response.getResponse());
//   })
//   .catch((err) => response.error(res, { error: err.message }));
// });

// router.get('/:id',(req, res)=>{
//   GambarWisata.findOne({
//     where: {
//       id:req.params.id
//     },
//     include : [
//       {model:Wisata}
//     ]
//   }).then((data)=>{
//      response.code = 200;
//       response.message = "Sukses";
//       response.data = data;
//       res.send(response.getResponse());
//   }).catch((err)=>{
//     response.code = 110;
//       response.message = err.message;
//       res.send(response.getResponse());
//   })
// })

// router.post("/insert", (req, res) => {
//   let Model = GambarWisata.rawAttributes;

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

//   GambarWisata.create(input)
//     .then((respon) => {
//       response.code = 200;
//       response.message = "Input Data Berhasil!";
//       response.data = input;
//       res.send(response.getResponse());
//     })
//     .catch((err) => {
//       response.code = 110;
//       response.message = err.message;
//       res.send(response.getResponse());
//     });
// });

// router.put("/update/:id", (req, res) => {
//   let Model = GambarWisata.rawAttributes;
//   let input = {};
//   Object.values(Model).forEach((val) => {
//     input[val.fieldName] = req.body[val.field];
//   });

//   try {
//     const data = GambarWisata.update(input, {
//       where: {
//         [GambarWisata.primaryKeyAttribute]: req.params.id,
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
//   GambarWisata.destroy({ where: { [GambarWisata.primaryKeyAttribute]: id } })
//     .then((data) => {
//       response.code = 200;
//       response.message = "Delete Data Berhasil";
//       response.data = data;
//       res.send(response.getResponse());
//     })
//     .catch((err) => {
//       response.code = 110;
//       response.message = err.message;
//       res.send(response.getResponse());
//     });
// });

module.exports = router;
