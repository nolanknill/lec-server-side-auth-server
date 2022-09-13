const express = require('express');
const knex = require('knex')(require("../knexfile"));
const router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

/**
 * POST /users/login
 */
router.post("/login", async (req, res) => {
    
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ error: "Login requires email and password fields"});
    }
    
    //SELECT * FROM `user` WHERE email="nknill@brainstation.io" AND password="secretpassworddontcopy"
    const foundUsers = await knex
        .select("*")
        .from("user")
        .where({ email: email});

    if (foundUsers.length !== 1) {
        // not found user
        return res.status(401).json({ error: "Invalid login credentials" });
    }

    const user = foundUsers[0];
    const isValidPassword = await bcrypt.compare(password, user.password);

    if (!isValidPassword) {
        return res.status(401).json({ error: "Invalid login credentials" });
    }

    const token = jwt.sign(
        { 
            user_id: user.id,
            sub: user.email 
        }, 
        process.env.JWT_SECRET_KEY,
        { expiresIn: "10m" }
    );
      
    res.json({
        message: "Successfully logged in",
        token
    })
});

module.exports = router;