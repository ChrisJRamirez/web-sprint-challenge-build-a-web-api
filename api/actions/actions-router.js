// Write your "actions" router here!
const express = require("express");

const Action = require("./actions-model");

const {validateActionId, validateAction} = require("./actions-middlware");

const router = express.Router();

//Actions Endpoints
//[GET] /api/actions
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
})


module.exports = router;
