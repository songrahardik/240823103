const express = require("express");
const Router = express.Router();
const studentController =require("../controllers/StudentController");

Router.get("/index",studentController.index);
Router.get("/show/:id",studentController.show);
Router.post("/store",studentController.store);
Router.put("/update",studentController.update);
Router.delete("/delete/:id",studentController.delete);

module.exports = Router;