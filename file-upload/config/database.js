const mongoose = require('mongoose');
require('dotenv').config();

exports.dbconnect=()=>{
    mongoose.connect(process.env.MONGODB_URL)
    .then(console.log('Db connection successful🌐'))
    .catch((error)=>{
        console.error(error);
        console.log("db facing connection isssues");
        process.exit(1);
    });

    
}