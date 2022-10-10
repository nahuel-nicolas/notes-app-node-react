const express = require("express");
const app = express();
const mongoose = require("mongoose");
const NoteModel = require("./models/Notes");

const cors = require("cors");

app.use(express.json());
app.use(cors());

mongoose.connect(
    'mongodb://localhost:27017/mongoprojects'
);

// mongoose.connect(
//   "mongodb+srv://user123:Password123Tech@cluster0.j7fql.mongodb.net/merntutorial?retryWrites=true&w=majority"
// );

// app.get("/getUsers", (req, res) => {
//   UserModel.find({}, (err, result) => {
//     if (err) {
//       res.json(err);
//     } else {
//       res.json(result);
//     }
//   });
// });

// app.post("/createUser", async (req, res) => {
//   const user = req.body;
//   const newUser = new UserModel(user);
//   await newUser.save();

//   res.json(user);
// });

app.get("/notes/", (req, res) => {
  NoteModel.find({}, (err, result) => {
    if (err) {
      return res.json(err);
    } else {
      return res.json(result);
    }
  });
});

app.get("/notes/:note_id", (req, res) => {
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

app.put("/notes/:note_id", async (req, res) => {
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

app.delete("/notes/:note_id", (req, res) => {
  NoteModel.findByIdAndDelete(req.params.note_id, (err, result) => {
    if (err) {
      res.json(err);
    } else {
      res.json(result);
    }
  });
});

app.get("/try/waw", (req, res) => {
    res.json({
        'hello': 'paula FUCKING ASSHOLE'
    })
});

app.get("/notes", (req, res) => {
    res.json({
        'hello': 'nahuel'
    })
});

app.listen(3001, () => {
  console.log("SERVER RUNS PERFECTLY!");
});

function get_current_isodatetimestring() {
  const currentdate = new Date();
  return currentdate.toISOString();
}

// var currentdate = new Date(); 
// var current_datetimestring = currentdate.getDate() + "-"
//                 + (currentdate.getMonth()+1)  + "-" 
//                 + currentdate.getFullYear() + " "  
//                 + currentdate.getHours() + ":"  
//                 + currentdate.getMinutes() + ":" 
//                 + currentdate.getSeconds();
// var current_isodatetime = currentdate.toISOString();