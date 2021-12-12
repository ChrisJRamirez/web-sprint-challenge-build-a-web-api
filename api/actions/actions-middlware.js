// add middlewares here related to actions
const Action = require("./actions-model");

function actionLogger(req, res, next) {
  const date = new Date();
  console.log(`
    REQUEST METHOD: ${req.method},
    REQUEST URL: ${req.originalUrl},
    TIMESTAMP: ${date.toLocaleString()}
  `)
  next()
};

const validateActionId = async(req, res, next) => {
  const {id} = req.params
  try{
    const actions = await Action.get(id)
    if(!actions){
      res.status(404).json({
        message: "Action with the given ID not found"
      })
    } else {
      req.actions = actions
      next()
    }
  } catch(err){
    res.status(500).json({
      message: `Error:${err.message}`
    })
    next()
  }
};

const validateAction = (req, res, next) => {
  if(!req.body.project_id || !req.body.description || req.body.notes){
    res.status(400).json({
      message: "Missing required project_id, description, or notes fields"
    })
  } else{
    next()
  }
}

// export Middlewares
module.exports = {
  actionLogger,
  validateActionId,
  validateAction
}
