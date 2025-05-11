import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import typeDefs from './schemas/typeDefs.js';
import resolvers from './schemas/resolvers.js';
import { authMiddleware } from './auth/index.js';

dotenv.config();

const PORT = process.env.PORT || 4000;
const app = express();

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: authMiddleware,
});

async function startServer() {
  await server.start();
  server.applyMiddleware({ app });

  mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/gasme');

  app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}${server.graphqlPath}`);
  });
}

startServer();