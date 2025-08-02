const mongoose = require("mongoose");
const listSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  dueDate: {
    type: Date,
    required: true,
  },
  priority: {
    type: String,
    enum: ["high", "medium", "low"],
    required: true,
  },
  status: {
    type: String,
    enum: ["Pending", "Completed"],
    required: true,
  },
  project: {
    type: String,
    enum: ["Personal", "Work"],
    required: true,
  },
  flag: {
    type: String,
    enum: ["Yes", "No"],
    required: true,
  },
  created: {
    type: Date,
    required: true,
    default: Date.now,
  },
});

module.exports = mongoose.model("List", listSchema);
