const express = require("express")
const router = express.Router()


const upload = require("../middleware/upload")

const { reportItem, getItems, getDashboardStats } = require("../controllers/itemController")
router.post("/report", upload.single("image"), reportItem)
// router.get("/",getItems)
router.get("/stats", getDashboardStats)
router.get("/get-items",getItems)


module.exports = router