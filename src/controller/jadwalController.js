const router = require("express").Router();
const response = require("../core/response");
const Jadwal = require("../models/Jadwal_Model");

router.get('/', async (req, res) => {
  try {
    const jadwal = await Jadwal.findAll();
    response.code = 200;
    response.message = "Sukses";
    response.data = jadwal;
    res.send(response.getResponse());
  } catch (error) {
    response.code = 110;
    response.message = error.message;
    res.send(response.getResponse());
  }
})

router.post('/', async (req, res) => {
    const modelAttr = Jadwal.rawAttributes;
    const inputJadwal = {};

    Object.values(modelAttr).forEach((val) => {
        if (val.field != "id_jadwal") {
        if (req.body[val.field] != "") {
            inputJadwal[val.fieldName] = req.body[val.field];
        } else {
            inputJadwal[val.fieldName] = null;
        }
        }
    });


    try {
        const jadwal = await Jadwal.create(inputJadwal)
        response.code = 200;
        response.message = "Sukses";
        response.data = inputJadwal;
        res.send(response.getResponse());
    } catch (error) {
        response.code = 110;
        response.message = error.message;
        res.send(response.getResponse());
    }
})

router.get('/:id', async (req, res) => {
    try {
        const jadwal = await Jadwal.findOne({
            where: {
                id_jadwal:req.params.id
            }
        })

        response.code = 200;
        response.message = "Sukses";
        response.data = jadwal;
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
        id_jadwal: req.body.id_jadwal,
    };
    
      try {
    const data = await Jadwal.findOne(options);
    if (data) {
      const modelAttr = Jadwal.rawAttributes;
      const inputJadwal = {};
      inputJadwal.id_jadwal = req.body.id_jadwal;
      Object.values(modelAttr).forEach((val) => {
        if (val.field != "id_jadwal") {
          if (req.body[val.field] != "") {
            inputJadwal[val.fieldName] = req.body[val.field];
          } else {
            inputJadwal[val.fieldName] = null;
          }
        }
      });
      try {
        const jadwal = await Jadwal.update(inputJadwal, options);
        response.code = 200;
        response.message = "Sukses";
        response.data = inputJadwal;
        res.send(response.getResponse());
      } catch (error) {
        response.code = 110;
        response.message = error.message;
        res.send(response.getResponse());
      }
    } else {
      response.code = 110;
      response.message = "Data jadwal tidak ditemukan";
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
    id_jadwal: req.body.id_jadwal,
  };

  try {
    const jadwal = await Jadwal.destroy(options);
    response.code = 200;
    response.message = "Data jadwal berhasil dihapus";
    response.data = jadwal;
    res.send(response.getResponse());
  } catch (error) {
    response.code = 110;
    response.message = error.message;
    res.send(response.getResponse());
  }
})

module.exports = router