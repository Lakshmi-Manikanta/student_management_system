const express = require("express");
const router = express.Router();
const Student = require("../models/Student");

// 👉 POST – Add student
router.post("/add", async (req, res) => {
  try {
    const student = new Student(req.body);
    await student.save();
    res.status(201).json({ message: "Student added successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 👉 GET – Get all students
router.get("/", async (req, res) => {
  try {
    const students = await Student.find();
    res.json(students);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 👉 UPDATE student
router.put("/:id", async (req, res) => {
  try {
    const updatedStudent = await Student.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(updatedStudent);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


// 👉 DELETE – Delete student
router.delete("/:id", async (req, res) => {
  try {
    await Student.findByIdAndDelete(req.params.id);
    res.json({ message: "Student deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
