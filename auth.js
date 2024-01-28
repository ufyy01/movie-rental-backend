const { User } = require('./model/user');
const express =require('express');
const router = express.Router();
const _ = require('lodash');
const Joi = require('joi');
const bcrypt = require('bcrypt')



router.post('/', async (req, res) => {
    const { error } = validate(req.body)
    if (error) return res.status(400).send(error.details[0].message);
    
    let user = await User.findOne({ email: req.body.email })
    if (user) return res.status(400).send('User already registered');
    if (!user) return res.status(400).send('Invalid email or password');

    const validPassword = await bcrypt.compare(req.body.password, user.password);
    if (!validPassword) return res.status(400).send('Invalid email or password');

    res.send(true);
})


function validate(req) {
    const schema = Joi.object({
        email: Joi.string().required().email(),
        password: Joi.string().min(5).max(225).required()
    }) 
    return schema.validate(req)
}

module.exports = router;
