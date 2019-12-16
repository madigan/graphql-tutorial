const express = require('express');
const { ApolloServer } = require('apollo-server-express');

const { internet } = require('faker');

const gqlEngine = new ApolloServer({
    typeDefs: require('./schema'),
    resolvers: require('./resolvers'),
    mocks: {
        "URL": internet.url,
        "Mercenary": () => ({ name: "Spiff" })
    },
    tracing: true
});

const server = express();
gqlEngine.applyMiddleware({ app: server });

module.exports = server;