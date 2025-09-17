const express = require("express");
const mongoose = require("mongoose");
const songRoute = require("./Router/songRoute");

const app = express();
const PORT = 80;
app.use(express.json());
   
mongoose.connect(
  "mongodb+srv://songrahardik082_db_user:Hardik5304@cluster0.dfelcos.mongodb.net/",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

app.use("/song", songRoute);

app.listen(PORT, () => {
  console.log(`Server running at localhost:${PORT}/`);
});