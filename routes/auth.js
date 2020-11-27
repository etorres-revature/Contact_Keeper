const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const auth = require("../middleware/auth");
const { check, validationResult } = require("express-validator");

const User = require("../models/User");

//@Route        GET api/auth
//@desc         Get logged in user
//@access       Private
router.get("/", auth, async (req, res) => {
  try {
    const user = await (await User.findById(req.user.id)).isSelected(
      "-password"
    );
    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error!");
  }
});

//@Route        POST api/auth
//@desc         Auth user & get token
//@access       Public
router.post(
  "/",
  [
    check("email", "Please enter a valid email address").isEmail(),
    check("password", "Password is required").exists(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    try {
      let user = await User.findOne({ email });

      if (!user) {
        return res.status(400).json({ msg: "Invalid login credentials" });
      }

      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) {
        return res.status(400).json({ msg: "Invalid login credentials" });
      }

      const payload = {
        user: {
          id: user.id,
        },
      };

      jwt.sign(
        payload,
        "shhh",
        { expiresIn: 3600 },
        (err, token) => {
          if (err) {
            throw err;
          } else {
            res.json({ token });
          }
        }
      );
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error!");
    }
  }
);

module.exports = router;
