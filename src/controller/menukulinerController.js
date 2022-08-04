const router = require("express").Router();
const response = require("../core/response");
const Menu_Kuliner = require('../models/MenuKuliner_Model');

router.get('/', async (req, res) => {
  try {
    const menu_kuliner = await Menu_Kuliner.findAll();
    if (menu_kuliner) {
    response.code = 200;
    response.message = "Sukses";
    response.data = menu_kuliner;
    res.send(response.getResponse());
    } else {
       throw new Error("404|Menu kuliner tidak ditemukan");
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

router.get("/find", async (req, res) => {
  const options = {}
  const find = req.query;
  let modelAttr = Menu_Kuliner.rawAttributes;
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
    const menu_kuliner = await Menu_Kuliner.findAll(options);
    if (menu_kuliner.length != 0) {
      response.code = 200;
      response.message = "Sukses";
      response.data = menu_kuliner;
      res.send(response.getResponse());
    } else {
       throw new Error("404|Menu kuliner tidak ditemukan");
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

router.get('/:id', async (req, res) => {
    try {
        const menu_kuliner = await Menu_Kuliner.findOne({
            where: {
                id_menu_kuliner:req.params.id
            }
        })

      if (menu_kuliner) {
        response.code = 200;
        response.message = "Sukses";
        response.data = menu_kuliner;
        res.send(response.getResponse());
      } else {
        throw new Error("404|Menu kuliner tidak ditemukan");
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
  const modelAttr = Menu_Kuliner.rawAttributes;
    const inputMenuKuliner = {};

    Object.values(modelAttr).forEach((val) => {
        if (val.field != "id_menu_kuliner") {
        if (req.body[val.field] != "") {
            inputMenuKuliner[val.fieldName] = req.body[val.field];
        } else {
            inputMenuKuliner[val.fieldName] = null;
        }
        }
    });


    try {
        const tiket = await Menu_Kuliner.create(inputMenuKuliner)
        response.code = 200;
        response.message = "Menu kuliner berhasil ditambahkan";
        response.data = inputMenuKuliner;
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
        id_menu_kuliner: req.body.id_menu_kuliner,
    };
    
    try {
    const data = await Menu_Kuliner.findOne(options);
    if (data) {
      const modelAttr = Menu_Kuliner.rawAttributes;
      const inputMenuKuliner = {};
      inputMenuKuliner.id_menu_kuliner = req.body.id_menu_kuliner;
      Object.values(modelAttr).forEach((val) => {
        if (val.field != "id_menu_kuliner") {
          if (req.body[val.field] != "") {
            inputMenuKuliner[val.fieldName] = req.body[val.field];
          } else {
            inputMenuKuliner[val.fieldName] = null;
          }
        }
      });
        const menu_kuliner = await Menu_Kuliner.update(inputMenuKuliner, options);
        response.code = 200;
        response.message = "Menu kuliner berhasil diubah";
        response.data = inputMenuKuliner;
        res.send(response.getResponse());
    } else {
       throw new Error("404|Menu kuliner tidak ditemukan");
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
    id_menu_kuliner: req.body.id_menu_kuliner,
  };

  try {
    let data = await Menu_Kuliner.findOne(options)
    if (data) {
       const menu_kuliner = await Menu_Kuliner.destroy(options);
        response.code = 200;
        response.message = "Menu kuliner berhasil dihapus";
        response.data = menu_kuliner;
        res.send(response.getResponse());
    } else {
      throw new Error("404|Menu kuliner tidak ditemukan");
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

module.exports = router