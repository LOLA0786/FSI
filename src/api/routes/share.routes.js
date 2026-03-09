'use strict';

const express = require('express');

const router = express.Router();

router.get('/share/:score',(req,res)=>{

  const score = req.params.score;

  res.json({

    message:
      "My Financial Safety Score is "+score

  });

});

module.exports = router;
