const router = require('express').Router();
const Jadwal = require ('../models/old/JadwalWisataKulinerModel');
const response = require('../core/response');
const routes = require('../routers');
const { Router } = require('express');
const Wisata = require('../models/TempatwisataModel');

Jadwal.belongsTo(Wisata,{foreignKey:'id_wisata'})

router.get("/", (req, res) => {
  let { search } = req.query; //sama dengan let search = req.query.search;

  const options = {
    include: [
      {
        model: Wisata,
      },
    ],
  };
  //cek jika ada query search
  if (search) {
    let wheres = [];
    wheres.push(
      {
        id_wisata: Sequelize.where(
          Sequelize.fn("lower", Sequelize.col("id_wisata")),
          "LIKE",
          "%" + search.toLowerCase() + "%"
        ),
      },
      {
        fasilitas: Sequelize.where(
          Sequelize.fn("lower", Sequelize.col("jadwal")),
          "LIKE",
          "%" + search.toLowerCase() + "%"
        ),
      }
    );

    options["where"] = {
      [Sequelize.Op.or]: wheres,
    };
  }
  Jadwal.findAll(options)
    .then((data) => {
      response.code = 200;
      response.message = "Sukses";
      response.data = data;
      res.send(response.getResponse());
    })
    .catch((err) => {
      response.code = 110;
      response.message = err.message;
      res.send(response.getResponse());
    });
});

router.get('/:id', (req,res)=>{
    Jadwal.findOne({
        where:{
            id:req.params.id
        },
        include : [
            {model:Wisata}
        ]
    }).then(data=>{
        response.code=200;
        response.message = "Sukses";
        response.data = data;
        res.send(response.getResponse())
    }).catch(err=>{
        response.code = 110;
        response.message = err.message;
        res.send(response.getResponse())
    })
})


router.post('/insert',(req,res)=>{
    let modelAttr = Jadwal.rawAttributes;
    console.log(req.body);
    let inputs = {};
    Object.values(modelAttr).forEach((val)=>{
        console.log(val.field);
        if(val.field != 'id'){
            if(req.body[val.field] != null){
                inputs[val.fieldName] = req.body[val.field];
            }else{
                inputs[val.fieldName] = null;
            }
        }
    })

    console.log(inputs);
    Jadwal.create(inputs).then(resp => {
        response.code = 200;
        response.message = "Input data berhasil";
        response.data = inputs;
        res.send(response.getResponse());
    }).catch((err)=>{
        response.code = 110;
        response.message = err.message;
        res.send(response.getResponse())
    })
})

module.exports = router;