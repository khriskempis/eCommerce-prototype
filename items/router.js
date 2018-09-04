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

// GET items 
router.get('/', (req, res) => {
	return Item.find()
		.then(items => res.json(items.map(item => item.serialize())))
		.catch(err => res.status(500).json({message: 'Internal Server Error'}))
});

// get item by id
router.get('/:id', (req, res) => {
	Item.findById(req.params.id)
	.then(item => res.json(item.serialize()))
	.catch(err => {
		console.error(err);
		res.status(500).json({message: "Internal Server Error"}); 
	})
});

// UPDATE item
router.put('/:id', (req, res) => {loias
	//updated params

	//find fields to update in req.body
	const updated = {};
	const updateableFields = ['name', 'description', 'qty', 'cost', 'price', 'image_url'];

	updateableFields.forEach(field => {
		if (field in req.body) {
			updated[filed] = req.body[field]
		}
	});

	//find item in database with id and update
	// returns modified document as opposed to the original document
	Item.findByIdAndUpdate(req.params.id, { $set: updated }, { new: true }) 
	.then(updatedPost => {
		res.json(item.serialize()).status(204).end()
	})
	.catch(err => res.status(500).json({message: "Internal Server Error"}));


});

module.exports = { router }