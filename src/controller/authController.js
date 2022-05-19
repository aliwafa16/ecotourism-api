const router = require("express").Router();
const response = require("../core/response");
const routes = require("../routers");
const crypto = require("crypto");
const Pengguna = require("../models/Pengguna_Model");
const { runValidation, validationLogin } = require('../validation/index');
const jsonwebtoken = require('jsonwebtoken')
require('dotenv').config();



router.post("/", validationLogin, runValidation, async (req, res) => {
  try {
    const password_pengguna = req.body.password;
    const email_pengguna = req.body.email;

    const pengguna = await Pengguna.findOne({
      where: {
        email: email_pengguna,
      },
    });

    if (pengguna) {
      const new_pw = crypto.createHash("md5").update(password_pengguna).digest("hex");
      if (new_pw == pengguna.password) {
        const data = {
          id_pengguna : pengguna.id_pengguna
        }
        const token = await jsonwebtoken.sign(data, process.env.ECOTOURISM_TOKEN)

        pengguna.dataValues.token = token

        response.code = 200;
        response.message = "Berhasil Login";
        response.data = pengguna;
        res.send(response.getResponse());
      } else {
        response.code = 110;
        response.message = "Password Salah";
        res.send(response.getResponse());
      }
    } else {
      response.code = 110;
      response.message = "Email Tidak Ditemukan";
      res.send(response.getResponse());
    }


  } catch (err) {
    response.code = 110;
    response.message = err.message;
    res.send(response.getResponse());
  }
});

// router.post('/sign-in', async (req, res) => {
//   try {
//     const username = req.body.nama
//     let password = req.body.password;
//     const user = await User.findOne({
//       where: {
//         nama: username,
//       },
//     });

//     const new_password = crypto.createHash("md5").update(password).digest("hex");

//     if (user) {
//       if (new_password == user.password) {
//         response.code = 200;
//         response.message = "Berhasil Login";
//         response.data = user;
//         res.send(response.getResponse());
//       } else {
//         response.code = 110;
//         response.message = "Password Salah";
//         res.send(response.getResponse());
//       }
//     } else {
//       response.code = 110;
//       response.message = "Username Tidak Ditemukan";
//       res.send(response.getResponse());
//     }
//   } catch (err) {
//     response.code = 110;
//     response.message = err.message;
//     res.send(response.getResponse());
//   }
// })

// router.post("/register", async (req, res) => {
//   try {
//     const password = req.body.password;
//     const platform = req.body.platform;
//     const nama = req.body.nama;
//     const email_user = req.body.email;
//     const plt = platform.toLowerCase();

//     const hash = crypto.createHash("md5").update(password).digest("hex");

//     const data = {
//       password: hash,
//       email: req.body.email,
//       platform: plt,
//       nama: nama,
//     };

//     let email = await User.findOne({ where: { email: email_user } });

//     if (email == null) {
//       User.create(data)
//         .then((resp) => {
//           response.code = 200;
//           response.message = "registrasi berhasil";
//           response.data = data;
//           res.send(response.getResponse());
//         })
//         .catch((err) => {
//           response.code = 110;
//           response.message = err.message;
//           res.send(response.getResponse());
//         });
//     } else {
//       response.code = 110;
//       response.message = "email sudah digunakan";
//       res.send(response.getResponse());
//     }
//   } catch (err) {
//     response.code = 110;
//     response.message = err.message;
//     res.send(response.getResponse());
//   }
// });
 
module.exports = router;
