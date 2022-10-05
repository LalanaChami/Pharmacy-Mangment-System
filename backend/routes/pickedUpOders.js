const express = require("express");
const router = express.Router();

const PickedUpDoctorOder = require('../models/pickedUpOders');

router.post("",(req,res,next)=>{
  const PickedUpDocOder = new PickedUpDoctorOder({
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

  PickedUpDocOder.save().then(createdDocOder=>{
  res.status(201).json({
    message:'Picked Up Doctor Oder Added Successfully',
    doctorOderId : createdDocOder._id
    });
  });
});

router.get("",(req,res,next)=>{
  PickedUpDoctorOder.find().then(documents=>{
    res.status(200).json({
      message : 'Doctor picked up oder added sucessfully',
      doctorOders :documents
    });
  });
});





  module.exports = router;
