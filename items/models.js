"use strict";

const mongoose = require('mongoose');

const Schema = mongoose.Schema

const ItemSchema = Schema({
	name: { type: String, required: true },
	description: { type: String },
	qty: { type: Number, default: 1 },
	cost: { type: Number },
	price: { 
		regular: { type: Number, required: true },
		sale: { type: Number }
	}
});

ItemSchema.methods.serialize = function() {
	return {
		name: this.name,
		description: this.description,
		qty: this.qty,
		cost: this.cost,
		price: {
			regular: this.regular,
			sale: this.sale
		}
	}
};

const Item = mongoose.model('Item', ItemSchema);

module.exports = { Item };


