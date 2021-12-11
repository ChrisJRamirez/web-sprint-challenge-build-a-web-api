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
});

// [POST] /api/projects
router.post("/", validateProject, (req, res) => {
  Project.insert(req.body)
    .then(projects => {
      res.status(201).json(projects)
    })
    .catch(err => {
      res.status(500).json({
        message: "Error adding the user",
        err: err.message
      })
    })
})

module.exports = router;