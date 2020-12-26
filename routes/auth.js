const router = require('express').Router();
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const { registerValidation, loginValidation } = require('../validation');

//register
router.post('/register', async (req, res) => {
    //validate data before creating user
    const { error } = registerValidation(req.body);
    if (error) {
        return res.status(400).send(error.details[0].message); //bad request
    }
    //check if the user is already in the database
    const emailExist = await User.findOne({ email: req.body.email });
    if (emailExist) {
        return res.status(400).send('Email already exists.');
    }

    //Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    //create a new user
    const user = new User({
          name: req.body.name,
          email: req.body.email,
          password: hashedPassword
    });
    try{
        const savedUser = await user.save();
        res.send({ user: user._id });
    } catch(err) {
         res.status(400).send(err);
    }
});


//login
router.post('/login', async (req, res) => {
    const { error } = loginValidation(req.body);
    if (error) {
        return res.status(400).send(error.details[0].message);
    }
    //check if the email already exists
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
        return res.status(400).send('Email or password is wrong.');
    }
    //password is correct
    const validPass = await bcrypt.compare(req.body.password, user.password);
    if (!validPass) {
        return res.status(400).send('Email or password is wrong.');
    }

    res.send('Logged in!');
});


module.exports = router;