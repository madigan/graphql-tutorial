const express = require('express');
const { ApolloServer } = require('apollo-server-express');

const createServer = async () => {
    // Configure the database
    const Datasource = require('./Datasource');
    const db = new Datasource();
    await db.init();
    await db.migrate();

    const gqlEngine = new ApolloServer({
        typeDefs: require('./schema'),
        resolvers: require('./resolvers'),
        // Context allows us to inject services into our resolvers.
        context: {
            db
        },
        tracing: true
    });

    const server = express();
    gqlEngine.applyMiddleware({ app: server });

    return server;
}

module.exports = createServer;