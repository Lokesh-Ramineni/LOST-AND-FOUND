const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")
require('dotenv').config();
const app = express()

// middleware
app.use(cors())
app.use(express.json())

// database connection
mongoose.connect(process.env.DataBase)
.then(()=>console.log("MongoDB connected"))
.catch(err=>console.log(err))

// routes
const rot = require("./routes/AuthRoutes")
app.use("/api/auth", rot)

const itemRoutes = require("./routes/ItemRoutes")
app.use("/api/items", itemRoutes)
app.use("/uploads",express.static("uploads"))

const userRoutes = require("./routes/userRoutes")

app.use("/api/user", userRoutes)



// server start
app.listen(5000, ()=>{
    console.log("Server running on port 5000")
})