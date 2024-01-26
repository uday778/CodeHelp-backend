//import the model
const todo=require("../models/todo");
//define route handler

exports.createtodo= async(req,res)=>{
    try{ 
        //extract tittle and description from request body 
        const {title,description}=req.body;
        //create a new todo obj and insert in DB
        const response = await todo.create({title,description});
        //send a json response with status tag flag
        res.status(200).json(
            {
            success:true,
            data: response,
            message:'entry created successfully',
            }
        )
    }
    catch(error){
        console.log(error);
        console.error(error)
        res.status(500).json({
            success:false,
            data:"internal server error",
            message:error.message,
        })
    }
}