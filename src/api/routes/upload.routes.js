'use strict';

const express = require('express');
const multer = require('multer');

const upload = multer({ dest: 'uploads/' });

const router = express.Router();

router.post('/statement',
  upload.single('file'),
  (req,res)=>{

    res.json({
      message:"Statement uploaded",
      file:req.file.filename
    });

});

module.exports = router;
