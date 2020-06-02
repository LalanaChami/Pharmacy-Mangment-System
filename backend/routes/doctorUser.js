const express = require("express");
const router = express.Router();
const multer = require("multer");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

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

module.exports = router;
