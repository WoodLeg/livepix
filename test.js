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
