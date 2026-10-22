require('dotenv').config();
const express = require('express');
const router = express.Router();
const User = require('../models/User');
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET;
const fetchuser = require('../middleware/fetchuser');

router.post("/createuser", [
    body("name", "Enter a valid name").isLength({ min: 3 }),
    body("email", "Enter a valid mail").isEmail(),
    body("password", "Enter a valid password").isLength({ min: 5 })
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    try {
        let user = await User.findOne({ email: req.body.email }) // here User means hamara mongo db model
        if (user) {
            return res.status(400).json({
                error: "E-mail already in use",
            });
        }
        const salt = await bcrypt.genSalt(10);
        const secpassword = await bcrypt.hash(req.body.password, salt);
        user = await User.create({
            name: req.body.name,
            email: req.body.email,
            password: secpassword,
        });
        const data = {
            user: {
                id: user.id
            }
        }
        const authtoken = jwt.sign(data, JWT_SECRET);

        // jwt.sign() ek function hai jo token sign karta hai.
        // data woh information hai jo token mein rakhni hai.
        // JWT_SECRET woh secret value hai jisse token sign hoga.

        res.json({ authtoken ,user});
    } catch (error) {
        console.log(error);
        res.status(400).send("Some error occured");
    }
})

router.post("/login", [
    body("email", "Enter a valid mail").isEmail(),
    body("password", "Enter a valid password").isLength({ min: 5 })
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    try {
        let user = await User.findOne({ email: req.body.email })
        if (!user) {
            return res.status(400).json({ error: "Please try to login with correct credentials" });
        }
        const passwordCompare = await bcrypt.compare(
            req.body.password,
            user.password
        );
        if (!passwordCompare) {
            return res.status(400).json({ error: "Please try to login with correct credentials" });
        }
        const data = {
            user: {
                id: user.id
            }
        }
        const authtoken = jwt.sign(data, JWT_SECRET);
        res.json({ authtoken })
    } catch (error) {
        console.log(error);
        res.status(400).send("Some error occured");
    }
})
router.post("/getuser",fetchuser ,async (req, res) => {
    try {
        let userId = req.user.id;
        const user = await User.findById(userId).select("-password");
        res.send(user);
    } catch (error) {
        console.log(error);
        res.status(400).send("Some error occured");
    }
})

module.exports = router;

//req.body = > Request ke body ke andar jo data client ne bheja hai, woh nikaalo.