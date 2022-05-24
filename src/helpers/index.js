const nodemailer = require('nodemailer');

exports.kirimEmail = dataEmail => {
      let transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: false,
        requireTLS:true,
        auth: {
        user: 'teamecotourism@gmail.com', // generated ethereal user
        pass: 'qjesnjrpvcntijma', // generated ethereal password
          },
  });

    return (
        transporter.sendMail(dataEmail)
            .then(info => console.log(`Email terkirim`))
            .catch(err => console.log(`Terjadi kesalahan : ${err}`))
    ) 
        
    
}