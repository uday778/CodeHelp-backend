const express = require("express");
const router = express.Router();
const user= require('../models/users');
const{login,signup}=require("../controllers/auth");
const {middle,isStudent,isAdmin}=require('../middlewares/middle');
const users = require("../models/users");

router.post("/login",login);
router.post("/signup",signup);


//testing protected routes for single middleware
router.get('/test',middle,(req,res)=>{
    res.json({
        success: true,
        message:'welcome to the protected route for TESTS'
    });
});
//protected routes
router.get('/student',middle,isStudent,(req,res)=>{
    res.status(200).json({
        success:true,
        message:'welcome to the protected route for students'
    });
})

router.get('/admin',middle,isAdmin,(req,res)=>{
    res.status(200).json({
        success:true,
        message:'welcome to the protected route for admin'
    });
})

module.exports = router;

