const mongooes = require('mongoose')
const dotenv = require('dotenv')
dotenv.config()
const MONGO_URI = process.env.MONGO_URI

const connectDatabase = async () => {
    try {
        await mongooes.connect(MONGO_URI)
        console.log("MongoDB Database Connect.......")
    } catch (error) {
        console.log(`Error ${error.message}`)
    }
}

module.exports = connectDatabase