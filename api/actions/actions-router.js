// Write your "actions" router here!
const express = require("express");

const Action = require("./actions-model");

const {validateActionId, validateAction} = require("./actions-middlware");

const router = express.Router();

//Actions Endpoints
// [GET] /api/actions
router.get("/", (req, res) => {
  Action.get(req.query.actions)
    .then(actions => {
      console.log(actions)
      res.status(200).json(actions)
    })
    .catch(err => {
      res.status(500).json({
        err: err.message
      })
    })
});

// [GET] /api/actions/:id
router.get("/:id", validateActionId, (req, res) => {
  res.status(200).json(req.actions)
});

// [POST] /api/actions
// When adding an action make sure the project_id 
// provided belongs to an existing project.
router.post("/", validateAction, (req, res) => {
   Action.insert(req.body)
    .then(actions => {
      res.status(201).json(actions)
    })
    .catch(err => {
      res.status(500).json({
        message: "Error adding the action",
        err: err.message
      })
    })
});

// [PUT] /api/actions/:id
router.put("/:id", validateActionId, validateAction, (req, res) => {
  const {id} = req.params;
  const changes = req.body;

  Action.update(id, changes)
    .then(actions => {
      res.status(200).json(actions)
    })
    .catch(err => {
      res.status(500).json({
        message: "Error updating the action",
        err: err.message
      })
    })
});

// [DELETE] /api/actions/:id
router.delete("/:id", validateActionId, (req, res) => {
  const {id} = req.params
  const actionTbd = Action.get(id)
    Action.remove(id)
    .then(() => {
      res.status(200).json(actionTbd)
    })
    .catch(err => {
      res.status(500).json({
        message: "The action could not be removed",
        err: err.message
     })
    })
})





module.exports = router;
