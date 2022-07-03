const router = require("express").Router();
const response = require("../core/response");
const { Op } = require("sequelize");
const Role = require("../models/Role_Model");

router.get("/", async (req, res) => {
  try {
    let role = await Role.findAll();
    if (!role) {
      throw new Error("Data role tidak ada");
    } else {
      response.code = 200;
      response.message = "Sukses";
      response.data = role;
      res.send(response.getResponse());
    }
  } catch (error) {
    response.code = 110;
    response.message = error.message;
    res.send(response.getResponse());
  }
});

router.get("/:id", async (req, res) => {
  const options = {
    where: {
      id_role: req.params.id,
    },
  };
  try {
    let role = await Role.findOne(options);
    if (role) {
      response.code = 200;
      response.message = "Sukses";
      response.data = role;
      res.send(response.getResponse());
    } else {
      throw new Error("Data role tidak ditemukan");
    }
  } catch (error) {
    response.code = 110;
    response.message = error.message;
    res.send(response.getResponse());
  }
});

router.delete("/", async (req, res) => {
  const options = {
    where: {
      id_role: req.body.id_role,
    },
  };

  try {
    let data = await Role.findOne(options);
    if (data) {
      let role = await Role.destroy(options);
      response.code = 200;
      response.message = "Data role berhasil dihapus";
      response.data = role;
      res.send(response.getResponse());
    } else {
      throw new Error("Data role tidak ditemukan");
    }
  } catch (error) {
    response.code = 110;
    response.message = error.message;
    res.send(response.getResponse());
  }
});

router.put("/", async (req, res) => {
  const options = { where: { id_role: req.body.id_role } };
  try {
    let data = await Role.findOne(options);
    if (data) {
      const modelAttr = Role.rawAttributes;
      const inputRole = {};
      inputRole.id_role = req.body.id_role;
      Object.values(modelAttr).forEach((val) => {
        if (val.field != "id_role") {
          if (req.body[val.field] != "") {
            inputRole[val.fieldName] = req.body[val.field];
          } else {
            inputRole[val.fieldName] = null;
          }
        }
      });
      let check_data = await Role.count({
        attributes: ["role"],
        where: {
          role: inputRole.role,
          id_role: {
            [Op.not]: inputRole.id_role,
          },
        },
      });

      if (check_data) {
        throw new Error("Data role sudah ada");
      } else {
        let role = await Role.update(inputRole, options);
        response.code = 200;
        response.message = "Ubah data role berhasil";
        response.data = inputRole;
        res.send(response.getResponse());
      }
    } else {
      throw new Error("Data role tidak ditemukan");
    }
  } catch (error) {
    response.code = 110;
    response.message = error.message;
    res.send(response.getResponse());
  }
});

module.exports = router;
