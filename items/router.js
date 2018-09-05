'use strict';

const express = require('express'); 
const bodyParser = require('body-parser'); 

const { Item } = require('./models'); 

const router = express.Router();

const jsonParser = bodyParser.json(); 

// CREATE a new item 
router.post('/', jsonParser, (req,res) => {
	const requiredFields = ["name", "description", "qty", "cost", "price", "image_url"];

	Item.create({
		name: req.body.name,
		description: req.body.description,
		qty: req.body.qty,
		cost: req.body.cost,
		price: {
			regular: req.body.price.regular,
			sale: req.body.price.sale
		},
		image_url: {url: req.body.image_url.url}
	})
	.then(item => res.status(201).json(item.serialize()))
	.catch(err => {
		console.error(err);
		res.status(500).json({message: 'Internal Server Error'});
	});
});