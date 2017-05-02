//During the test the env variable is set to test
process.env.NODE_ENV = 'test'

let mongoose = require('mongoose')
let expense = require('../source/model/expense')

//Require the dev-dependencies
let chai = require('chai')
let chaiHttp = require('chai-http')
let server = require('../source/server')
let should = chai.should()

chai.use(chaiHttp)
//Our parent block
describe('Expense', () => {

  beforeEach((done) => { //Before each test we empty the database
    expense.remove({}, (err) => {
      done()
    })
  })
  /*
  * Test the /GET route
  */
  describe('/GET book', () => {
    it('it should GET all the books', (done) => {
      chai.request(server)
            .get('/expense')
            .end((err, res) => {
              res.should.have.status(200)
              res.body.should.be.a('array')
              res.body.length.should.be.eql(0)
              done()
            })
    })
  })

})
