const Post = require('../models/postModel')
const Like= require('../models/likeModel')


// like a post 
exports.likePost=async(req,res)=>{
    try{
        const {post,user}=req.body;
        const like = new Like({
            post,user
        })
        const savedLike= await like.save();

        //update the post collection bais on this
        const updatedPost =await Post.findByIdAndUpdate(post,{$push:{likes:savedLike._id}},{new:true})
        .populate("likes").exec();
        res.json({
            post : updatedPost
        })
    }
    catch(error){
        return res.status(500).json({
            error: "error while liking the post "
        })
    }
}


exports.unlikePost=async(req,res)=>{
    try{
        const {post,like}=req.body;
        //find nd delete the like 
        const deletedLike= await Like.findByIdAndDelete({post:post,_id:like });


        //update  the post collection

        const updatePost= await Post.findByIdAndUpdate(post,{$pull:{likes:deletedLike._id}},{new:true});

        res.json({
            post:updatePost
        })
    }
    catch(error){
        return res.status(400).json({
            error:"error while unliking the post"
        })
    }
}