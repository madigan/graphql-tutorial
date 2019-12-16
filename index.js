const createServer = require('./src/server');

const PORT = process.env.PORT || 3000;

createServer().then(server =>
    server.listen({ port: PORT }, () =>
        console.log(`Play with GraphQL at http://localhost:${PORT}/graphql`)
    )
).catch(console.error);