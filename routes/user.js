const express = require("express");
const router = express.Router();
const User = require("../model/userModal");

const {login, signUp} = require("../controller/authController");
const {auth, isStudent, isAdmin} = require("../middlewares/auth");


router.post("/login", login);
router.post("/signUp", signUp);

//testing 
router.get("/test", auth, (req, res) => {
    res.json({
        success: true,
        message: "Welcome to the Protected route for TESTS."
    })
});

//protected routes
router.get("/student", auth, isStudent, (req, res) => {
    res.json({
        success: true,
        message: "Welcome to the Protected route for Students."
    })
});

router.get("/admin", auth, isAdmin, (req, res) => {
    res.json({
        success: true,
        message: "Welcome to the Protected route for Admin."
    })
});

router.get("/getUserData", auth, async (req, res) => {
    try{
        const id = req.user.id;
        console.log("ID ", id);
        const user = await User.findById(id);
        
        res.status(200).json({
            success: true,
            user,
            message: "Welcome to the User data route"
        })
    } catch(error){
        res.status(500).json({
            success: false,
            error: error.message,
            message: "Fatt gaya code"
        })
    }
})

module.exports = router;