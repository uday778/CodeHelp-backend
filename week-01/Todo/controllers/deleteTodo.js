const Todo=require("../models/todo");


exports.deleteTodo= async(req,res)=>{
    try{
        const {id}= req.params;
        await Todo.findByIdAndDelete(id);

        res.status(200).json({
            success:true,
            message:"todo deleted successfully",
            data:Todo
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