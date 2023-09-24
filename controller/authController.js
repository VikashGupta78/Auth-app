const bcrypt = require("bcrypt");
const User = require("../model/userModal");

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