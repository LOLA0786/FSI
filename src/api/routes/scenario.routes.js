'use strict';

const express = require('express');
const router = express.Router();

const { runMonteCarlo } =
  require('../../modules/monte-carlo/monte-carlo.simulator');

router.post('/simulate', (req,res)=>{

  const result =
    runMonteCarlo(req.body,1000);

  res.json(result);

});

module.exports = router;
