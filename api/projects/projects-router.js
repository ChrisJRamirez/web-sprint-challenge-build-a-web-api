// Write your "projects" router here!
const express = require("express");

const Project = require("./projects-model");
const {validateProjectId, validateProject} = require("./projects-middleware");

const router = express.Router();

//Endpoints
// [GET] /api/projects
router.get("/", (req, res) => {
  Project.get(req.query.projects)
    .then(projects => {
      console.log(projects)
      res.status(200).json(projects)
    })
    .catch(err => {
      res.status(500).json({
        err: err.message
      })
    })
});

// [GET] /api/projects/:id
router.get("/:id", validateProjectId, (req, res) => {
  res.status(200).json(req.projects)
})

module.exports = router;