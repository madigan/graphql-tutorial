const supertest = require('supertest');

const createServer = require('./server');

// TODO: Track down the async connection that is being left open.
describe("Server", () => {
    it("Boots up successfully", async () => {
        const server = await createServer();
        return supertest(server)
            .get('/graphql?query={ healthcheck }')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200)
            .expect((err, res) => {
                if (err) throw err;
                res.body.should.have.property("data", { healthcheck: "Running!" })
            });
    });
});