const mongoose = require("mongoose");

const NoteSchema = new mongoose.Schema({
  // username: {
  //   type: String, 
  //   required: true,
  // },
  body: {
    type: String, 
    required: true,
  },
  created: {
    type: String,
    required: true,
  },
  updated: {
    type: String,
    required: true,
  },
});

const NoteModel = mongoose.model("notes", NoteSchema);
module.exports = NoteModel;