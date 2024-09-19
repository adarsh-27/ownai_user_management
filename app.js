const express = require("express")
const dotenv = require('dotenv')
const connectDatabase = require("./config/db")
const authRoutes = require("./routes/authRoutes")
const userRoutes = require("./routes/userRoutes")

dotenv.config()
connectDatabase()

const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use('/api/auth', authRoutes)
app.use('/api/users', userRoutes)


const PORT = process.env.PORT || 5000
app.listen(PORT, console.log(`Server running on PORT ${PORT}`))

