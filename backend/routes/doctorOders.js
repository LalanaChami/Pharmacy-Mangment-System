const express = require("express");
const router = express.Router();
const nodemailer = require("nodemailer");

const DoctorOder = require('../models/doctorOders');


router.post("",(req,res,next)=>{
  const docOder = new DoctorOder({
    doctorName: req.body.doctorName,
    doctorContact: req.body.doctorContact,
    doctorID: req.body.doctorId,
    doctorEmail: req.body.doctorEmail,
    drugNames: req.body.drugName,
    drugPrice: req.body.drugPrice,
    drugQuantity: req.body.drugQuantity,
    totalAmount: req.body.totalAmount,
    pickupDate: req.body.pickupDate
  });
  docOder.save().then(createdDocOder=>{
  res.status(201).json({
    message:'Doctor Oder Added Successfully',
    doctorOderId : createdDocOder._id
  });

  });

  });

  router.get("",(req,res,next)=>{
    DoctorOder.find().then(documents=>{
      res.status(200).json({
        message : 'Doctor oder added sucessfully',
        doctorOders :documents
      });
    });
  });

  router.post("/sendmail", (req, res) => {
    console.log("request came");
    let user = req.body;
    sendMail(user, info => {
      console.log(`The mail has been send 😃 and the id is ${info.messageId}`);
      res.send(info);
    });
  });


  async function sendMail(user, callback) {
    // reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false, // true for 465, false for other ports
      auth: {
        user: "pharmacare.contactus@gmail.com",
        pass: "lalana1011294"
      }
    });

    let mailOptions = {
      from: '"Pharma Care Pharmacies"<example.gmail.com>', // sender address
      to: user.email, // list of receivers
      subject: "Wellcome to Fun Of Heuristic 👻", // Subject line
      html: `<h1>Hey ${user.name}</h1><br>
      <h4>Thanks for joining us ${user.pickupDate}</h4>`
    };

    // send mail with defined transport object
    let info = await transporter.sendMail(mailOptions);

    callback(info);
  }


  module.exports = router;
