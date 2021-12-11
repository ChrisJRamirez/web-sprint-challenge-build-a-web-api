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

const validateProjectId = async(req, res, next) => {
  const {id} = req.params
  try{
    const projects = await Project.get(id)
    if(!projects){
      res.status(404).json({
        message: "Project with the given ID not found"
      })
    } else {
      // should this be res.projects..?
        req.projects = projects
        next()
    }
  }catch(err){
    res.status(500).json({
      message: `Error:${err.message}`
    })
    next()
  }
};

function validateProject(req, res, next) {
  if(!req.body.name || !req.body.description){
    res.status(400).json({
      message: "Missing required name and/or description fields"
    })
  }else{
    next()
  }
}


// export Middlewares
module.exports = {
  logger,
  validateProjectId,
  validateProject
}

