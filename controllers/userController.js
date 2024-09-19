const UserModel = require("../models/User")

const getAllUsers = async (req, res) => {
    const { name, email, country } = req.query
    try {
        const query = {}

        if (name) {
            query.name = new RegExp(name, "i")
        }
        if (email) {
            query.email = new RegExp(email, "i")
        }
        if (country) {
            query.country = new RegExp(country, "i")
        }
        const users = await UserModel.find(query).select('-password')

        if (!users) {
            return res.status(400).json({ message: "No any User found" })
        }

        return res.status(200).json({ message: 'Users found', data: users })
    } catch (error) {
        console.log("error -> ", error)
    }
}

const getUserById = async (req, res) => {
    const userId = req.params.id
    try {
        const user = await UserModel.findById(userId).select('-password')

        if (user) {
            console.log(req.user.role)
            if (req.user.role === 'Admin' || req.user._id.toString() === userId) {
                return res.status(200).json({ message: 'User found', data: user })
            } else {
                return res.status(403).json({ message: 'Not authorized to view this user' });
            }
        } else {
            return res.status(404).json({ message: 'User not found' });
        }
    } catch (error) {
        console.log("error -> ", error)
    }
}

module.exports = { getAllUsers, getUserById }