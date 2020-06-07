const mongoose = require("mongoose");
var sinon = require('sinon');
var expect = require('chai').expect;
var assert = require('chai').assert;
var should = require('chai').should();
var chai = require('chai');
var userController = require('../../controllers/userController');
const users = require('../../models/user');
const app = require('../../app');
const supertest = require('supertest');

// Connect to MongoDB
CONNECTION_STRING = "mongodb+srv://nhash:<password>@mylibraryapp-n8rlv.mongodb.net/test?retryWrites=true&w=majority";
MONGO_URL = CONNECTION_STRING.replace("<password>", process.env.MONGO_PASSWORD);


describe('userController', function () {
    // Below, we are going to test HTTP functions, so we need to create fake request and respond object!

    // By using mongoose.connect
    before(async () => {
        mongoose.connect(MONGO_URL || config.database, {
            useNewUrlParser: true,
            useCreateIndex: true,
            useUnifiedTopology: true,
            useFindAndModify: false,
            dbName: "spatium"
          }, (err) => {
            if (err) {
                console.error(err);
                process.exit(1);
            }
        });
    });

    const mockResponse = (fake) => {
        return {
            send: fake
        };
    }

    // this is just example how you can design the fake request, you can also add header property if your website needs one!
    // I'm not even going to use any of these stuff inside request
    const mockRequest = (session, body) => ({
        session,
        body,
    });

    // I just want to remind that using chai is easier to read
    describe('getUserPosts', function() {

        it("Post should have title, author, body, comments, date", function(){
            const fake = sinon.fake();
            const req = mockRequest({},{});
            const res = mockResponse(fake);

            userController.getUserPosts(req,res);
            const result = fake.lastArg;

            result.forEach(element => {
                // expect(element).to.have.property('id');//check one with chai
                expect(element).to.have.keys(['title', 'author', 'body', 'comments', 'date']); //check everything with chai
                // element.should.have.property('id'); // different way of checking using should
                // assert.equal(Object.keys(element), ['id', 'first_name', 'last_name']); Not going to work because it does strict equality, not deep comparison
                // but if you really insist...
                assert.deepEqual(Object.keys(element), ['title', 'author', 'body', 'comments', 'date']); //check with assert
            });
        })

        it('should return all posts', function(){
            const fake = sinon.fake();
            const req = mockRequest({},{});
            const res = mockResponse(fake);

            // Quick quiz! why didn't I write line 62 like line 61? HINT: I didn't forget and I am not lazy >:(
            // let result = authorController.getAllAuthors(req,res);
            userController.getUserPosts(req,res);
            const result = fake.lastArg;
            expect(result).to.deep.equal(users); // Don't forget to use deep, you don't want to compare object id, you want to compare contents!
        });
  });
});

describe('Front-end pages', function() {

    it('sign up page exists', function() {
      supertest(app)
      .get('/user/singup')
      .end(function(err, res) {
        res.should.have.status(200);
        res.should.be.html;
        done();
      });
    });

    it('login page exists', function() {
      supertest(app)
      .get('/user/login')
      .end(function(err, res) {
        res.should.have.status(200);
        res.should.be.html;
        done();
      });
    });

});