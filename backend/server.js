const mongoose = require("mongoose");
const express = require("express");
const cors = require("cors");
const path = require("path");

const app = express();

app.use(cors());
app.use(express.json());

// serve frontend from outside folder
app.use(express.static(path.join(__dirname, "../frontend")));

app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/students", require("./routes/studentRoutes"));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend", "index.html"));
});

const PORT = 5000;

mongoose.connect("mongodb://127.0.0.1:27017/studentDB")
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.log(err));

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
  console.log(`http://localhost:5000`);
});
