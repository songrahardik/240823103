const express = require("express");
const Router = express.Router();
const studentController =require("../controllers/StudentController");

const {
    createValidator,
    updateValidator,
    validate,
  } = require("../validators/studentvalidator");
  

Router.get("/index",studentController.index);
Router.get("/show/:id",studentController.show);

Router.post("/store", (req, res, next) => {
  const result = validate(createValidator, req.body);

  if (!result.success) {
    return res.status(400).json({ status: "error", errors: result.errors });
  }

  studentController.store(req, res, next);
});

Router.put("/update/:id",studentController.update);
Router.delete("/delete/:id",studentController.delete);

module.exports = Router;

// "start": "nodemon index.js"