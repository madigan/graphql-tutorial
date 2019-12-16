const express = require('express');
const { ApolloServer, gql } = require('apollo-server-express');

// For brevity, we define the schema in the same file as the server
const typeDefs = gql`
    type Query {
        healthcheck:String
    }
`;

/**
 * 
 * @param {Object} root Information provided by the parent resolver.
 * @param {Object} args Arguments passed in by the query.
 * @param {Object} context Resources shared across resolvers (like database connections).
 * @param {Object} info Metadata about the query.
 */
function healthcheck(root, args, context, info) {
    return "Running!"
}

// Provide resolver functions for your schema fields
const resolvers = {
    Query: {
        healthcheck
    },
};

const gqlEngine = new ApolloServer({ typeDefs, resolvers });

const server = express();
gqlEngine.applyMiddleware({ app: server });

module.exports = server;