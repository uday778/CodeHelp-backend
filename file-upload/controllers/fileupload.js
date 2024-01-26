const File = require('../models/File')
const cloudinary = require('cloudinary').v2;

//localFileUploader handler  function

exports.localFileUpload = async (req, res) => {
    try {
        //fetch file from request
        const file = req.files.file;//in place we can write our name in testing time use that name in kay
        console.log("files aayi je", file)
        //create a path where files in to be stored on server
        let path = __dirname + "/files/" + Date.now() + `.${file.name.split('.')[1]}`;
        console.log("path ->", path)
        //add path to the mv (move) function
        file.mv(path, (err) => {
            console.log(err);

        })
        //create a successful response
        res.status(200).json({
            success: true,
            message: "local file uploaded successfully"
        })

    }
    catch (error) {
        console.log(error);
    }
}



function isFileTypeSupported(type, supportedTypes) {
    return supportedTypes.includes(type);
}

async function uploadFileToCloudinary(file, folder,quality) {
    const options = { folder };
    console.log("temp file path :  " + file.tempFilePath)
    if(quality){
        options.quality = quality;
    }
    options.resource_type = 'auto';
    return await cloudinary.uploader.upload(file.tempFilePath, options);
}
//image upload handler
exports.imageUpload = async (req, res) => {
    try {
        //fetch data 
        const { name, tags, email } = req.body;
        console.log(name, tags, email);

        const file = req.files.uday;
        console.log(file);


        //validiation
        const supportedTypes = ["jpg", "jpeg", "png"];
        const fileType = file.name.split(".")[1].toString().toLowerCase()
        console.log("file type is :" + fileType)
        if (!isFileTypeSupported(fileType, supportedTypes)) {
            res.status(400).json({
                success: false,
                message: "file format not supported"
            })
        }

        //file format suppoted 
        console.log("uploading to uday kumar folder")
        const response = await uploadFileToCloudinary(file, "Udaykumar")
        console.log(response)


        //create a database entry
        const fileData = await File.create({
            name,
            tags,
            email,
            imageUrl: response.secure_url,
        })
        res.json({
            success: true,
            imageUrl: response.secure_url,
            message: "image successfully uploaded"
        })
    }
    catch (err) {
        console.log(err);
        res.status(400).json({
            success: false,

            message: "something went wrong"
        })
    }
}


exports.videoUpload=async(req,res)=>{
    try{
        //data fetching
        const {name,tags,email}=req.body;
        const file= req.files.video;
        console.log(file);
        //validation 
        const supportedTypes=["mp4","mov"];
       
        const fileType=file.name.split('.')[1].toLowerCase();
        console.log("filetype"+ fileType)

        if(!isFileTypeSupported(fileType,supportedTypes)){
            return response.status(500).json({
                sucess:false,
                message:"file format not supoorted "
            })
        }
        //file format suppoted 
        console.log("uploading to uday kumar folder")
        const response = await uploadFileToCloudinary(file, "Udaykumar",10)
        console.log("response "+response)


        //create a database entry
        const fileData = await File.create({
            name,
            tags,
            email,
            videoUrl: response.secure_url,
        })
        res.json({
            success: true,
            videoUrl: response.secure_url,
            message: "video successfully uploaded"
        })

    }
    catch(err){
        console.log(err);
        res.status(500).json({
            success: false,
            message:"somthing went wrong while uploading video"
        })
    }
}

exports.imageReducerUpload=async(req,res)=>{
    try{
        const { name, tags, email } = req.body;
        console.log(name, tags, email);

        const file = req.files.uday;
        console.log(file);


        //validiation
        const supportedTypes = ["jpg", "jpeg", "png"];
        const fileType = file.name.split(".")[1].toString().toLowerCase()
        console.log("file type is :" + fileType)


        if (!isFileTypeSupported(fileType, supportedTypes)) {
            res.status(400).json({
                success: false,
                message: "file format not supported"
            })
        }

        //file format suppoted 
        console.log("uploading to uday kumar folder")
        const response = await uploadFileToCloudinary(file, "Udaykumar",30)
        console.log(response)




        //create a database entry
        const fileData = await File.create({
            name,
            tags,
            email,
            imageUrl: response.secure_url,
        })
        res.json({
            success: true,
            imageUrl: response.secure_url,
            message: "image successfully uploaded"
        })
    }
    catch(error){
        console.log(error);
        res.status(500).json({
            success: false,
            message:"somthing went wrong while reducing  video size "
        })
    }
}
