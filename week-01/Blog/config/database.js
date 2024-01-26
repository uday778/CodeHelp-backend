const  mongoose = require('mongoose');

require('dotenv').config ();

const dbconnect=()=>{
    mongoose.connect(process.env.DATABASE_URL,{
        useNewUrlparser:true,
        useUnifiedTopology:true
    })
    .then(console.log('DB connection successfull🌐'))
    .catch((error)=>{
        console.log('  D b  facing  conection issues');
        console.log(error);
        process.exit (1);
    })
}

module.exports=dbconnect;