const Joi = require("joi");
const bcrypt = require("bcrypt");
const _ = require("lodash");
const { User } = require("../models/user");
const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();

router.post("/", async (req, res) => {
  const { error } = validate(req.body);
  if (error) {
    return res.status(400).render("login", { msg: error.details[0].message });
  }

  // return res.status(400).send(req.body);
  let user = await User.findOne({
    email: req.body.email
  });
  if (!user)
    return res
      .status(400)
      .render("login", { msg: "Invalid email or password." })
      .send("Invalid email or password.");

  const validPassword = await bcrypt.compare(req.body.password, user.password);
  if (!validPassword)
    return res
      .status(400)
      .render("login", { msg: "Invalid email or password." })
      .send("Invalid email or password.");
  const expiration = 60 * 60 * 1000;
  const token = user.generateAuthToken();

  res
    .cookie("token", token, {
      expires: new Date(Date.now() + expiration),
      secure: false,
      httpOnly: false
    })
    .redirect("/api/todo-list");
});

function validate(req) {
  const schema = {
    email: Joi.string()
      .min(5)
      .max(255)
      .required()
      .email(),
    password: Joi.string()
      .min(5)
      .max(255)
      .required()
  };

  return Joi.validate(req, schema);
}

module.exports = router;
