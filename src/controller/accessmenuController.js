const router = require("express").Router();
const Menu = require("../models/Menu_Model");
const Access = require('../models/Access_Model');
const Role = require('../models/Role_Model');
const response = require("../core/response");
const routes = require("../routers");

Menu.hasOne(Access, {foreignKey:'id_menu', sourceKey: 'id_menu'});

router.get('/:id_role', (req, res) => {
    let role_id = req.params.id_role
    Menu.findAll({
        include: [{
            model: Access, where: {
            id_role:role_id
        }}]
    }).then(data => {
        response.code = 200;
        response.message = "Sukses";
        response.data = data;
        res.send(response.getResponse());
    }).catch(err => {
        response.code = 110;
        response.message = err.message;
         res.send(response.getResponse());
    })
})

module.exports = router