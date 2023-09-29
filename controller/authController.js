const bcrypt = require("bcrypt");
const User = require("../model/userModal");
const jwt = require("jsonwebtoken");
require("dotenv").config();

exports.signUp = async (req, res) => {
    try{
        const{name, email, password, role} = req.body;

        const existingUser = await User.findOne({email});
        if(existingUser){
            return res.status(400).json({
                success: false,
                error: "User already exists.",
            }) 
        }

        let hashedPassword;
        try{
            hashedPassword = await bcrypt.hash(password, 10);
        }
        catch(error){
            return res.status(500).json({
                success: false,
                error: "error in hashing password",
            })
        }

        const user = await User.create({
            name, email, password: hashedPassword, role
        });

        res.status(200).json({
            success: true,
            user,
            message: "User created successfully"
        })
    }
    catch(error){
        return res.status(500).json({
            success: false,
            error: "error while signUp",
        })
    }
}

exports.login = async(req, res) => {
    try{
        const {email, password} = req.body;
        if(!email || !password){
            return res.status(400).json({
                success: false,
                message: "Please fill all the details carefully."
            })
        }

        let user = await User.findOne({email});
        if(!user){
            return res.status(401).json({
                success: false,
                message: "email doesn't exist, please create a new acount."
            })
        }

        const payload = {
            email: user.email,
            id: user._id,
            role: user.role
        }
        if(await bcrypt.compare(password, user.password)){
            const token = jwt.sign(payload, process.env.JWT_SECRET,
                                    {
                                        expiresIn: "2h",
                                    } );
            //user = user.toObject();
            console.log(user);
            user.token = token;
            console.log(user);
            user.password = undefined;
            console.log(user);

            const options = {
                expires: new Date(Date.now() + 3*24*60*60*1000),
                httpOnly: true,
            }
            res.cookie("viks", token, options).status(200).json({
                success: true,
                token,
                user,
                message: "User logged in successfully."
            })
        }
        else{
            return res.status(402).json({
                success: false,
                message: "Password incorrect."
            })
        }
    }
    catch(error){
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Login error."
        })
    }
}