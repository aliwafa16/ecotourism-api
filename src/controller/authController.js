const router = require("express").Router();
const response = require("../core/response");
const crypto = require("crypto");
const Pengguna = require("../models/Pengguna_Model");
const {
  runValidation,
  validationLogin,
  validationRegistrasi,
} = require("../validation/index");
const jsonwebtoken = require("jsonwebtoken");
const { kirimEmail } = require("../helpers/index");
require("dotenv").config();

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
      if (pengguna.status == 1) {
        const new_pw = crypto
          .createHash("md5")
          .update(password_pengguna)
          .digest("hex");
        if (new_pw == pengguna.password) {
          if (pengguna.role_id != 3) {
            const data = {
              id_pengguna: pengguna.id_pengguna,
            };
            const token = await jsonwebtoken.sign(
              data,
              process.env.ECOTOURISM_TOKEN
            );
            let access_token = await Pengguna.update(
              { access_token: token },
              { where: { email: email_pengguna } }
            );
            pengguna.dataValues.token = token;
            response.code = 200;
            response.message = "Berhasil login";
            response.data = pengguna;
            res.send(response.getResponse());
          } else {
            throw new Error("404|Email tidak ditemukan");
          }
        } else {
          throw new Error("403|Email atau kata sandi salah");
        }
      } else {
        throw new Error("403|Email belum diverifikasi");
      }
    } else {
      throw new Error("404|Email tidak ditemukan");
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

router.post("/sign-in", validationLogin, runValidation, async (req, res) => {
  try {
    const password_pengguna = req.body.password;
    const email_pengguna = req.body.email;

    const pengguna = await Pengguna.findOne({
      where: {
        email: email_pengguna,
      },
    });

    if (pengguna) {
      if (pengguna.status == 1) {
        const new_pw = crypto.createHash("md5").update(password_pengguna).digest("hex");
          if (new_pw == pengguna.password) {
              if (pengguna.role_id == 3 ) {
                  const data = {
                    id_pengguna : pengguna.id_pengguna
                  }
                  const token = await jsonwebtoken.sign(data, process.env.ECOTOURISM_TOKEN)
                  pengguna.dataValues.token = token
                  response.code = 200;
                  response.message = "Berhasil login";
                  response.data = pengguna;
                  res.send(response.getResponse());
              } else {
                throw new Error('404|Email tidak ditemukan')
              }
          } else {
            throw new Error('403|Email atau kata sandi salah')
          }
      } else {
        throw new Error('403|Email belum diverifikasi')
      }
    } else {
      throw new Error('404|Email tidak ditemukan')
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

router.post('/registration', validationRegistrasi, runValidation ,async (req, res) => {
  try {
      const { pengelola, wisatawan } = req.body
      const inputRegistrasi = {}
      const options = {}

      if (pengelola) {
        inputRegistrasi.role_id = 2
        options['where'] = {
          role_id: 2,
          email : req.body.email
        }
      } else if (wisatawan) {
        inputRegistrasi.role_id = 3
        options['where'] = {
          role_id: 3,
          email : req.body.email
        }
      }

      let email = await Pengguna.findOne(options)

    if (!email) {

      const data = {
        email: req.body.email
      };
      const token = await jsonwebtoken.sign(data, process.env.ECOTOURISM_TOKEN)

      inputRegistrasi.username = req.body.username
      inputRegistrasi.email = req.body.email
      inputRegistrasi.status = 0,
      inputRegistrasi.password = crypto.createHash("md5").update(req.body.password).digest("hex")
      inputRegistrasi.link_verifikasi = token
      inputRegistrasi.no_telp = req.body.no_telp

      const templateEMail = {
        from: 'Team Ecotourism',
        to: inputRegistrasi.email,
        subject: 'Aktivasi Email',
        html : `<p>silahkan klik link dibawah untuk verifikasi akun pengelola wisata</p> <p>${process.env.CLIENT_URL}Auth/aktivasi/${token}</p>`
      }
      kirimEmail(templateEMail)
      

      const registasi = await Pengguna.create(inputRegistrasi)
      response.code = 200;
      response.message = "Registrasi berhasil";
      response.data = inputRegistrasi;
      res.send(response.getResponse());
    
        
      } else {
       throw new Error('403|Email sudah digunakan')
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

router.post('/verifikasi', async(req,res)=>{
  let token = req.body.token
  try {
    const pengguna = await Pengguna.findOne({
      where:{
        link_verifikasi : token
      }
    })
  
    if(pengguna){
      if(pengguna.status == 0){
        const verifikasi = await Pengguna.update({status:1},{
          where:{
            link_verifikasi:token
          }
        })
        response.code = 200;
        response.message = "Verifikasi berhasil";
        response.data = pengguna;
        res.send(response.getResponse());
      }else{
        throw new Error('100|Email sudah diverifikasi')
      }
    }else{
      throw new Error('403|Token verifikasi salah')
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

router.post('/cekEmail', async (req, res) => {
  try {
  
  const email =  await Pengguna.findOne({
    where: {
      email:req.body.email
    }
  })

    if (email) {
      throw new Error('403|Email sudah digunakan')
    } else {
      response.code = 200;
      response.message = "Email belum terdaftar";
      response.data = {};
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

router.post('/lupa_password', async (req, res) => {
  try {
  const email = req.body.email;
  let pengguna = await Pengguna.findOne({
    where: {
      email:email
    }
  })
    if (pengguna) {
      const data = {
        id_pengguna: pengguna.id_pengguna
      };
      const reset_password = await jsonwebtoken.sign(data, process.env.ECOTOURISM_TOKEN)
      Pengguna.update({ reset_password:reset_password }, { where: { email } })
        const templateEMail = {
        from: 'Team Ecotourism',
        to: email,
        subject: 'Kode reset password',
        html : `<p>silahkan klik link dibawah untuk mengubah kata sandi akun</p> <p>${process.env.CLIENT_URL}Auth/reset_password/${reset_password}</p>`
      }
        kirimEmail(templateEMail)
        response.code = 200;
        response.message = "Kode reset kata sandi berhasil dikirim !";
        response.data = {};
        res.send(response.getResponse());
    } else {
      throw new Error('404|Email pengguna tidak ditemukan !')
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

router.post('/reset_password', async (req, res) => {
  let { email, reset_password, password } = req.body;
  try {
    let pengguna = await Pengguna.findOne({ where: { reset_password:reset_password } });
    if (pengguna) {
      let new_password = crypto.createHash("md5").update(password).digest("hex")
      let update = await Pengguna.update({ password: new_password }, { where: { reset_password: reset_password } })
       response.code = 200;
        response.message = "Reset kata sandi berhasil";
        response.data = update;
        res.send(response.getResponse());
    } else {
      throw new Error('404|Email tidak ditemukan')
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


// router.post('/activation/:id', async (req, res) => {
//   let id = req.params.id
//   try {
//     const pengguna = await Pengguna.update({ status: 1 }, {
//       where: {
//         id_pengguna:id
//       }
//     })
//     response.code = 200;
//     response.message = "Berhasil diaktivasi";
//     response.data = pengguna;
//     res.send(response.getResponse());
//   } catch (error) {
//     response.code = 110;
//     response.message = err.message;
//     res.send(response.getResponse());
//   }
// })




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
