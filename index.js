const express = require('express');
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const keys = require('./config/keys');
const passport = require('passport');
const bodyParser = require('body-parser');
_ = require('./models/user');
_ = require('./services/passport');

mongoose.connect(keys.mongoURI);

const app = express(); //ensure to use one express app

app.use(bodyParser.json()); //this wires up the body-parser middleware

app.use(
    cookieSession({
        maxAge: 30 * 24 * 60 * 60 * 1000,
        keys: [keys.cookieKey]
    }));
    
    app.use(passport.initialize());
    app.use(passport.session());
    
    
    const PORT = process.env.PORT || 5000;
    app.listen(PORT);
    
    require('./routes/authRoutes')(app);
    require('./routes/billingRoutes')(app);