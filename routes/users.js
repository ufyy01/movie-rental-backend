const { User, validate } = require('../model/user');
const express =require('express');
const router = express.Router();
const _ = require('lodash');

router.get('/', async (req, res) => {
    const user = await User.find().sort('name')
    res.send(user)
})

router.get('/:id', async (req, res) => {
    let user = await User.findById(req.params.id)
    if (!user) return res.status(404).send('user with ID not found')
    res.send(user)
})

router.post('/', async (req, res) => {
    const { error } = validate(req.body)
    if (error) return res.status(400).send(error.details[0].message);
    
    let user = await User.findOne({ email: req.body.email })
    if (user) return res.status(400).send('User already registered');

    // user = new User({
    //     name: req.body.name,
    //     email: req.body.email,
    //     password: req.body.password        
    // })

    user = new User(_.pick(req.body, ['name', 'email', 'password']))

    await user.save()
    res.send(_.pick(user, ['_id', 'name', 'email']));
})

router.put('/:id', async (req, res) => {
    const {error} = validate(req.body)
    if (error) return res.status(400).send(error.details[0].message); 

    let user = await User.findByIdAndUpdate(req.params.id, 
    {
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
    }, {new: true})

    if (!user) return res.status(404).send('user with ID not found')
    res.send(user)
})

// Handling Delete
router.delete('/:id', async (req, res) => {
    let user = await User.findByIdAndDelete(req.params.id)
    if (!user) return res.status(404).send('user with ID not found')
    res.send(user)  
})



module.exports = router;