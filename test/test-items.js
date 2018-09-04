'use strict';

const chai = require('chai');
const chaiHttp = require('chai-http');
const mongoose = require('mongoose');
const faker = require('faker');

const { app, runServer, closeServer } = require('../server');
const { Item } = require('../items');
const { TEST_DATABASE_URL } = require('../config'); 

const expect = chai.expect; 

chai.use(chaiHttp);

function generateItem() {

}

describe('/items', function () {
	const name = 'Test Item';
	const description = 'this is a description of the Test Item';
	const qty = 13;
	const cost = 4;
	const price = {
		regular: 10,
		sale: 9
	};
	const image_url = [{ url: "https://url/string"}];


	before(function() {
		return runServer(TEST_DATABASE_URL);
	});

	after(function() {
		return closeServer(); 
	});

	beforeEach(function() {

	});

	afterEach(function() {
		return Item.remove({name: name})
	});

	describe('POST', function() {

		it('should create a new item', function() {
			return chai.request(app)
				.post('/items')
				.send({
					name, 
					description,
					qty,
					cost,
					price,
					image_url
				})
				.then(res => {
					expect(res).to.have.status(201);
					expect(res.body).to.be.an('object');
					expect(res.body).to.have.keys(
						'name', 'description', 'qty', 'cost', 'price', 'image_url');
					expect(res.body.name).to.equal(name);
					expect(res.body.description).to.equal(description);
					expect(res.body.qty).to.equal(qty);
					expect(res.body.cost).to.equal(cost);
					expect(res.body.price.regular).to.equal(price.regular);
					expect(res.body.price.sale).to.equal(price.sale);
					expect(res.body.image_url.url).to.equal(image_url.url);
					return Item.findOne({ name });
				})
				.then(item => {
					expect(item).to.not.be.null;
					expect(item.name).to.equal(name);
					expect(item.description).to.equal(description);
					expect(item.qty).to.equal(qty);
					expect(item.cost).to.equal(cost);
					expect(item.price.regular).to.equal(price.regular); 
					expect(item.price.sale).to.equal(price.sale)
					expect(item.image_url.url).to.equal(image_url.url);
				});
		});

		// it('should reject item with missing name', function() {

		// });
	});

	// describe('GET request', function(){

	// 	it('should display all items in database', function() {
	// 		return Item.create(
	// 			{
	// 				name,
	// 			}
	// 		)
	// 	});
	// });

});