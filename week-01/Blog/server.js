const  express = require('express');
const app = express();
require('dotenv').config();
const PORT=process.env.PORT ||  4000;

//middleware
app.use(express.json());

let  blog=  require('./routes/blog');

//mount
// app.use('/api/v1',blog);
app.use("/api/v1",blog);

const  dbconnect=require('./config/database');
dbconnect();

//start  the  server
app.listen(PORT,()=>{
    console.log(`app  is  started  at  port  no  ${PORT}`)
})
app.get('/',(req,res)=>{
    res.send('<h1>this  is home page guys</h1> ')
})


