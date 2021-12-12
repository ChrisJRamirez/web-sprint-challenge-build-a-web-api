const express = require('express');
const server = express();

// Configure your server here
server.use(express.json());

// global middlewares and the user's router need to be connected here
// Actions
const actionRouter = require("./actions/actions-router");
const {actionLogger} = require("./actions/actions-middlware");


// Projects
const projectRouter = require("./projects/projects-router");
const {logger} = require("./projects/projects-middleware");

// Build your actions router in /api/actions/actions-router.js
server.use("/api/actions", actionLogger, actionRouter)
// Build your projects router in /api/projects/projects-router.js
server.use("/api/projects", logger, projectRouter);
// Do NOT `server.listen()` inside this file!


// Catch all endpoint
server.get("/", (req, res) => {
  res.json("Server is up and running")
})

module.exports = server;
