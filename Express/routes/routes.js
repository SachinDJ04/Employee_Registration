const express = require('express')
const router = express.Router();

router.get("/Users",(req,res) =>{
    res.json({ "message" : "Hello All"});
    })

module.exports = router;