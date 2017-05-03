//During the test the env variable is set to test
process.env.NODE_ENV = 'test'

let mongoose = require('mongoose')
let expenseType = require('../source/model/expenseType')

//Require the dev-dependencies
let chai = require('chai')
let chaiHttp = require('chai-http')
let server = require('../source/server')
let should = chai.should()

chai.use(chaiHttp)
//Our parent block
describe('ExpenseType', () => {

  beforeEach((done) => { //Before each test we empty the database
    expenseType.remove({}, (err) => {
      done()
    })
  })
  /*
  * Test the /GET route
  */
  describe('/GET ExpenseType', () => {
    it('it should GET all the expense type when db is empty', (done) => {
      chai.request(server)
            .get('/expenseType')
            .end((err, res) => {
              res.should.have.status(200)
              res.body.should.be.a('array')
              res.body.length.should.be.eql(0)
              done()
            })
    })
  })

})
