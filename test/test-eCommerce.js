const chai = require('chai');
const chaiHttp = require('chai-http');

const { app } = require('../server'); 


const expect = chai.expect;

chai.use(chaiHttp);

describe('Server working', function() {

	it('should serve static assets to client', function() {
		return chai.request(app)
			.get('/')
			.then((res) => {
				expect(res).to.have.status(200); 
			})
	});

});