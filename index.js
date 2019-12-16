const server = require('./src/server');

const PORT = process.env.PORT || 3000;

server.listen({ port: PORT }, () =>
    console.log(`Play with GraphQL at http://localhost:${PORT}/graphql`)
);