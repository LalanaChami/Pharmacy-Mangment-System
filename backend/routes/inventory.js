const express = require("express");
const router = express.Router();
const multer = require("multer");
const nodemailer = require("nodemailer");

const MIME_TYPE_MAP ={
  'image/png' : 'png',
  'image/jpeg' : 'jpg',
  'image/jpg' : 'jpg'
};

const Inventory = require('../models/inventory');

const storage =multer.diskStorage({
  destination: (req, file ,cb) =>{
    const isValid  = MIME_TYPE_MAP[file.mimetype];
    let error = new Error("mime type invalid");
    if(isValid){
      error = null;
    }
    cb(error, "images");
  },
  filename :(req, file ,cb) => {
    const name = file.originalname.toLowerCase().split(' ').join('-');
    const ext = MIME_TYPE_MAP[file.mimetype];
    cb(null, name + '-' + Date.now() + '.' + ext);
  }
});


router.post("",multer({storage: storage}).single("image"),(req,res,next)=>{
  const url =req.protocol + '://' + req.get("host");
  const inventory = new Inventory({
    email: req.body.email,
    name: req.body.name,
    quantity: req.body.quantity,
    batchId: req.body.batchId,
    expireDate: req.body.expireDate,
    price: req.body.price,
    imagePath : url + "/images/" + req.file.filename
    });
  inventory.save().then(createdInventory=>{
  res.status(201).json({
      message:'Inventory Added Successfully',
      inventory: {
        ...createdInventory,
        id : createdInventory._id

      }
      });
  });
});


router.put("/:id",multer({storage: storage}).single("image"), (req,res,next)=>{

  let imagePath = req.body.imagePath;
  if(req.file){
    const url =req.protocol + '://' + req.get("host");
    imagePath =url + "/images/" + req.file.filename;
  };
  const inventory = new Inventory({
    _id: req.body.id,
    email: req.body.email,
    name: req.body.name,
    quantity: req.body.quantity,
    batchId: req.body.batchId,
    expireDate:new Date(req.body.expireDate),
    price: req.body.price,
    imagePath: imagePath
  });
  console.log(inventory);
  Inventory.updateOne({_id: req.params.id}, inventory).then(result => {
    console.log(result);
    res.status(200).json({message : "Update Successful !"});
  });
});


router.put("/updateQuantity/:id",(req,res,next)=>{
  const inventory = new Inventory({
    _id: req.body.id,
    quantity: req.body.quantity


  });console.log(inventory)
  Inventory.updateOne({_id: req.params.id}, inventory).then(result => {
    console.log(result);
    res.status(200).json({message : "Update quantity Successful !"});
  });
});


router.get("",(req,res,next)=>{
  const pageSize = +req.query.pagesize;
  const currentPage = +req.query.page;
  const postQuery = Inventory.find();
  if(pageSize && currentPage){
    postQuery
      .skip(pageSize * (currentPage-1))
      .limit(pageSize);
  }
  postQuery.then(documents=>{
    res.status(200).json({
      message : 'inventory added sucessfully',
      inventorys :documents
    });
  });
});


router.get("/outofstock",(req,res,next)=>{
  const pageSize = +req.query.pagesize;
  const currentPage = +req.query.page;
  const postQuery = Inventory.find({ $expr: { $lte: [ { $toDouble: "$quantity" }, 1.0 ] }});
  if(pageSize && currentPage){
    postQuery
      .skip(pageSize * (currentPage-1))
      .limit(pageSize);
  }
  postQuery.then(documents=>{
    res.status(200).json({
      message : 'inventory min quanity items obtained  sucessfully',
      inventorys :documents
    });
  });
});


router.get("/abouttooutofstock",(req,res,next)=>{
  const pageSize = +req.query.pagesize;
  const currentPage = +req.query.page;
  const postQuery = Inventory.find({$and: [
                                    { $expr: { $lte: [ { $toDouble: "$quantity" }, 500.0 ] }},
                                    { $expr: { $gte: [ { $toDouble: "$quantity" }, 1.0 ] }}
                                  ]});
  if(pageSize && currentPage){
    postQuery
      .skip(pageSize * (currentPage-1))
      .limit(pageSize);
  }
  postQuery.then(documents=>{
    res.status(200).json({
      message : 'inventory min quanity items obtained  sucessfully',
      inventorys :documents
    });
  });
});

