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
    
    if(process.env.NODE_ENV === 'production'){
        // make sure Epress serves the production asserts eg: main.js, main.css files
        app.use(express.static('client/build'));

        //make sure Epress also serves up the index.html file if route not recognized
        const path = require('path');
        app.get('*', (req, res) => {
            res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
        });
    }
    
    const PORT = process.env.PORT || 5000;
    app.listen(PORT);
    
    require('./routes/authRoutes')(app);
    require('./routes/billingRoutes')(app);