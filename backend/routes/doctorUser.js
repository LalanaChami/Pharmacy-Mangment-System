const express = require("express");
const router = express.Router();
const multer = require("multer");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const checkDocAuth = require("../middleware/check-docAuth");

const DoctorUser = require('../models/doctorUser');

router.post("/doctorSignup",(req,res,next)=>{

  bcrypt.hash(req.body.password, 10)
    .then(hash => {
      const doctorUser = new DoctorUser({
        name : req.body.name,
        contact : req.body.contact,
        docId : req.body.docId,
        email : req.body.email,
        password : hash
      });

      doctorUser.save()
        .then(result =>{
          res.status(201).json({
            message : 'Doctor Account created!',
            result: result
          });
        })

        .catch(err =>{
          res.status(500).json({
            error :err
          });
        });
    })

});


router.post("/doctorLogin" , (req, res ,  next)=>{
  let fetchedUser;
  DoctorUser.findOne({email: req.body.email}).then(user=>{
    if(!user){
      return res.status(401).json({
        message: "Auth failed"
      });
    }
    fetchedUser=user;
    return bcrypt.compare(req.body.password, user.password);
  })
  .then(result =>{
    if(!result){
      return res.status(401).json({
        message: "Auth failed"
      });
    }
    const token = jwt.sign(
      {email: fetchedUser.email , userId : fetchedUser ._id, name:fetchedUser.name, contact:fetchedUser.contact , docId:fetchedUser.docId} ,
      'this_is_the_webToken_secret_key' ,
      { expiresIn : "1h"}
      );
      res.status(200).json({
        token: token,
        expiresIn: 3600,
        name: fetchedUser.name,
        email: fetchedUser.email,
        contact: fetchedUser.contact,
        docId: fetchedUser.docId,
      });
  })
  .catch(err =>{
    return res.status(401).json({
      message: "Auth failed"
    });
  });
})

router.get("/getDoctorUserData",(req,res,next)=>{
  DoctorUser.find().then(documents=>{
    res.status(200).json({
      message : 'Doctor added sucessfully',
      doctors :documents
    });
  });
});

router.get("/:id",(req,res,next)=>{
  DoctorUser.findById(req.params.id).then(doctor =>{
    if(doctor){
      res.status(200).json(doctor);
    }else{
      res.status(200).json({message:'doctor not found'});
    }
  });
});

router.put("/:id",(req,res,next)=>{
  bcrypt.hash(req.body.password, 10)
  .then(hash => {
    const doctor = new DoctorUser({
      _id: req.body.id,
      name: req.body.name,
      email: req.body.email,
      contact: req.body.contact,
      password: hash
    });

  DoctorUser.updateOne({_id: req.params.id}, doctor)
  .then(result => {
    console.log(result);
    res.status(200).json({message : "Update doctor Successful !"});
  })
  .catch(err =>{
    res.status(500).json({
    error :err
   });
});

})
});

router.delete("/:id",(req, res, next) => {
  DoctorUser.deleteOne({ _id: req.params.id }).then(result => {
    console.log(result);
    res.status(200).json({ message: 'doctor deleted!' });
  });
});

router.get("/shoppingcart",(req,res,next)=>{

  console.log("sdfkjashdfjh");
});


module.exports = router;
