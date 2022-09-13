const express = require('express');
const knex = require('knex')(require("../knexfile"));
const router = express.Router();
const authorize = require('../middleware/authorize');

router.get("/", authorize, async (req, res) => {
    const posts = await knex
        .select("*")
        .from("post")
        .where({ user_id: req.userId });
        
    res.json(posts);
});

module.exports = router;