const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const { isEmail } = require('validator');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true
    },
    email: {
        type: String,
        require: true,
        unique: true,
        validator: [isEmail, 'Invalid email address']
    },
    password: { type: String, required: true },
    role: { type: String, enum: ['Admin', 'Staff'], default: 'Staff' },
    phone: { type: String, required: true },
    city: { type: String, required: true },
    country: { type: String, required: true },
}, {
    timestamps: true,
})

userSchema.pre('save', async function () {
    const salt = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password, salt)
})

userSchema.methods.matchPasswords = async function (userPassword) {

    const comparePassword = await bcrypt.compare(userPassword, this.password)
    return comparePassword
}

const userModel = mongoose.model('Users', userSchema)

module.exports = userModel