const mongoose = require("mongoose");

const NoteSchema = mongoose.Schema({
    title: {type: String},
    content: {type: String},
    tag: {type: String},
    date: {type: String}
});

module.exports = mongoose.model("Note", NoteSchema);
