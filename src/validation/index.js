const {check, validationResult} = require('express-validator')

exports.runValidation = (req,res,next)=>{
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({
            status:false,
            message:errors.array()[0].msg
        })
    }
    next()
}

exports.validationPariwisata = [
    check('kategori','kategori tidak boleh kosong').notEmpty().isString().withMessage('Kategori tidak boleh berupa nomor')
]