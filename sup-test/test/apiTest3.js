const chai = require('chai');
const chai_http = require('chai-http');

chai.use(chai_http);
const base_url = 'http://localhost:3333';
const app = chai.request(base_url);
const expect = chai.expect;

/***
 * testing get all user endpoint
 * 
 * request() needs the HTTP.server so we pass our express app reference. 
 * Then in get() we specify the route endpoint. 
 * Here we are in the app so can omit http://localhost:3000/ part. Just give the route endpoint.
 */
describe('GET /users', function () {
    it('respond with json containing a list of all users', function (done) {
        app
            .get('/users')
            .set('Accept', 'application/json')
            .end(function(err, res) {
                expect(err).to.be.null;
                expect(res).to.have.status(200);
                expect(res).to.have.header('content-type',/json/);

                done();
            });
    });
});
/**
 * Testing get a user endpoint by giving an existing user
 */
describe('GET /user/:id', function () {
    it('respond with json containing a single user', function (done) {
        app
            .get('/user/U001')
            .set('Accept', 'application/json')
            .end(function(err, res) {
                const response_text = "user U001 found";
                expect(err).to.be.null;
                expect(res).to.have.status(200);
                expect(res).to.have.header('content-type',/json/);
                expect(res).to.be.json;
                expect(res.body).to.equal(response_text);
                done();
            });
    });
});