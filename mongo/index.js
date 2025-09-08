const mongoose = require("mongoose");

mongoose.connect("mongodb+srv://songrahardik082_db_user:Hardik123@cluster0.dfelcos.mongodb.net/example", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const studentSchema = new mongoose.Schema({
  name: String,
  department: String,
  startYear: Number,
  endYear: Number,
  enrollment: Number,
  address: String,
});

const Student = mongoose.model("Student", studentSchema);
console.log("MongoDB connected successfully");

const student = new Student({
  name: "hardik songra",
  department: "Computer Science",
  startYear: 2024,
  endYear: 2026,
  enrollment: 123456,
  address: "halvad",
});

student
  .save()
  .then(() => {
    console.log("Student saved successfully");
  })
  .catch((error) => {
    console.error("Error saving student:", error);
  });