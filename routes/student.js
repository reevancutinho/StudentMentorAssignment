const express = require("express");
const router = express.Router();

const { student, mentor } = require("../shared/db");

router.get("/", async (req, res) => {
  try {
    const data = await student.find();
    res.send(data);
  } catch (e) {
    res.send(e);
  }
});

router.post("/", async (req, res) => {
  try {
    const data = await student.create({
      name: req.body.name,
      email: req.body.email,
      course: req.body.course,
      mentorAssigned: req.body.mentorAssigned,
    });
    res.send(data);
  } catch (e) {
    res.status(500).send("Error in student POST");
  }
});

module.exports = router;