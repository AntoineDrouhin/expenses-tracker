//During the test the env variable is set to test
process.env.NODE_ENV = 'test'

let mongoose = require('mongoose')
const ExpenseTypeModel = require('../source/model/expenseType')

//Require the dev-dependencies
let chai = require('chai')
let chaiHttp = require('chai-http')
let server = require('../source/server')
let should = chai.should()

chai.use(chaiHttp)
//Our parent block
describe('ExpenseType', () => {

  beforeEach((done) => { //Before each test we empty the database
    ExpenseTypeModel.remove({}, (err) => {
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
  describe('/POST book', () => {
      it('it should not POST an expenseType without a label field', (done) => {
        let expenseType = {

        }
        chai.request(server)
          .post('/expenseType')
          .send(expenseType)
          .end((err, res) => {
            res.should.have.status(200)
            res.body.should.be.a('object')
            res.body.should.have.property('errors')
            res.body.errors.should.have.property('label')
            res.body.errors.label.should.have.property('kind').eql('required')
            done()
          })
      })
      it('it should POST a expenseType ', (done) => {
        let expenseType = {
          label: 'Food',
        }
        chai.request(server)
            .post('/expenseType')
            .send(expenseType)
            .end((err, res) => {
              res.should.have.status(200)
              res.body.should.be.a('object')
              res.body.should.have.property('message').eql('expenseType successfully added!')
              res.body.should.have.property('expenseType')
              res.body.expenseType.should.have.property('label')
              res.body.expenseType.should.have.property('_id')
              done()
            })
      })
  })


  describe('/DELETE/:id expenseType', () => {
    it('it should DELETE a expenseType given the id', (done) => {
      let expenseType = new ExpenseTypeModel({label  : 'Protéine whey'})
      expenseType.save((err, expenseType) => {
        chai.request(server)
         .delete('/expenseType/' + expenseType.id)
         .end((err, res) => {
           res.should.have.status(200)
           res.body.should.be.a('object')
           res.body.should.have.property('message').eql('expenseType successfully deleted!')
           res.body.should.have.property('ok').eql(1)
          //  res.body.result.should.have.property('n').eql(1)
           done()
         })
      })
    })

    it('it should not DELETE an expenseType when given a wrong id', (done) => {
      chai.request(server)
      .delete('/expenseType/' + 'fakeId')
      .end((err, res) => {
        res.should.have.status(404)
        res.body.should.be.a('object')
        res.body.should.have.property('message').eql('expenseType failed to delete')
        res.body.should.have.property('ok').eql(0)
        //  res.body.result.should.have.property('n').eql(1)
        done()
      })
    })
  })
})
