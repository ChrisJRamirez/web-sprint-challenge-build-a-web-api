// add middlewares here related to projects
const Project = require("./projects-model");

function logger(req, res, next) {
  const date = new Date();
  console.log(`
    REQUEST METHOD: ${req.method},
    REQUEST URL: ${req.originalUrl},
    TIMESTAMP: ${date.toLocaleString()}
  `)
  next()
};


// export Middlewares
module.exports = {
  logger
}