router.get("/getExpired",(req,res,next)=>{
  const pageSize = +req.query.pagesize;
  const currentPage = +req.query.page;
  const postQuery = Inventory.find({expireDate:{$lte:new Date()}});
  if(pageSize && currentPage){
    postQuery
      .skip(pageSize * (currentPage-1))
      .limit(pageSize);
  }
  postQuery.then(documents=>{
    res.status(200).json({
      message : 'inventory added sucessfully',
      inventorys :documents
    });
  });
});

router.get("/getAboutToExpire",(req,res,next)=>{
  const pageSize = +req.query.pagesize;
  const currentPage = +req.query.page;
  var date = new Date();
  var date10 = new Date(date.getTime());
  date10.setDate(date10.getDate() + 10);

  const postQuery = Inventory.find({expireDate:{$lte:new Date(date10),$gte:new Date()}});
  if(pageSize && currentPage){
    postQuery
      .skip(pageSize * (currentPage-1))
      .limit(pageSize);
  }
  postQuery.then(documents=>{
    res.status(200).json({
      message : 'inventory added sucessfully',
      inventorys :documents
    });
  });
});


router.get("/:id",(req,res,next)=>{
  Inventory.findById(req.params.id).then(inventory =>{
    if(inventory){
      res.status(200).json(inventory);
    }else{
      res.status(200).json({message:'Inventory not found'});
    }
  });
});


router.delete("/:id", (req, res, next) => {
  Inventory.deleteOne({ _id: req.params.id }).then(result => {
    console.log(result);
    res.status(200).json({ message: 'Inventory deleted!' });
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
    subject: "Requesting New Drug Oder "+user.name, // Subject line
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
    <h1>Dear Supplier </h1><br>
    <h3>Our current stock of ${user.name} has been expired</h3><br>
    <h2>So we (PharmaCare Managment would like to request ${user.quantityNumber} amount of units from ${user.name} )</h2><br>
    <h3>Please reply back if the this oder is verified.</h3>

    <h2>Purchase Oder </h2>

    <table id="table1">
      <tr>
        <th>Odered Drug Name</th>
        <th>Drug Quantity </th>
        <th>Requested Price per unit (Rs.)</th>
      </tr>
      <tr>
        <td>${user.name}</td>
        <td>${user.quantityNumber}</td>
        <td>${user.price}</td>
      </tr>

    </table><br>

    <h3>Info* : </h3>
    <h4>If there is any issue reagrding the oder please be free to contact us or email us (pharmacare.contactus@gmail.com) 😃 </h4>
    </body>
    `
  };

  // send mail with defined transport object
  let info = await transporter.sendMail(mailOptions);

  callback(info);
}




router.post("/sendmailOutOfStock", (req, res) => {
  console.log("request came");
  let user = req.body;
  sendmailOutOfStock(user, info => {
    console.log(`The mail has been send 😃 and the id is ${info.messageId}`);
    res.send(info);
  });
});


async function sendmailOutOfStock(user, callback) {
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
    subject: "Requesting New Drug Oder "+user.name, // Subject line
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
    <h1>Dear Supplier </h1><br>
    <h3>Our current stock of ${user.name} has been finished/Out of stock</h3><br>
    <h2>So we (PharmaCare Managment would like to request ${user.quantityNumber} amount of units from ${user.name} )</h2><br>
    <h3>Please reply back if the this oder is verified.</h3>

    <h2>Purchase Oder </h2>

    <table id="table1">
      <tr>
        <th>Odered Drug Name</th>
        <th>Drug Quantity </th>
        <th>Requested Price per unit (Rs.)</th>
      </tr>
      <tr>
        <td>${user.name}</td>
        <td>${user.quantityNumber}</td>
        <td>${user.price}</td>
      </tr>

    </table><br>

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
