const router = require("express").Router();
const User =  require("../models/old/UserModel");
const response = require("../core/response");
const routes = require("../routers");
const crypto = require("crypto");

router.get('/', (req, res) => {
    User.findAll().then(data => {
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

router.post('/:id',(req,res)=>{
    User.findOne({
        where:{id:req.params.id}
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

router.post('/insert', (req, res) => {
    let modelAttr = User.rawAttributes;
    console.log(req.body);
    let inputs = {};
    Object.values(modelAttr).forEach((val) => {
        console.log(val.field);
        if (val.field !='id') {
            if (req.body[val.field] != null) {
                inputs[val.fieldName] = req.body[val.field];
            } else {
                inputs[val.fieldName] = null;
            }
        }
        
    });

    console.log(inputs)
    inputs.password = crypto.createHash('md5').update(inputs.password).digest('hex');
    // delete inputs['id'];
    User.create(inputs).then(resp => {
        response.code = 200;
        response.message = "Input Data Berhasil!";
        response.data = inputs;
        res.send(response.getResponse());
    }).catch((err) => {
        response.code = 110;
        response.message = err.message;
         res.send(response.getResponse());
    });
});

router.put('/update/:id', (req, res) => {
    // console.log(req.body);
    let modelAttr = User.rawAttributes;
    let inputs = {};
    Object.values(modelAttr).forEach((val) => {
        if (req.body[val.field] != null) {
            if (val.field == 'password') {
                inputs[val.fieldName] = crypto.createHash('md5').update(val.fieldName).digest('hex');
            }
            else {
                inputs[val.fieldName] = req.body[val.field];
            }
        }
    });

    try {
        const data = User.update(inputs, {
            where: {
                [User.primaryKeyAttribute]: req.params.id
            }
        })
        inputs['id'] = req.params.id;
        response.code = 200;
        response.message = "Ubah Data Berhasil!";
        response.data = inputs;
        res.send(response.getResponse());
    } catch (error) {
        response.code = 110;
        response.message = err.message;
        res.send(response.getResponse());
    }

});


router.delete('/delete', (req, res) => {
    const id = req.body.id;
    User.destroy({ where: { [User.primaryKeyAttribute]: id } }).then((resp) => {
        response.code = 200;
        response.message = "Delete Data Berhasil!";
        response.data = resp;
        res.send(response.getResponse());
    }).catch((err) => {
        response.code = 110;
        response.message = err.message;
        res.send(response.getResponse());
    });
});

module.exports = router;