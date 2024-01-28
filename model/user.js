const Joi = require('joi');
const mongoose = require('mongoose');
const { isEmail } = require('validator');
const bcrypt = require('bcrypt')

const userSchema = new mongoose.Schema({
    name : {
        type: String,
        minlength: 5,
        maxlength: 20,
        required: true
    },
    email: {
        type: String,
        unique: true,
        required: true,
        minlength: 5,
        maxlength: 255,
        validate: [isEmail, 'Please enter password']
    },
    password: {
        type: String,
        minlength: 5,
        maxlength: 1024,
        required: true
    }
})

userSchema.pre('save', async function (next) {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt)
    next()
})

const User = mongoose.model('User', userSchema);


function validateUser(user) {
    const schema = Joi.object({
        name: Joi.string().min(5).max(20).required(),
        email: Joi.string().required().email(),
        password: Joi.string().min(5).max(225).required()
    }) 
    return schema.validate(user)
}

exports.User = User;
exports.validate = validateUser;