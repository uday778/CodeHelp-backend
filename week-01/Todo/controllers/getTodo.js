const Todo=require("../models/todo");

exports.getTodo= async(req,res)=>{
    try{
        //fetch all todo items
        const todos= await Todo.find({});

        //response
        res.status(200).json({
            success:true,
            data:todos,
            message: "entire todo data fetched"
        })
    }
    catch(err){
        console.error(err);
        res.status(500).json({
            success:false,
            message:err.message,
            data: "internal server error"
        })
    }
}

exports.getTodoById=async(req,res)=>{
    try{
        //extract todo items basis on id
        const id = req.params.id;
        const todo = await Todo.findById({_id:id})

        //data for given id is not found 
        if(!todo){
            return res.status(404).json({
                success:false,
                message:"no data found with given id"
            })
        }
        // data found for given id
        res.status(200).json({
            success:true,
            data:todo,
            message:"data fetched successfully"
        })
    }
    catch(err){
        console.error(err);
        res.status(500).json({
            success:false,
            message:err.message,
            data: "internal server error"
        })
    }
}