// Write your "projects" router here!
const express = require("express");

const Project = require("./projects-model");
const {validateProjectId, validateProject, validateProjectCompleted} = require("./projects-middleware");

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

//[PUT] /api/projects/:id
// ** test 8/9 passing but not 10, or 10 passing but not 8/9
router.put("/:id", validateProjectId, validateProjectCompleted, (req, res) => {
  const {id} = req.params;
  const changes = req.body;

  Project.update(id, changes)
    .then(projects => {
      res.status(200).json(projects)
    })
    .catch(err => {
      res.status(500).json({
        message: "Error updating the project",
        err: err.message
      })
    })
});

//[DELETE] /api/actions/:id
router.delete("/:id", validateProjectId, (req, res) => {
  const {id} = req.params
    const projectTbd = Project.get(id)
    Project.remove(id)
      .then(() => {
        res.status(200).json(projectTbd)
      })
      .catch(err => {
        res.status(500).json({
          message: "The project could not be removed",
          err: err.message
    })
  })
})







module.exports = router;