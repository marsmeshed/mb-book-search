const express = require('express');
const path = require('path');
const {ApolloServer} = require("apollo-server-express");
const db = require('./config/connection');
const typeDefs = require("./schemas/typeDefs")
const resolvers = require("./schemas/resolvers")
const {authMiddleware} = require("./utils/auth")
// const routes = require('./routes');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: authMiddleware
})

// if we're in production, serve client/build as static assets
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/build')));
}

// app.use(routes);

const startServer = async () => {
  await server.start();
  server.applyMiddleware({app});
  db.once('open', () => {
    app.listen(PORT, () => console.log(`🌍 Now listening on localhost:${PORT}`));
  });
}

startServer();

