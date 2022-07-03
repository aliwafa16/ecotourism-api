const router = require("express").Router();
const response = require("../core/response");
const {Op} = require('sequelize')
const crypto = require("crypto");
const {runValidation, validationPengguna} = require('../validation/index');


const Pengguna = require('../models/Pengguna_Model');
const Role = require('../models/Role_Model');


Pengguna.belongsTo(Role,{as:'role', foreignKey:'role_id'});

router.get('/', async(req,res)=>{
    const options = {
        include:[
            {
                model:Role,
                as:'role',
                attributes : ['role']
            }
        ]
    }

    try {
        const pengguna = await Pengguna.findAll(options)
        response.code = 200;
        response.message = "Sukses";
        response.data = pengguna;
        res.send(response.getResponse());
    } catch (error) {
        response.code = 110;
        response.message = error.message;
        res.send(response.getResponse());
    }
})


router.get("/search", async (req, res) => {
  let search = req.query;
  const options = {
    include: [
      {
        model: Role,
        as: "role",
        attributes: ["role"],
      },
    ],
  };

  options["where"] = {
    [Op.or]: [
      {
        username: {
          [Op.like]: `%${search.username}%`,
        },
      },
      {
        email: {
          [Op.like]: `%${search.email}%`,
        },
      },

      {
        status: {
          [Op.like]: `%${search.status}%`,
        },
      },
      {
        "$role.role$": {
          [Op.like]: `%${search.role}%`,
        },
      },
    ],
  };

  try {
    const pengguna = await Pengguna.findAll(options);
    if (pengguna.length != 0) {
      response.code = 200;
      response.message = "Sukses";
      response.data = pengguna;
      res.send(response.getResponse());
    } else {
      throw new Error("Data pengguna tidak ditemukan");
    }
  } catch (error) {
    response.code = 110;
    response.message = error.message;
    res.send(response.getResponse());
  }
});

router.get("/filter", async (req, res) => {
  const filter = req.query;
  const options = {
    include: [
      {
        model: Role,
        as: "role",
        attributes: ["role"],
      },
    ],
  };

  options["where"] = {
    ...options.where,
    [Op.and]: [],
  };

  if (filter.role_id) {
    options.where[Op.and].push({
      role_id: filter.role_id,
    });
  }

  if (filter.status) {
    options.where[Op.and].push({
      status: filter.status,
    });
  }

  try {
    const pengguna = await Pengguna.findAll(options);
    if (pengguna.length != 0) {
      response.code = 200;
      response.message = "Sukses";
      response.data = pengguna;
      res.send(response.getResponse());
    } else {
      throw new Error("Data pengguna tidak ditemukan");
    }
  } catch (error) {
    response.code = 110;
    response.message = error.message;
    res.send(response.getResponse());
  }
});

router.get("/find", async (req, res) => {
  const options = {
    include: [
      {
        model: Role,
        as: "role",
        attributes: ["role"],
      },
    ],
  };

  const find = req.query;
  let modelAttr = Pengguna.rawAttributes;
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
    const pengguna = await Pengguna.findAll(options);
    if (pengguna.length != 0) {
      response.code = 200;
      response.message = "Sukses";
      response.data = pengguna;
      res.send(response.getResponse());
    } else {
      throw new Error("Data pengguna tidak ditemukan");
    }
  } catch (error) {
    response.code = 110;
    response.message = error.message;
    res.send(response.getResponse());
  }
});

router.get("/:id", async (req, res) => {
  const options = {
    include: [
      {
        model: Role,
        as: "role",
        attributes: ["role"],
      },
    ],
  };
  options["where"] = {
    id_pengguna: req.params.id,
  };

  try {
    const pengguna = await Pengguna.findOne(options);
    if (pengguna) {
      response.code = 200;
      response.message = "Sukses";
      response.data = pengguna;
      res.send(response.getResponse());
    } else {
      throw new Error("Data pengguna tidak ditemukan");
    }
  } catch (error) {
    response.code = 110;
    response.message = error.message;
    res.send(response.getResponse());
  }
});

router.post("/", validationPengguna, runValidation, async (req, res) => {
  const modelAttr = Pengguna.rawAttributes;
  const inputPengguna = {};

  try {
    let data = await Pengguna.findOne({ where: { email: req.body.email } });
    if (!data) {
      Object.values(modelAttr).forEach((val) => {
        if (val.field != "id_pengguna") {
          if (req.body[val.field] != "") {
            inputPengguna[val.fieldName] = req.body[val.field];
          } else {
            inputPengguna[val.fieldName] = null;
          }
        }
      });
      inputPengguna.password = crypto
        .createHash("md5")
        .update(req.body.password)
        .digest("hex");
      inputPengguna.status = 1;
      const pengguna = await Pengguna.create(inputPengguna);
      response.code = 200;
      response.message = "Tambah data pengguna berhasil";
      response.data = inputPengguna;
      res.send(response.getResponse());
    } else {
      throw new Error("Email sudah digunakan");
    }
  } catch (error) {
    response.code = 110;
    response.message = error.message;
    res.send(response.getResponse());
  }
});

router.put("/", validationPengguna, runValidation, async (req, res) => {
  const options = {};
  options.where = {
    id_pengguna: req.body.id_pengguna,
  };

  try {
    let data = await Pengguna.findOne(options);
    if (data) {
      const modelAttr = Pengguna.rawAttributes;
      const inputPengguna = {};
      inputPengguna.id_pengguna = req.body.id_pengguna;
      Object.values(modelAttr).forEach((val) => {
        if (val.field != "id_pengguna") {
          if (req.body[val.field] != "") {
            inputPengguna[val.fieldName] = req.body[val.field];
          } else {
            inputPengguna[val.fieldName] = null;
          }
        }
      });

      let check_data = await Pengguna.count({
        attributes: ["email"],
        where: {
          email: inputPengguna.email,
          id_pengguna: {
            [Op.not]: inputPengguna.id_pengguna,
          },
        },
      });

      if (check_data) {
        throw new Error("Data pengguna sudah ada");
      } else {
        const pengguna = await Pengguna.update(inputPengguna, options);
        response.code = 200;
        response.message = "Ubah data pengguna berhasil";
        response.data = inputPengguna;
        res.send(response.getResponse());
      }
    } else {
      throw new Error("Data pengguna tidak ditemukan");
    }
  } catch (error) {
    response.code = 110;
    response.message = error.message;
    res.send(response.getResponse());
  }
});

router.put("/password", async (req, res) => {
  const options = {};
  options.where = {
    id_pengguna: req.body.id_pengguna,
  };

  const data = {};
  data.password = crypto
    .createHash("md5")
    .update(req.body.password)
    .digest("hex");

  try {
    const pengguna = await Pengguna.update(data, options);
    response.code = 200;
    response.message = "Ubah  kata sandi pengguna berhasil";
    response.data = data;
    res.send(response.getResponse());
  } catch (error) {
    response.code = 110;
    response.message = error.message;
    res.send(response.getResponse());
  }
});

router.delete("/", async (req, res) => {
  const options = {};
  options.where = {
    id_pengguna: req.body.id_pengguna,
  };

  try {
    let data = await Pengguna.findOne(options);
    if (data) {
      const pengguna = await Pengguna.destroy(options);
      response.code = 200;
      response.message = "Data pengguna berhasil dihapus";
      response.data = pengguna;
      res.send(response.getResponse());
    } else {
      throw new Error("Data pengguna tidak ditemukan");
    }
  } catch (error) {
    response.code = 110;
    response.message = error.message;
    res.send(response.getResponse());
  }
});


module.exports = router