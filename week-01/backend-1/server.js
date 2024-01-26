const express = require('express');
const port= 2000;
const app= express();
const bodyparser= require('body-parser');
app.use(bodyparser.json());

app.listen(port,()=>{
    console.log(`listening on port ${port}` )
})
app.post('/api/cars',(req,res)=>{
    const {name,brand}=req.body;
    console.log(name)
    console.log(brand)
    res.send("car submitted successfully")
})
const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://udaysiddu492:ts02em7614@uday-kumar.zzb08jv.mongodb.net/uday-kumar',{
    useNewurlparser:true,
    useUnifiedTopology:true,
})
.then(()=>{
    console.log('connection successful')
})
.catch((error)=>{console.log('received an error: ' + error)})
