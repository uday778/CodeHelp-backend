const express = require ('express');
const app = express();

//load config from .env file 
require("dotenv").config();
const PORT= process.env.PORT || 4000

//middleware to parse json request body

app.use(express.json());


// import routes for todo api
const todoroutes = require('./routes/todos');

//mount the todo api routes
app.use("/api/v1",todoroutes);


//start server
app.listen(PORT,()=>{
    console.log(`server started successfully at ${PORT}`);
})


//conect to the database
const dbconnect= require("./config/database");
dbconnect();

//default route
app.get('/',(req,res)=>{
    res.send('<h1>this is home page bhache</h1>')
})