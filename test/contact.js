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

  /*
  * Test the /GET route by id
  */
  describe('/GET/:id contact', () => {
    it('it should GET a contact by the given id', (done) => {
        let contact = new Contact( { name: testName, email: testEmail, gender: testGender, phone: testPhone } );
        contact.save((err, contact) => {
            chai.request(server)
          .get('/api/contacts/' + contact.id)
          .send(contact)
          .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.data.should.have.property('name');
                res.body.data.should.have.property('email');
                res.body.data.should.have.property('gender');
                res.body.data.should.have.property('phone');
                res.body.data.should.have.property('create_date');
                res.body.data.should.have.property('_id').eql(contact.id);
            done();
          });
        });
    });
  });

  /*
  * Test the /POST route
  */
  describe('/POST contact', () => {
    it('it should not POST a contact without the name field', (done) => {
      let contact = {
          email: testEmail,
          gender: testGender,
          phone: testPhone,
      }
      chai.request(server)
          .post('/api/contacts')
          .send(contact)
          .end((err, res) => {
                res.should.have.status(200); // Change this?
                res.body.should.be.a('object');
                res.body.should.have.property('errors');
                res.body.errors.should.have.property('name');
                res.body.errors.name.should.have.property('kind').eql('required');
            done();
          });
    });
  });



  /*
  * Test the /PUT route
  */
  describe('/PUT/:id contact', () => {
    it('it should UPDATE a contact given the id', (done) => {
      let contact = new Contact( {name: testName, email: testEmail, gender: testGender, phone: testPhone} ) // Can change create date?
      contact.save((err, contact) => {
            chai.request(server)
            .put('/api/contacts/' + contact.id)
            .send({name: 'New Name'})
            .end((err, res) => {
                  res.should.have.status(200);
                  res.body.should.be.a('object');
                  res.body.should.have.property('message').eql('Contact Info updated');
                  res.body.data.should.have.property('name').eql('New Name');
              done();
            });
      });
    });
  });

  /*
  * Test the /DELETE/:id route
  */
  describe('/DELETE/:id contact', () => {
      it('it should DELETE a contact given the id', (done) => {
          let contact = new Contact( {name: testName, email: testEmail, gender: testGender, phone: testPhone} )
          contact.save((err, contact) => {
                chai.request(server)
                .delete('/api/contacts/' + contact.id)
                .end((err, res) => {
                      res.should.have.status(200);
                      res.body.should.be.a('object');
                      res.body.should.have.property('message').eql('Contact deleted'); // Move messages to commons file?
                      //res.body.result.should.have.property('ok').eql(1);
                      //res.body.result.should.have.property('n').eql(1);
                  done();
                });
          });
      });
  });

});