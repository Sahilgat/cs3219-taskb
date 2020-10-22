//During the test the env variable is set to test
process.env.NODE_ENV = 'test';

let mongoose = require("mongoose");
let Contact = require('../models/contact.js');

//Require the dev-dependencies
let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../index');
let should = chai.should();

//Testing variables
let testName = 'Sahil Gathani';
let testEmail = 'sahilgathani@yahoo.com';
let testGender = 'male'
let testPhone = '98765678'

chai.use(chaiHttp);
//Parent block
describe('Contacts', () => {
    beforeEach((done) => { //Before each test we empty the database
        Contact.deleteMany({}, (err) => {
           done();
        });
    });

  /*
  * Test the default API route
  */
  describe('/GET', () => {
    it('it should connect successfully', (done) => {
      chai.request(server)
          .get('/api')
          .end((err, res) => {
                res.should.have.status(200);
            done();
          });
    });
  });
    
  /*
  * Test the /GET route
  */
  describe('/GET contacts', () => {
    it('it should GET all the contacts', (done) => {
      chai.request(server)
          .get('/api/contacts')
          .end((err, res) => {
                res.should.have.status(200);
                res.body.data.should.be.a('array');
                res.body.data.length.should.be.eql(0);
            done();
          });
    });
  });

});