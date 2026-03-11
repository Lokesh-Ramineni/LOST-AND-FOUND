const express=require('express')
const router=express.Router()
// mini server that handles specific routes

const {register,login}=require("../controllers/authController.js")

router.post("/Register",register)
router.post("/Login",login)

module.exports=router;