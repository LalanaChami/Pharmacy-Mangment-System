const express = require("express");
const router = express.Router();

const VerifiedDoctorOder = require('../models/verifiedDoctorOders');

router.post("",(req,res,next)=>{
  const VerifiedDocOder = new VerifiedDoctorOder({
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
  VerifiedDocOder.save().then(createdDocOder=>{
  res.status(201).json({
    message:'Verified Doctor Oder Added Successfully',
    doctorOderId : createdDocOder._id
  });

  });

  });


  module.exports = router;
