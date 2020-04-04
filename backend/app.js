const express = require('express');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));


app.use((req,res,next)=>{
  res.setHeader("Access-Control-Allow-Origin","*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With ,Content-Type,Accept"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET,POST, PATCH, DELETE,OPTIONS"
  );
  next();
});


app.post("/api/supplier",(req,res,next)=>{
const supplier = req.body;
console.log(supplier);
res.status(201).json({
  message:'Supplier Added Successfully'
});
});


app.get("/api/supplier",(req,res,next)=>{
  const suppliers = [
    {
      supplierID : "98375498732",
      name : "kjdhgfkjsdhf ",
      email : "jskdfhkjashflkjs ",
      contact : " asjkdhfjskahfjhsa",
      drugsAvailable : " asjdhfjashfkjsahjkf"
    },
    {
      supplierID : "98375498732",
      name : "kjdhgfkjsdhf ",
      email : "jskdfhkjashflkjs ",
      contact : " asjkdhfjskahfjhsa",
      drugsAvailable : " asjdhfjashfkjsahjkf"
    },
    {
      supplierID : "98375498732",
      name : "kjdhgfkjsdhf ",
      email : "jskdfhkjashflkjs ",
      contact : " asjkdhfjskahfjhsa",
      drugsAvailable : " asjdhfjashfkjsahjkf"
    }
  ];
  res.status(200).json({
    message : 'supplier added sucessfully',
    suppliers :suppliers
  });
});

module.exports = app;
