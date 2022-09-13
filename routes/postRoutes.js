const express = require('express');
const jwt = require('jsonwebtoken');
const knex = require('knex')(require("../knexfile"));
const router = express.Router();

const authorize = (req, res, next) => {
    const bearerTokenString = req.headers.authorization;

    if (!bearerTokenString) {
        return res.status(401).json({error: "Resource requires Bearer token in Authorization header"});
    }

    const splitBearerTokenString = bearerTokenString.split(" ");

    if (splitBearerTokenString.length !== 2) {
        return res.status(400).json({error: "Bearer token is malformed"});
    }

    const token = splitBearerTokenString[1];

    jwt.verify(token, process.env.JWT_SECRET_KEY, (err, decoded) => {
        if (err) {
            return res.status(403).json({error: "Invalid JWT"});
        }

        req.userId = decoded.user_id;
        next();
    });
}

router.get("/", authorize, async (req, res) => {
    const posts = await knex
        .select("*")
        .from("post")
        .where({ user_id: req.userId });
        
    res.json(posts);
});

module.exports = router;