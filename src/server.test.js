const supertest = require('supertest');

const server = require('./server');

describe("Server", () => {
    it("Boots up successfully", done => {
        supertest(server)
            .get('/graphql?query={ healthcheck }')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200)
            .expect({
                "data": { "healthcheck": "Running!" }
            }, done);
    });
});