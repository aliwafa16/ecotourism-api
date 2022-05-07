const router = require("express").Router();
const Menu =  require("../models/Menu_Model");
const response = require("../core/response");
const routes = require("../routers");



router.get('/', (req, res) => {
    Menu.findAll().then(data => {
        response.code = 200;
        response.message = "Sukses";
        response.data = data;
        res.send(response.getResponse());
    }).catch(err => {
        response.code = 110;
        response.message = err.message;
         res.send(response.getResponse());
    });
})

router.get('/:id', (req, res) => {
    Menu.findOne({
        where: {
            id_menu : req.params.id
        }
    }).then(data => {
        response.code = 200;
        response.message = "Sukses";
        response.data = data;
        res.send(response.getResponse());
    }).catch(err => {
        response.code = 110;
        response.message = err.message;
         res.send(response.getResponse());
    });
})

module.exports = router