const router = require("express").Router();
const objId = require("mongoose").Types.ObjectId;

const { student, mentor } = require("../shared/db");

router.post("/newMentor", async (req, res) => {

  try {
    const mentorData = await mentor.findById(req.body.mentorId);
    mentorData.studentsAssigned = [
      ...mentorData.studentsAssigned,
      ...req.body.studentsArray,
    ];
    mentorData.save();
    req.body.studentsArray.forEach(async (stud) => {
      const temp = await student.findById(stud);
      temp.mentorAssigned = req.body.mentorId;
      temp.save();
    });

    res.send("Mentor added");
  } catch (e) {
    res.status(400).send("error");
  }
});


module.exports = router;
