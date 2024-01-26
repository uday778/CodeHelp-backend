const mongoose = require('mongoose');
require("dotenv").config();

exports.dbconnect=()=>{
    mongoose.connect(process.env.DATABASE_URL,{
        usenewurlparser:true,
        useunifiedtopology:true,
    })
    .then(()=>console.log(" 🌐Db connection successful🌐"))
    .catch((error)=>{
        console.log("issue in db connection");
        console.error(error.message);
        process.exit(1);
    });
}

// module.exports= dbconnect;