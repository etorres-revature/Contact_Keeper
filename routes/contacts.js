const express = require("express");
const router = express.Router();

//@Route        GET api/contacts
//@desc         Get all users contacts
//@access       Private
router.get("/", (req, res) => {
  res.send("Get all contacts");
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
