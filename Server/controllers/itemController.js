const Item = require("../models/Item")

exports.reportItem = async (req,res)=>{

    try{

        const {title,category,description,location,dateLost,contact,type} = req.body

        const image = req.file ? req.file.filename : null

        const item = new Item({
            title,
            category,
            description,
            location,
            dateLost,
            contact,
            type,
            image
        })

        await item.save()
        console.log("Item saved")
        res.json({
            message:"Item reported",
            item
        })

    }catch(err){

        res.status(500).json({message:"Server error"})

    }

}
// exports.getItems=async() =>{
    
//     try{
//         const item=await this.getItems.find().sort({createdAt:-1})
//         res.json(item)
//     }
//     catch(e){
//         res.status(400).json({message:"Error in accessing data"})
//     }
// }
exports.getItems=async(req,res) =>{
    
    try{
        const item=await Item.find()
        res.json(item)
    }
    catch(e){
        res.status(400).json({message:"Error in accessing data"})
    }
}
exports.getDashboardStats = async (req,res)=>{

    try{

        const lostCount = await Item.countDocuments({type:"lost"})

        const foundCount = await Item.countDocuments({type:"found"})

        const reunitedCount = await Item.countDocuments({status:"returned"})

        res.json({
            lost: lostCount,
            found: foundCount,
            reunited: reunitedCount
        })

    }catch(err){

        res.status(500).json({message:"Server error"})

    }

}