const express = require("express");
const router = express.Router();
const List = require("../models/users");

router.get("/", async (req, res) => {
  try {
    const filter = req.query.filter; // "Personal", "Work", or undefined
    const page = parseInt(req.query.page) || 1;
    const limit = 5;
    const skip = (page - 1) * limit;

    // Build query object based on filter
    let query = {};
    if (filter === "Personal") query.project = "Personal";
    else if (filter === "Work") query.project = "Work";

    // Get counts for sidebar (unfiltered)
    const allLists = await List.find();
    const personalCount = allLists.filter(
      (item) => item.project === "Personal"
    ).length;
    const workCount = allLists.filter((item) => item.project === "Work").length;
    const completedCount = allLists.filter(
      (item) => item.status === "Completed"
    ).length;
    const pendingCount = allLists.filter(
      (item) => item.status === "Pending"
    ).length;

    // Total documents count based on filter
    const totalLists = await List.countDocuments(query);

    // Get filtered and paginated data
    const lists = await List.find(query).skip(skip).limit(limit);

    const totalPages = Math.ceil(totalLists / limit);

    res.render("index", {
      title: "Home Page",
      lists,
      personal: personalCount,
      workCount,
      completedCount,
      pendingCount,
      currentPage: page,
      totalPages,
      query: req.query,
      message: req.session.message || null,
    });

    req.session.message = null;
  } catch (err) {
    console.error(err);
    res.json({ message: err.message });
  }
});

router.get("/add", (req, res) => {
  res.render("components/add_task", { title: "Nitesh ghimrie" });
});

router.post("/add", async (req, res) => {
  try {
    const list = new List({
      title: req.body.title,
      description: req.body.description,
      dueDate: req.body.dueDate, // ✅ fixed syntax
      priority: req.body.priority,
      status: req.body.status,
      project: req.body.project,
      flag: req.body.flag,
    });

    await list.save();
    console.log(list);

    req.session.message = {
      type: "success",
      message: "Task added successfully!",
    };

    res.redirect("/");
  } catch (err) {
    console.error(err);
    req.session.message = {
      type: "danger",
      message: "Failed to add task.",
    };
    res.redirect("/");
  }
});

module.exports = router;
