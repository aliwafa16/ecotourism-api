const router = require("express").Router();
const response = require("../core/response");
const Menu_Kuliner = require('../models/MenuKuliner_Model');

router.get('/', async (req, res) => {
  try {
    const menu_kuliner = await Menu_Kuliner.findAll();
    response.code = 200;
    response.message = "Sukses";
    response.data = menu_kuliner;
    res.send(response.getResponse());
  } catch (error) {
    response.code = 110;
    response.message = error.message;
    res.send(response.getResponse());
  }
})

router.get('/:id', async (req, res) => {
    try {
        const menu_kuliner = await Menu_Kuliner.findOne({
            where: {
                id_menu_kuliner:req.params.id
            }
        })

        response.code = 200;
        response.message = "Sukses";
        response.data = menu_kuliner;
        res.send(response.getResponse());

    } catch (error) {
        response.code = 110;
        response.message = error.message;
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
        response.message = "Sukses";
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
      try {
        const tiket = await Menu_Kuliner.update(inputMenuKuliner, options);
        response.code = 200;
        response.message = "Sukses";
        response.data = inputMenuKuliner;
        res.send(response.getResponse());
      } catch (error) {
        response.code = 110;
        response.message = error.message;
        res.send(response.getResponse());
      }
    } else {
      response.code = 110;
      response.message = "Data menu tidak ditemukan";
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
    id_menu_kuliner: req.body.id_menu_kuliner,
  };

  try {
    const menu_kuliner = await Menu_Kuliner.destroy(options);
    response.code = 200;
    response.message = "Data menu kuliner berhasil dihapus";
    response.data = menu_kuliner;
    res.send(response.getResponse());
  } catch (error) {
    response.code = 110;
    response.message = error.message;
    res.send(response.getResponse());
  }
})

module.exports = router