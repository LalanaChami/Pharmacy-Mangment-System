const express = require("express");
const router = express.Router();
const checkAuth = require("../middleware/check-auth");

const Sales = require('../models/sales');

router.post("",(req,res,next)=>{
  const sales = new Sales({
    drugName: req.body.drugName,
    totalPrice: req.body.totalPrice,
    tax: req.body.tax,
    paidAmount: req.body.paidAmount,
    balance: req.body.balance
  });
  sales.save().then(createdSales=>{
  res.status(201).json({
    message:'Sales Added Successfully',
    salesId : createdSales._id
  });

  });

  });

  module.exports = router;
