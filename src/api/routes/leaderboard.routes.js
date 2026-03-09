'use strict';

const express = require('express');

const router = express.Router();

const leaderboard = [];

router.post('/submit',(req,res)=>{

  leaderboard.push(req.body);

  res.json({status:"ok"});

});

router.get('/',(req,res)=>{

  res.json(leaderboard);

});

module.exports = router;
