const mongoose = require("mongoose")

const itemSchema = new mongoose.Schema({

    title:String,

    category:String,

    description:String,

    location:String,

    date:String,
    
    contact:String,
    type:{
    type:String,
    enum:["lost","found"]
    },

    image:{
    type:String
    },

    user:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"User"
    }

},{timestamps:true})

module.exports = mongoose.model("Item",itemSchema)