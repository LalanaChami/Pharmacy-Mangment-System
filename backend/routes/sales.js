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

  router.get("/getSalesChartInfo",(req,res,next)=>{

    Sales.aggregate([{ "$project": {
                                        "paidAmount": 1,
                                        "month": { "$month": "$dateTime" }
                                    }},
                                    { "$group": {
                                        "_id": "$month",
                                        "total": { "$sum": { $toDouble: "$paidAmount" }}
                                    }}
                                  ])
    .then(documents=>{
      res.status(200).json({
        message : 'sales chart details obtaine sucessfully',
        sales :documents
      });
    });
  });

  router.get("",(req,res,next)=>{
    Sales.find().then(documents=>{
      res.status(200).json({
        message : 'sales added sucessfully',
        sales :documents
      });
    });
  });

  module.exports = router;
