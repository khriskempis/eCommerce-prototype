"use strict";

const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const imageSchema = Schema({ image_url: 'string' })

const ItemSchema = Schema({
	name: { type: String, required: true },
	description: String,
	qty: { type: Number, default: 1 },
	cost: Number,
	price: { 
		regular: { type: Number, required: true },
		sale: Number
	},
	image_url: [ imageSchema ]
});

ItemSchema.methods.serialize = function() {
	return {
		name: this.name,
		description: this.description,
		qty: this.qty,
		cost: this.cost,
		price: {
			regular: this.price.regular,
			sale: this.price.sale
		},
		image_url: [
			{ url: this.image_url.url}
		]
	}
};

const Item = mongoose.model('Item', ItemSchema);

module.exports = { Item };


