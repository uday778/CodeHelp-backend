//app create
const express= require('express');
const { connection } = require('mongoose');
const app = express();
//port find out
require('dotenv').config();
const PORT=process.env.PORT ||4000;
//middlewares adding
app.use(express.json());
const fileupload= require('express-fileupload');
app.use(fileupload({
    useTempFiles : true,
    tempFileDir : '/tmp/'
}));

// Db connection
const db= require('./config/database');
db.dbconnect();
//cloud se connection karn h
const cloudinary= require('./config/cloudinary');
cloudinary.cloudinary();
//api route mounting
const upload=require('./routes/FileUpload')
app.use("/api/v1",upload);
//activate
app.listen(PORT,()=>{
    console.log(`app is running at ${PORT}`);
});

