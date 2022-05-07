const router = require("express").Router();
const Role =  require("../models/Role_Model");
const response = require("../core/response");
const routes = require("../routers");

router.get('/', (req, res) => {
    Role.findAll().then(data => {
        response.code = 200;
        response.message = "Sukses";
        response.data = data;
        res.send(response.getResponse());

    }).catch(err => {
        response.code = 110;
        response.message = err.message;
         res.send(response.getResponse());
    });
});

router.get('/:id',(req,res)=>{
    Role.findOne({
        where:{id_role:req.params.id}
    }).then((data)=>{
        response.code = 200;
        response.message = "Sukses";
        response.data = data;
        res.send(response.getResponse());

    }).catch((err)=>{
          response.code = 110;
        response.message = err.message;
         res.send(response.getResponse());
    })
})

module.exports = router