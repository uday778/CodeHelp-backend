const bcrypt = require("bcrypt");
const users = require("../models/users");
const jwt = require("jsonwebtoken");
require("dotenv").config();



exports.signup = async (req, res) => {
  try {
    //get data
    const { name, email, password, role } = req.body;

    //check user already existsting

    const existuser = await users.findOne({ email });

    if (existuser) {
      res.status(400).json({
        success: false,
        message: "User already exist",
      });
    }
    //secure password
    let hashedpassword;
    try {
      hashedpassword = await bcrypt.hash(password, 10);
    } catch (err) {
      res.status(400).json({
        success: false,
        message: "error on hashing password",
      });
    }

    //create a entry for user
    const user = await users.create({
      name,
      email,
      password: hashedpassword,
      role,
    });
    return res.status(200).json({
      success: true,
      message: "User created successfully",
    });
  } catch (error) {
    console.log(error);
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "user cannot be registered, please try again later",
    });
  }
};


































exports.login = async (req, res) => {
  try {
    //data fetch
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "please fill the details carefully",
      });
    }
    //check for registered user
    let user = await users.findOne({ email });

    //if not a registered user
    if (!user) {
      res.status(401).json({
        success: false,
        message: "user is not registerd please signup",
      });
    }
    const payload = {
      email: user.email,
      id: user._id,
      role: user.role,
    };
    ///verify password and generate jwt token
    if (await bcrypt.compare(password, user.password)) {
      //password is matched
      let token = jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: "2h",
      });
      //    const oldUser={...user,token} not worked password not came in with user,email,role
      user = user.toObject();
      user.token = token;
    // token= users.token  //not working 
      user.password = undefined;
      const options = {
        expires: new Date(Date.now()+ 3*24*60*60*1000),
        httpOnly: true,
      };

      res.cookie("token", token, options).status(200).json({
        success: true,
        token,
        user,
        message: "user logged in successfully",
      });


    // res.status(200).json({
    //     success: true,
    //     token,
    //     user,
    //     message: "user logged in successfully",
    //   });



    } else {
      //password dont match
      res.status(403).json({
        success: false,
        message: "password incorrect",
      });
    }
  } catch (error) {
    //  console.error(error);
    console.log(error);
    res.status(500).json({
      success: false,
      message: "login failed",
    });
  }
};
