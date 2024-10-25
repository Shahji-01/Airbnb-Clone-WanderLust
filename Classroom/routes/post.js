const express=require("express");
const router=express.Router();

// Post Routes
// home route
router.get("/",(req,res)=>{
    res.send("You requested the home route.");
});

// show route
router.get("/:id",(req,res)=>{
    res.send("You requested the show route.");
});

// update route
router.post("/",(req,res)=>{
    res.send("You requested the update route.");
});

// delete route
router.delete("/:id",(req,res)=>{
    res.send("You requested the delete route.");
});

module.exports=router;