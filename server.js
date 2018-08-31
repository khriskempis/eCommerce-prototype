const express = require('express');
const mongoose = require('mongoose'); 
const morgan = require('morgan'); 

const app = express();

app.use(express.static('public'));

app.use(morgan('common')); 



app.listen(process.env.PORT || 8080, () => {
	console.log(`Your app is listening on port 8080`)
});


