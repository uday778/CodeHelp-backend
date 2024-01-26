const express= require('express');
const app = express();
const port= 3000;

app.get('/',(req,res)=>{
    res.send('<h1>hello world express by get res</h1>')
});
app.post('/post',(req,res)=>{
    res.send('received post request')
})
//adding middleware
app.use(express.json());

app.listen(3000,()=>{
    console.log(`port listening on ${port}`)
});