const express = require("express")
const router = express.Router()
const { getUser } = require("../controllers/userController")
const authMiddleware = require("../middleware/AuthMiddleware")

router.get("/me", authMiddleware, getUser)
module.exports = router