const express = require("express");
const mongoose = require("mongoose");
const NoteModel = require("./models/Notes");
const cors = require("cors");

const app = express();

app.use(express.json());
app.use(cors());

mongoose.connect(
    'mongodb://localhost:27017/mongoprojects'
);

app.get("/notes/", (req, res) => {
  NoteModel.find({}, (err, result) => {
    if (err) {
      return res.json(err);
    } else {
      return res.json(result);
    }
  });
});

app.get("/notes/:note_id/", (req, res) => {
  NoteModel.findById(req.params.note_id, (err, result) => {
    if (err) {
      res.json(err);
    } else {
      res.json(result);
    }
  });
});

app.post("/notes/", async (req, res) => {
    // expected req.body = {body:String}
    const note = req.body;
    note.created = note.updated = get_current_isodatetimestring()
    const newNote = new NoteModel(note);
    await newNote.save();
    res.json(note);
});

app.put("/notes/:note_id/", async (req, res) => {
  // expected req.body = {body:String}
  const note = req.body;
  note.updated = get_current_isodatetimestring()
  NoteModel.findByIdAndUpdate(req.params.note_id, note, {returnOriginal: false}, (err, result) => {
    if (err) {
      res.json(err)
    } else {
      res.json(result)
    }
  })
});

app.delete("/notes/:note_id/", (req, res) => {
  NoteModel.findByIdAndDelete(req.params.note_id, (err, result) => {
    if (err) {
      res.json(err);
    } else {
      res.json(result);
    }
  });
});

app.listen(3001, () => {
  console.log("Node server is running!");
});

function get_current_isodatetimestring() {
  const currentdate = new Date();
  return currentdate.toISOString();
}
