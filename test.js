var request = require('supertest');
var app = require('./app');


describe('Request on the root path', function() {

    it('Returns a 200 status code', function(done) {
    
        request(app)
            .get('/')
            .expect(200,done);

    });

    it('Return an HTML page', function(done){
        
        request(app)
            .get('/')
            .expect('Content-Type',/html/, done);
    
    });

});

describe('Request on any other path', function() {

    it('Returns a 301 redirect status code', function(done) {
    
        request(app)
            .get('/lol')
            .expect(302, done)

    });

});
