/****
 * we are testing with supertest
 */
const request = require('supertest');
/****
 * we need to pass the http.Server to the request() method of supertest.
 * To do that let’s include our express app - server1.js
 */
const app = require('../server1');

/***
 * testing get all user endpoint
 * 
 * request() needs the HTTP.server so we pass our express app reference. 
 * Then in get() we specify the route endpoint. 
 * Here we are in the app so can omit http://localhost:3000/ part. Just give the route endpoint.
 */
describe('GET /users', function () {
    it('respond with json containing a list of all users', function (done) {
        request(app)
            .get('/users')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200, done);
    });
});
/**
 * Testing get a user endpoint by giving an existing user
 */
describe('GET /user/:id', function () {
    it('respond with json containing a single user', function (done) {
        request(app)
            .get('/user/U001')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200, done);
    });
});

/**
 * Testing get a user endpoint by giving a non-existing user
 */
describe('GET /user/:id', function () {
    it('respond with json user not found', function (done) {
        request(app)
            .get('/user/idisnonexisting')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(404) //expecting HTTP status code
            .expect('"user not found"') // expecting content value
            .end((err) => {
                if (err) return done(err);
                done();
            });
    });
});

/**
 * Testing post user endpoint
 */
describe('POST /user/new', function () {
    let data = {
        "id": "1",
        "name": "dummy",
        "contact": "dummy",
        "address": "dummy"
    }
    it('respond with 201 created', function (done) {
        request(app)
            .post('/user/new')
            .send(data)
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(201)
            .end((err) => {
                if (err) return done(err);
                done();
            });
    });
});

/**
 * Testing post user endpoint
 */
describe('POST /user/new', function () {
    let data = {
        //no id
        "name": "dummy",
        "contact": "dummy",
        "address": "dummy"
    }
    it('respond with 400 not created', function (done) {
        request(app)
            .post('/user/new')
            .send(data)
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(400)
            .expect('"user not created"')
            .end((err) => {
                if (err) return done(err);
                done();
            });
    });
});