const express = require("express");
const router = express.Router();

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

module.exports = router;