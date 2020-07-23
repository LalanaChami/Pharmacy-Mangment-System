const express = require("express");
const router = express.Router();
const nodemailer = require("nodemailer");

const VerifiedDoctorOder = require('../models/verifiedDoctorOders');

router.post("",(req,res,next)=>{
  const VerifiedDocOder = new VerifiedDoctorOder({
    doctorName: req.body.doctorName,
    doctorContact: req.body.doctorContact,
    doctorID: req.body.doctorId,
    doctorEmail: req.body.doctorEmail,
    drugId: req.body.drugId,
    drugNames: req.body.drugName,
    drugPrice: req.body.drugPrice,
    drugQuantity: req.body.drugQuantity,
    realQuantity: req.body.realQuantity,
    totalAmount: req.body.totalAmount,
    pickupDate: req.body.pickupDate
  });

  VerifiedDocOder.save().then(createdDocOder=>{
  res.status(201).json({
    message:'Verified Doctor Oder Added Successfully',
    doctorOderId : createdDocOder._id
    });
  });
});

router.get("",(req,res,next)=>{
  VerifiedDoctorOder.find().then(documents=>{
    res.status(200).json({
      message : 'Doctor verify oder added sucessfully',
      doctorOders :documents
    });
  });
});


router.delete("/:id", (req, res, next) => {
  VerifiedDoctorOder.deleteOne({ _id: req.params.id }).then(result => {
    console.log(result);
    res.status(200).json({ message: 'Doctor verified order deleted!' });
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
    subject: "Congrats You Have Picked Up Your Oder 👻", // Subject line
    html: `
    <head>
    <style>
      table {
        font-family: arial, sans-serif;
        border-collapse: collapse;
        width: 100%;
      }

      td, th {
        border: 1px solid #dddddd;
        text-align: left;
        padding: 8px;
      }

      tr:nth-child(even) {
        background-color: #dddddd;
      }
      </style>
      <script src="https://ajax.googleapis.com/ajax/libs/jquery/2.1.1/jquery.min.js"></script>
      <script>

          $(function(){
            var results = [], row;
            $('#table1').find('th, td').each(function(){
                if(!this.previousElementSibling && typeof(this) != 'undefined'){ //New Row?
                    row = [];
                    results.push(row);
                }
                row.push(this.textContent || this.innerText); //Add the values (textContent is standard while innerText is not)
            });
            console.log(results);
        });

      </script>
      </head>

    <body>
    <h1>Hey Dr. ${user.name}</h1><br>
    <h3>You have picked up the oder from our pharmacy TODAY</h3><br>
    <h2>Thankyou for keeping TRUST on us , hope to see you again 😃</h2><br>


    <h2>Recipt Details</h2>

    <table id="table1">
      <tr>
        <th>Odered Drug Name</th>
        <th>Drug Quantity</th>
        <th>Price per unit (Rs.)</th>
      </tr>
      <tr>
        <td>${user.drugName[0]}</td>
        <td>${user.drugQuantity[0]}</td>
        <td>${user.drugPrice[0]}</td>
      </tr>
      <tr>
        <td>${user.drugName[1]}</td>
        <td>${user.drugQuantity[1]}</td>
        <td>${user.drugPrice[1]}</td>
      </tr>
      <tr>
        <td>${user.drugName[2]}</td>
        <td>${user.drugQuantity[2]}</td>
        <td>${user.drugPrice[2]}</td>
      </tr>
      <tr>
        <td>${user.drugName[3]}</td>
        <td>${user.drugQuantity[3]}</td>
        <td>${user.drugPrice[3]}</td>
      </tr>
      <tr>
        <td>${user.drugName[4]}</td>
        <td>${user.drugQuantity[4]}</td>
        <td>${user.drugPrice[4]}</td>
      </tr>
      <tr>
        <td>${user.drugName[5]}</td>
        <td>${user.drugQuantity[5]}</td>
        <td>${user.drugPrice[5]}</td>
      </tr>
      <tr>
        <td>${user.drugName[6]}</td>
        <td>${user.drugQuantity[6]}</td>
        <td>${user.drugPrice[6]}</td>
      </tr>
    </table><br>
    <h2>Total Paid Amount :Rs. ${user.total}</h2><br>
    <h3>Info* : </h3>
    <h4>If there is any issue reagrding the oder please be free to contact us or email us (pharmacare.contactus@gmail.com) 😃 </h4>
    </body>
    `
  };

  // send mail with defined transport object
  let info = await transporter.sendMail(mailOptions);

  callback(info);
}

  module.exports = router;
