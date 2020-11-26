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
router.post(
  "/",
  [auth, [check("name", "Name is required").not().isEmpty()]],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, phone, type } = req.body;

    try {
      const newContact = new Contact({
        name,
        email,
        phone,
        type,
        user: req.user.id,
      });

      const contact = await newContact.save();

      res.json(contact);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error!");
    }
  }
);

//@Route        PUT api/contacts/:id
//@desc         Update one contact
//@access       Private
router.put("/:id", auth, async (req, res) => {
  const { name, email, phone, type } = req.body;

  //build a contact object
  const contactFields = {};
  if (name) contactFields.name = name;
  if (email) contactFields.email = email;
  if (phone) contactFields.phone = phone;
  if (type) contactFields.type = type;

  try {
    let contact = await Contact.findById(req.params.id);

    if (!contact) return res.status(404).json({ msg: "Contact not found" });

    //make sure that user owns contact
    if (contact.user.toString() !== req.user.id) {
      return res
        .status(401)
        .json({ msg: "Not authorized to take this action" });
    }

    contact = await Contact.findByIdAndUpdate(
      req.params.id,
      { $set: contactFields },
      { new: true }
    );

    res.json(contact);
  } catch (error) {
    console.error(err.message);
    res.status(500).send("Server Error!");
  }
});

//@Route        DELETE api/contacts/:id
//@desc         Delete one contact
//@access       Private
router.delete("/:id", auth, async (req, res) => {
  res.send("Delete contact");
});

module.exports = router;
