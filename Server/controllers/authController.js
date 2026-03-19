const User=require('../models/user')
const bcrypt=require('bcryptjs')
const jwt=require("jsonwebtoken")



exports.register=async(req,res)=>{
    try{
        const {username,email,password}=req.body
        check_email=email.split("@")
        if(check_email[1]!="vitapstudent.ac.in")
            return res.status(400).json({message:'use only student email'})
        const userExists=await User.findOne({email})
        if(userExists){
            return res.status(400).json({message:'User already exists'})
        }
        const hashedPassword=await bcrypt.hash(password,10)//salting
        const newUser=new User({
            username,
            email,
            password:hashedPassword
        })
        await newUser.save()
        res.status(201).json({message:'User registered successfully'})
    } catch (error) {
        res.status(500).json({message:'Internal server error'})
    }
};

exports.login=async(req,res)=>{
    try{
        const {email,password}=req.body

        const check=await User.findOne({email})
       
        const secretkey=process.env.secret_key  //secret key put in .env
        if(!check){
            console.log("Not Registered")
            return

        }
        const claims={id:check._id}//custom claims
        const match=await bcrypt.compare(password,check.password)
        if(!match){
            return res.status(400).json({message:"Password is incorrect"})
        }

        const token = jwt.sign(
            claims,
            secretkey,
            {expiresIn:"1d"}
        )
        res.json({
            message:"Login successful",
            token
        })
    }
    catch(e){
        res.status(400).json(e)
    }
};