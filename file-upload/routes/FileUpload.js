const express = require('express');
const router= express.Router();
// imageUpload,videoUpload,imageReducerUpload,
const {localFileUpload,imageUpload,videoUpload,imageReducerUpload}=require('../controllers/fileupload');

// api routes

router.post('/localFileUpload',localFileUpload)
router.post('/imageUpload',imageUpload)
router.post('/videoUpload',videoUpload)
router.post('/imageReducerUpload',imageReducerUpload)

module.exports=router;
