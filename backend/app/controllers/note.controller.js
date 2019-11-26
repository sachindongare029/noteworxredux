const Note = require("../models/note.model.js");

// Display Notes
exports.display = function(req, res) {
  Note.find(function(err, Note) {
    if (err) { 
      return (err);
    };
    res.send(Note.sort( function  (a,b) {
        return new Date(b.date) - new Date(a.date);
      })
    );
  });
};

// Create Notes
exports.create = function(req, res) {
  let NoteObj = new Note({
    title: req.body.title,
    content: req.body.content,
    tag: req.body.tag,
    date: new Date()
  });

  NoteObj.save(function(err) {
    if (err) {
      return (err);
    }
    res.send(NoteObj);
  });
};

// Display by Title
exports.notes = function(req, res) {
  var title = req.params.title;
  Note.find({ title: { $regex: title } }, function(err, Note) {
    if (err) {
      return err;
    }
    res.send(Note);
  });
};

// Display by ID
exports.searchById = function(req, res) {
  var id = req.params.id;
  Note.findById(id, function(err, Note) {
    if (err) { 
      return (err) 
    };
    res.send(Note);
  });
};

// Delete by ID
exports.delete = function(req, res) {
  Note.findByIdAndRemove(req.params.id, function(err) {
    if (err) return err;
    res.send("Deleted successfully!");
  });
};

// Update by id
exports.update = function(req, res) {
  Note.findByIdAndUpdate(req.params.id, { $set: req.body }, function(
    err,
    product
  ) {
    if (err) return(err);
    res.send("Product udpated.");
  });
};