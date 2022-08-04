const router = require("express").Router();
const { existsSync} = require('fs')
const multer = require('multer')
const path = require('path');
const Qrcode = require('qrcode')
const response = require("../core/response");
const Item = require("../models/ItemPariwisata_Model")
// const Item = require("../models/old/ItemWisataModel");
// const routes = require("../routers");
// const {existsSync} = require('fs');
// const crypto = require("crypto");
// const ItemWisata = require("../models/old/ItemWisataModel");
// const Wisata = require("../models/TempatwisataModel");

// ItemWisata.belongsTo(Wisata, { foreignKey: "id_wisata" });
const storage = multer.diskStorage({ 
  destination: (req, file, cb) => {
    console.log(req.params.id)
    let id_pariwisata =  req.params.id
    let path = `public/audio/${id_pariwisata}`
    if (!fs.existsSync(path)) {
      fs.mkdirSync(path, {recursive:true})
    }
      cb(null, path);
    },
    filename: (req, file, cb) => {
        cb(null, 'pariwisata' + '-' + Date.now() + path.extname(file.originalname))        
    }
});


const fileFilter = (req, file, cb) => {
    if(file.mimetype === 'audio/mpeg'){
        cb(null, true);
    }else{
        cb(null, false);
    }
}

router.get('/', async (req, res) => {
  const options = {
    attributes: ["id_item_pariwisata", "id_pariwisata","qr_code","audio","deskripsi"],
  };
  try {
    const item = await Item.findAll(options);
    if (item) {
      response.code = 200;
      response.message = "Sukses";
      response.data = item;
      res.send(response.getResponse());
    } else {
      throw new Error("404|Item tidak ditemukan");
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


router.get('/find', async (req, res) => {
  const options = {}
  const find = req.query;
  let modelAttr = Item.rawAttributes;
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
    const item = await Item.findAll(options);
    if (item.length != 0) {
      response.code = 200;
      response.message = "Sukses";
      response.data = item;
      res.send(response.getResponse());
    } else {
      throw new Error('404|Item tidak ditemukan')
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
    const item = await Item.findOne({
      where: {
        id_item_pariwisata:req.params.id
      }
    })

    if (item) {
       response.code = 200;
      response.message = "Sukses";
      // data.audio = {
      //   filepath: `public/audio/${i}/`,
      //   filename: `${data.audio}`,
      // };
        response.data = item;
        res.send(response.getResponse());
    } else {
      throw new Error('404|Item tidak ditemukan')
    }

   
  } catch (error) {
    let errors = error.message || "";
    errors = errors.split('|');
    console.log(errors)
    response.code = errors.length>1?errors[0]:500
    response.message = errors.length>1?errors[1]:errors[0];
    res.send(response.getResponse());
  }
} )




router.post('/:id', multer({ storage: storage, fileFilter: fileFilter }).single('audio'), async (req, res) => {
  try {
    if (req.file) {
      const audio = req.file
      const audio_pariwisata = req.file.path.split("\\").join('/')
      if (!audio) {
        throw new Error("110|File kosong")
      } else {
        const modelAttr = Item.rawAttributes;
        const inputItem = {};

          Object.values(modelAttr).forEach((val) => {
            if (val.field != "id_item_pariwisata") {
              if (req.body[val.field] != "") {
                inputItem[val.fieldName] = req.body[val.field];
              } else {
                inputItem[val.fieldName] = null;
              }
            }
          });
        
        
        let filename = audio_pariwisata.split('/')
        let filepath = filename[0]+'/'+filename[1]+'/'+filename[2]+'/'

        let file_qr = JSON.stringify({ filename: `${filename[3]}`, filepath: `${filepath}`, code: "ecotourismid" }) 

        const qr = await Qrcode.toDataURL(file_qr)

        inputItem['id_pariwisata'] = req.params.id
        inputItem['qr_code'] = qr
        inputItem['audio'] = audio_pariwisata
        console.log(inputItem)
        let item = await Item.create(inputItem);
        response.code = 200;
        response.message = "Item berhasil ditambahkan";
        response.data = inputItem;
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

router.delete('/', async (req, res) => {
   const options = {};
    options.where = {
      id_item_pariwisata: req.body.id_item_pariwisata,
    };
  try {
    let data = await Item.findOne(options)
    if (data) {
      fs.unlink(data.dataValues.audio, (errors) => {
        console.log(errors)
      });
      const item = await Item.destroy(options);
      response.code = 200;
      response.message = "Item berhasil dihapus";
      response.data = item;
      res.send(response.getResponse());
    } else {
      throw new Error("404|Item tidak ditemukan")
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

router.put('/:id', multer({ storage: storage, fileFilter: fileFilter }).single('audio'), async (req, res) => {
   const options = {};
    options.where = {
      id_item_pariwisata: req.body.id_item_pariwisata,
  };
  let audio = ''
  let deskripsi = ''

  try {
    let data = await Item.findOne(options)
    if (data) {
      if (req.file) {
        fs.unlink(data.dataValues.audio, (errors) => {
          console.log(errors)
        });
        audio = req.file.path.split("\\").join('/')
      } else {
        audio = data.dataValues.audio
      }

      const modelAttr = Item.rawAttributes;
      const inputItem = {};

      Object.values(modelAttr).forEach((val) => {
        if (val.field != "id_item_pariwisata") {
          if (req.body[val.field] != "") {
            inputItem[val.fieldName] = req.body[val.field];
          } else {
            inputItem[val.fieldName] = null;
          }
        }
      });

      let filename = audio.split('/')
      let filepath = filename[0]+'/'+filename[1]+'/'+filename[2]+'/'

      let file_qr = JSON.stringify({ filename: `${filename[3]}`, filepath: `${filepath}`, code: "ecotourismid" }) 

      const qr = await Qrcode.toDataURL(file_qr)
        inputItem['id_pariwisata'] = req.params.id
        inputItem['qr_code'] = qr
        inputItem['audio'] = audio
        console.log(inputItem)
        let item = await Item.update(inputItem, options);
        response.code = 200;
        response.message = "Item berhasil diubah";
        response.data = inputItem;
        res.send(response.getResponse());

    } else {
      throw new Error('404|Item tidak ditemukan')
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
//         fasilitas: Sequelize.where(
//           Sequelize.fn("lower", Sequelize.col("deskripsi")),
//           "LIKE",
//           "%" + search.toLowerCase() + "%"
//         ),
//       }
//     );

//     options["where"] = {
//       [Sequelize.Op.or]: wheres,
//     };
//   }
//   ItemWisata.findAll(options)
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
//   Item.findOne({
//     where: {
//       id: req.params.id,
//     },
//     include: {
//       model: Wisata,
//     },
//   })
//     .then((data) => {
//       response.code = 200;
//       response.message = "Sukses";
//       data.audio = {
//         filepath: `public/audio/${data.id}/`,
//         filename: `${data.audio}`,
//       };
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
//   let modelAttr = Item.rawAttributes;
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
//   Item.create(inputs)
//     .then((resp) => {
//       response.code = 200;
//       response.message = "Input data berhasil";
//       response.data = inputs;
//       res.send(response.getResponse());
//     })
//     .catch((err) => {
//       response.code = 110;
//       response.message = err.message;
//       res.render(response.getResponse());
//     });
// });

// router.put("/update/:id", (req, res) => {
//   let modelAttr = Item.rawAttributes;
//   let inputs = {};
//   Object.values(modelAttr).forEach((val) => {
//     if (req.body[val.field] != null) {
//       inputs[val.fieldName] = req.body[val.field];
//     }
//   });

//   try {
//     inputs["id"] = req.params.id;
//     const data = Item.update(inputs, {
//       where: {
//         [Item.primaryKeyAttribute]: req.params.id,
//       },
//     });

//     response.code = 200;
//     response.message = "Update Data Berhasil";
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
//   Item.destroy({
//     where: {
//       [Item.primaryKeyAttribute]: id,
//     },
//   })
//     .then((resp) => {
//       response.code = 200;
//       response.message = "Delete Data Berhasil";
//       response.data = resp;
//       res.send(response.getResponse());
//     })
//     .catch((err) => {
//       response.code = 110;
//       response.message = err.message;
//       res.send(response.getResponse());
//     });
// });

module.exports = router;
