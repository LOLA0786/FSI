'use strict';

const express = require('express');
const cors = require('cors');

const fsiRoutes =
  require('./routes/fsi.routes');

const app = express();

app.use(cors());
app.use(express.json());

app.use('/fsi', fsiRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {

  console.log("FSI API running on port", PORT);

});
