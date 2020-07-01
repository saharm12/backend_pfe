 const nodemailer = require("nodemailer");
 const qrcode = require('qr-image');

 let transporter = nodemailer.createTransport({
     service: "Gmail",

     secure: false, // true for 465, false for other ports
     auth: {
         user: "moussa.sahar0@gmail.com", // generated ethereal user
         pass: "99827212s", // generated ethereal password
     },
 });

 module.exports.sendEmail = async(data) => {

     console.log("data of email ", data)
     let info = await transporter.sendMail({
         from: 'moussa.sahar0@gmail.com', // sender address
         to: data.receiver, // list of receivers
         subject: data.subject, // Subject line
         text: data.emailText, // plain text body

     });
     console.log(info);

 }
 module.exports.sendAttEmail = async(data) => {

     console.log("data of email ", data)
     let info = await transporter.sendMail({
         from: 'moussa.sahar0@gmail.com', // sender address
         to: data.receiver, // list of receivers
         subject: data.subject, // Subject line
         text: data.emailText, // plain text body
         attachments: [{
             path: __dirname + '/pdf/' + data.filename
         }]
     });
     console.log(info);
 }

 module.exports.sendQrCode = async(data) => {
     let qrImage = qrcode.image(data.userInfo, { type: 'png' });
     qrImage.pipe(require('fs').createWriteStream(__dirname + '/qrcodes/' + data.receiver + "_" + data.userid + '.png'));
     var svg_string = qrcode.imageSync(data.userInfo, { type: 'png' });
     let info = await transporter.sendMail({
         from: 'moussa.sahar0@gmail.com', // sender address
         to: data.receiver, // list of receivers
         subject: data.subject, // Subject line
         text: data.emailText,
         attachments: [{
             path: __dirname + '/qrcodes/' + data.receiver + "_" + data.userid + '.png'
         }]

     });
     console.log(info);
 }