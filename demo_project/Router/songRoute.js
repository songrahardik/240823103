const express = require("express");
const Router = express.Router();
const songController = require("../Controllers/songController");
const {
  createValidator,
  updateValidator,
  validate,
} = require("../Validators/songValidator");

Router.get("/index", songController.index);
Router.get("/show/:id", songController.show);
Router.post("/store", (req, res, next) => {
  const result = validate(createValidator, req.body);

  if (!result.success) {
    return res.status(400).json({ status: "error", errors: result.errors });
  }

  songController.store(req, res, next);
});
Router.put("/update/:id", songController.update);
Router.delete("/delete/:id", songController.delete);

module.exports = Router;