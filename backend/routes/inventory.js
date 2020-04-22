const express = require("express");
const router = express.Router();

const Inventory = require('../models/inventory');



router.post("",(req,res,next)=>{
  const inventory = new Inventory({
    name: req.body.name,
    quantity: req.body.quantity,
    batchId: req.body.batchId,
    expireDate: req.body.expireDate
    });
  inventory.save().then(createdInventory=>{
  res.status(201).json({
      message:'Inventory Added Successfully',
      inventoryId : createdInventory._id
      });
  });
});


router.put("/:id", (req,res,next)=>{
  const inventory = new Inventory({
    _id: req.body.id,
    name: req.body.name,
    quantity: req.body.quantity,
    batchId: req.body.batchId,
    expireDate: req.body.expireDate
  });
  Inventory.updateOne({_id: req.params.id}, inventory).then(result => {
    console.log(result);
    res.status(200).json({message : "Update Successful !"});
  });
});


router.get("",(req,res,next)=>{
  Inventory.find().then(documents=>{
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

module.exports = router;
