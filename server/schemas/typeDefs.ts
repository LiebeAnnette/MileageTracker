import { gql } from "apollo-server-express";

const typeDefs = gql`
  type User {
    _id: ID!
    username: String!
    email: String!
    trips: [Trip]
  }

  type Trip {
    _id: ID!
    start: String!
    end: String!
    miles: Float!
    date: String!
    userId: ID!
  }

  type Auth {
    token: ID!
    user: User
  }

  type Query {
    me: User
    trips: [Trip]
  }

  type Mutation {
    login(email: String!, password: String!): Auth
    addUser(username: String!, email: String!, password: String!): Auth
    addTrip(start: String!, end: String!, miles: Float!, date: String!): Trip
    deleteTrip(id: ID!): Trip
  }
`;

export default typeDefs;
