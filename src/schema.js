const { gql } = require('apollo-server-express');

module.exports = gql`
"""
Standard URL compliant with the [W3 spec](https://www.w3.org/Addressing/URL/url-spec.txt).
"""
scalar URL

type Query {
    """
    Returns \`{ healthcheck: 'Running!' }\` if the server is indeed running.
    """
    healthcheck:String
    mercenary(id:ID!):Mercenary
    ships(make:String, model:String):[Ship]
}

type Mercenary {
    id: ID!
    name: String!
    bio: String
    profilePicture: URL
    home: Planet
    ships: [Ship]
    merch: [Merch]
}

type Planet {
    id: ID!
    name: String
    type: String
    population: Float
    image: URL
}

type Ship {
    id: ID!
    pilot: Mercenary
    serialNumber: String
    name: String
    make: String
    model: String
    threatLevel: ThreatLevel
    location: Planet
}

type Merch {
    id: ID!
    name: String!
    category: String!
    cost: Int!
    tags: [String]
}

enum ThreatLevel {
    PUNY, TRIFLING, SIGNIFICANT, HOLY_CATFISH, OVER_9000
}
`;