const express = require('express');
const mongoose = require('mongoose');
const keys = require('./config/keys');
_ = require('./models/user');
_ = require('./services/passport');

mongoose.connect(keys.mongoURI);

const app = express(); //ensure to use one express app
require('./routes/authRoutes')(app);


const PORT = process.env.PORT || 5000;
app.listen(PORT);