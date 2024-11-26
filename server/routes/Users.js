const express = require("express");
const router = express.Router();
const { users } = require("../models");
const email_handler = require("../email");

const bcrypt = require("bcrypt");

router.post("/", async (req, res) => {
  const { username, password, email, first_name, last_name, role } = req.body;
  new_role = "";
  if (role === "0") {
    new_role = "Donor";
  } else new_role = "Recipient";
  bcrypt.hash(password, 10).then((hash) => {
    users.create({
      username: username,
      password: hash,
      email: email,
      first_name: first_name,
      last_name: last_name,
      role: new_role,
      status: "unverified",
    });

    console.log("test");
    email_handler.send_verification(email);
    console.log("email sent");
    res.json("SUCCESS");
  });
});

router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  const user = await users.findOne({ where: { username: username } });

  console.log(req.body);
  if (user) {
    bcrypt.compare(password, user.password).then((match) => {
      if (match) {
        res.json(user.role);
      } else {
        res.json("Wrong Username And Password Combination");
      }
    });
  } else {
    res.json("User Doesn't Exist");
  }
});

router.post("/verify", async (req, res) => {
  const { username, email, code } = req.body;
  if (email_handler.verify_code(email, code)) {
    users.update({ status: "verified" }, { where: { username: username } });
    res.json("valid code");
    return;
  }
  res.json("invalid code");
  return 0;
});

module.exports = router;
