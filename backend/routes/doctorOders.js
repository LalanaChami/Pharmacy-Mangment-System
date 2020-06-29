const express = require("express");
const router = express.Router();

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
  module.exports = router;
