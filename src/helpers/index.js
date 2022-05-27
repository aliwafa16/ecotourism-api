const nodemailer = require('nodemailer');

exports.kirimEmail = dataEmail => {
      let transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        service:'gmail',
        port: 587,
        secure: false,
        requireTLS:true,
        auth: {
        user: 'teamecotourism@gmail.com',
        pass: 'bpffalecczyxissk',
        },
  });

    return (
        transporter.sendMail(dataEmail)
            .then(info => console.log(`Email terkirim`))
            .catch(err => console.log(`Terjadi kesalahan : ${err}`))
    ) 
        
    
}