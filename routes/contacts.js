const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const { check, validationResult } = require("express-validator/check");

const User = require("../models/User");
const Contact = require("../models/Contact");

//@Route        GET api/contacts
//@desc         Get all users contacts
//@access       Private
router.get("/", auth, async (req, res) => {
  try {
    const contacts = await Contact.find({ user: req.user.id }).sort({
      date: -1,
    });

    res.json(contacts);
  } catch (error) {
    console.error(err.message);
    res.status(500).send("Server Error!");
  }
});

//@Route        POST api/contacts
//@desc         Add new contact
//@access       Private
router.post("/", (req, res) => {
  res.send("Add a contact ");
});

//@Route        PUT api/contacts/:id
//@desc         Update one contact
//@access       Private
router.put("/:id", (req, res) => {
  res.send("Update contact");
});

//@Route        DELETE api/contacts/:id
//@desc         Delete one contact
//@access       Private
router.delete("/:id", (req, res) => {
  res.send("Delete contact");
});

module.exports = router;
