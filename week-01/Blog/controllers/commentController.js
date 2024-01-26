//import model
const Post = require('../models/postModel');
const Comment = require('../models/commentModel');

//bussiness logic
exports.createComment = async (req, res) => {
    try {
        //fetch data from req body
        const { post, user, body } = req.body;

        //crete a comment object
        const comment = new Comment({
            post, user, body
        })

        //save the new comment
        const savedComment = await comment.save()

        //find the post by Id, add the new comment to its comment array
        const updatedPost = await Post.findByIdAndUpdate(post, { $push: { comments: savedComment._id } }, { new: true })
            .populate("comments")//populate the comments array with comment documents
            .exec();

        res.json({
            post: updatedPost,
        });
    }
    catch (error) {
        return res.status(500).json({
            error: "error while creating comment"
        })
    }
}