const express = require("express");
const router = express.Router();
const TodoTask = require("../models/TodoTask");
const auth = require("../middleware/auth");
const { getUserId } = require("../models/user");
// GET METHOD
router.get("/", auth, (req, res) => {
  TodoTask.find({ userId: req.user._id }, (err, tasks) => {
    res.render("../views/index.ejs", {
      todoTasks: tasks
    });
  });
});

// POST METHOD
router.post("/", auth, async (req, res) => {
  const todoTask = new TodoTask({
    content: req.body.content,
    userId: req.user._id
  });
  try {
    await todoTask.save();
    res.redirect("/api/todo-list");
  } catch (err) {
    res.redirect("/api/todo-list");
  }
});

// PUT METHOD
router.route("/edit/:id").post((req, res) => {
  const id = req.params.id;
  TodoTask.findByIdAndUpdate(id, { content: req.body.content }, err => {
    if (err) return res.send(500, err);
    res.redirect("/api/todo-list");
  });
});

// DELETE METHOD
router.route("/remove/:id").get((req, res) => {
  const id = req.params.id;
  TodoTask.findByIdAndRemove(id, err => {
    if (err) return res.send(500, err);
    res.redirect("/api/todo-list");
  });
});

module.exports = router;
