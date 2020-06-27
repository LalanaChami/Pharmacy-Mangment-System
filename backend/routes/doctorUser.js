const express = require("express");
const router = express.Router();
const multer = require("multer");
const bcrypt = require("bcrypt");
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

router.get("/shoppingcart",(req,res,next)=>{
  // DoctorUser.findById(req.params.email)
  // .then(user =>{
  //   if(user){
  //   res.status(200).json(user);}
  //   else{
  //     res.status(404).json({message:"doctor not found"});
  //   }
  // })
  // .catch(err =>{
  //   res.status(500).json({
  //     message:"Fetching doctor failed"
  //   });
  // })
  console.log("sdfkjashdfjh");
});
//  exports.getDoctorDetailes = (req,res,next)=>{
//   DoctorUser.findById(req.params.email)
//   .then(user =>{
//     if(user){
//     res.status(200).json(user);}
//     else{
//       res.status(404).json({message:"doctor not found"});
//     }
//   })
//   .catch(err =>{
//     res.status(500).json({
//       message:"Fetching doctor failed"
//     });
//   })
//  }

module.exports = router;
