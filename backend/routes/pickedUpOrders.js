const express = require("express");
const router = express.Router();

const PickedUpDoctorOrder = require('../models/pickedUpOrders');

router.post("",(req,res,next)=>{
  const PickedUpDocOrder = new PickedUpDoctorOrder({
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

  PickedUpDocOrder.save().then(createdDocOrder=>{
  res.status(201).json({
    message:'Picked Up Doctor Order Added Successfully',
    doctorOrderId : createdDocOrder._id
    });
  });
});

router.get("",(req,res,next)=>{
  PickedUpDoctorOrder.find().then(documents=>{
    res.status(200).json({
      message : 'Doctor picked up order added sucessfully',
      doctorOrders :documents
    });
  });
});





  module.exports = router;
