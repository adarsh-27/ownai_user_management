const express = require("express")
const { getAllUsers, getUserById } = require('../controllers/userController')
const { auth, admin } = require("../middleware/authMiddleware")
const router = express.Router()

router.get('/', auth, admin, getAllUsers)
router.get('/:id', auth, getUserById)

module.exports = router