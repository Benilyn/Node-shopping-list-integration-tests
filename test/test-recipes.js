const chai = require('chai');
const chaiHttp = require('chai-http');
const should = chai.should();

const {app, runServer, closeServer} = require('../server');

chai.use(chaiHttp);

describe('Recipes', function() {
	before(function() {
		return runServer;
	}); //before function

	after(function() {
		return closeServer;
	}); //after function

	it('should list recipes on GET', function() {
		return chai.request(app)
		.get('/recipes')
		.then(function(res) {
			res.should.have.status(200);
			res.should.be.json;
			res.body.should.be.a('array');
			res.body.length.should.be.at.least(1);
			const expectedKeys = ['name', 'ingredients'];
			res.body.forEach(function(item) {
				item.should.be.a('object');
				item.should.include.keys(expectedKeys);
			}); //res.body.forEach function
		}); //.then function
	}); //it(should list recipes on GET)
}); //describe(recipes)
