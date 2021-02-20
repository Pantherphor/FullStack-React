const express = require('express');
_ = require('./services/passport');


const PORT = process.env.PORT || 5000;
const app = express(); //ensure to use one express app

require('./routes/authRoutes')(app);

app.listen(PORT);