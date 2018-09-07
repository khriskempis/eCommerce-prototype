'use strict';

const express = require('express'); 
const bodyParser = require('body-parser'); 

const { Item } = require('./models'); 

const router = express.Router();

const jsonParser = bodyParser.json(); 

// router.post('/', jsonParser, (req,res) => {
// 	const requiredFields = 
// });

module.exports = { router };