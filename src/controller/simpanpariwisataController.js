const router = require("express").Router();
const response = require("../core/response");
const Bookmark = require("../models/Bookmark_Model");
const Pengguna = require("../models/Pengguna_Model");

router.get('/', async (req, res) => {
    try {
        let bookmark = await Bookmark.findAll();
        if (bookmark.length>0) {
            response.code = 200;
            response.message = "Sukses";
            response.data = bookmark;
            res.send(response.getResponse());
        } else {
            throw new Error("404|Bookmark tidak ditemukan")
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

router.get('/find', async (req, res) => {
    try {
        const options = {}
        const find = req.query;
        let modelAttr = Bookmark.rawAttributes;
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
        let bookmark = await Bookmark.findAll(options)
        if (bookmark.length > 0) {
            response.code = 200;
            response.message = "Sukses";
            response.data = bookmark;
            res.send(response.getResponse());
        } else {
            throw new Error("404|Bookmark tidak ditemukan")
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

router.get('/:id', async (req, res) => {
    try {
        let bookmark = await Bookmark.findOne({ where: { id_bookmark: req.params.id } });
        if (bookmark) {
            response.code = 200;
            response.message = "Sukses";
            response.data = bookmark;
            res.send(response.getResponse());
        } else {
            throw new Error("404|Bookmark tidak ditemukan")
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

router.post('/', async (req, res) => {
    try {
    const modelAttr = Bookmark.rawAttributes
    const inputBookmark = {};

    Object.values(modelAttr).forEach((val) => {
        if (val.field != "id_bookmark") {
          if (req.body[val.field] != '') {
            inputBookmark[val.fieldName] = req.body[val.field];
          } else {
            inputBookmark[val.fieldName] = null;
          }
        }
    });
    
        let bookmark = await Bookmark.create(inputBookmark);
        response.code = 200;
        response.message = "Bookmark berhasil ditambahkan";
        response.data = inputBookmark;
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


router.put('/', async (req, res) => {
    try {
    const options = {}
    options.where = {
        id_bookmark : req.body.id_bookmark
    }
    const modelAttr = Bookmark.rawAttributes
    const inputBookmark = {};

    Object.values(modelAttr).forEach((val) => {
        if (val.field != "id_bookmark") {
          if (req.body[val.field] != '') {
            inputBookmark[val.fieldName] = req.body[val.field];
          } else {
            inputBookmark[val.fieldName] = null;
          }
        }
    });

        let data = await Bookmark.findOne(options);
        if (data) {
            let bookmark = await Bookmark.update(inputBookmark, options);
            response.code = 200;
            response.message = "Bookmark berhasil diubah";
            response.data = inputBookmark;
            res.send(response.getResponse());
        } else {
            throw new Error("404|Bookmark tidak ditemukan")
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
    try {
    const options = {}
    options.where = {
        id_bookmark : req.body.id_bookmark
        }
        let data = await Bookmark.findOne(options);
        if (data) {
            let bookmark = await Bookmark.destroy(options)
            response.code = 200;
            response.message = "Bookmark berhasil dihapus";
            response.data = bookmark;
            res.send(response.getResponse());
        } else {
            throw new Error("404|Bookmark tidak ditemukan");
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