'use strict';

const express = require('express');
const router = express.Router();

const { calculateFSI } =
  require('../../services/fsi.service');

router.post('/score', (req, res) => {

  try {

    const result = calculateFSI(req.body);

    res.json(result);

  } catch (err) {

    res.status(400).json({
      error: err.message
    });

  }

});

module.exports = router;
