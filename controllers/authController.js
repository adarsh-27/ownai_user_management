const UserModel = require('../models/User')
const generateToken = require("../utils/generateToken")

const registerUser = async (req, res) => {
    const { name, email, password, role, phone, city, country } = req.body
    try {
        const existingUser = await UserModel.findOne({ email })

        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }

        const newUser = await UserModel.create({ name, email, password, role, phone, city, country })

        if (newUser) {
            res.status(201).json({
                message: "User Created Successfully",
                data: {
                    _id: newUser._id,
                    name: newUser.name,
                    email: newUser.email,
                    role: newUser.role,
                    token: generateToken(newUser._id)
                }
            });
        } else {
            res.status(400).json({ message: 'Invalid user data' });
        }
    } catch (error) {
        console.log("error->", error)
    }
}

const loginUser = async (req, res) => {
    const { email, password } = req.body

    try {
        const user = await UserModel.findOne({ email })

        if (!user) {
            return res.status(400).json({ message: `User not exists with this - ${email} address` });
        }
        const userPassword = await user.matchPasswords(password)

        if (!userPassword) {
            return res.status(400).json({ message: "Invalid Password" })
        }

        if (user && userPassword) {
            res.json({
                message: "User Login Successfully",
                data: {
                    _id: user._id,
                    name: user.name,
                    email: user.email,
                    role: user.role,
                    token: generateToken(user._id)
                }
            });
        } else {
            res.status(401).json({ message: 'Invalid email or password' });
        }
    } catch (error) {
        console.log("error-> ", error)
    }
}

module.exports = { registerUser, loginUser }