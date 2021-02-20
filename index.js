const express = require('express');
const app = express(); //ensure to use one express app

app.get('/', (req, res) =>{

    res.send({hi: 'there admin'});
});

const PORT = process.env.PORT || 5000;

app.listen(PORT);