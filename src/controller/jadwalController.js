const router = require("express").Router();
const response = require("../core/response");
const Jadwal = require("../models/Jadwal_Model");

router.get('/', async (req, res) => {
  try {
    const jadwal = await Jadwal.findAll();
    if (jadwal) {
      response.code = 200;
      response.message = "Sukses";
      response.data = jadwal;
      res.send(response.getResponse());
    } else {
      throw new Error('404|Jadwal tidak ditemukan')
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
  let modelAttr = Jadwal.rawAttributes;
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
    const jadwal = await Jadwal.findAll(options);
    if (jadwal.length != 0) {
      response.code = 200;
      response.message = "Sukses";
      response.data = jadwal;
      res.send(response.getResponse());
    } else {
      throw new Error('404|Jadwal tidak ditemukan')
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
        response.message = "Jadwal berhasil ditambahkan";
        response.data = inputJadwal;
        res.send(response.getResponse());
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
        const jadwal = await Jadwal.findOne({
            where: {
                id_jadwal:req.params.id
            }
        })

      if (jadwal) {
        response.code = 200;
        response.message = "Sukses";
        response.data = jadwal;
        res.send(response.getResponse());
      } else {
        throw new Error('404|Jadwal tidak ditemukan')
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

      const jadwal = await Jadwal.update(inputJadwal, options);
      response.code = 200;
      response.message = "Jadwal berhasil diubah";
      response.data = inputJadwal;
      res.send(response.getResponse());

    } else {
      throw new Error('404|Jadwal tidak ditemukan')
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
    id_jadwal: req.body.id_jadwal,
  };

  try {
    let data = await Jadwal.findOne(options)
    if (data) {
      const jadwal = await Jadwal.destroy(options);
      response.code = 200;
      response.message = "Jadwal berhasil dihapus";
      response.data = jadwal;
      res.send(response.getResponse());
    } else {
      throw new Error('404|Jadwal tidak ditemukan')
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