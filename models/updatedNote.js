const mongoose = require("mongoose");
const Schema = mongoose.Schema;



const updatedNoteSchema = new Schema({
	note: { type: String },
	customerId: { type: String },
	date: { type: Date, default: Date.now }
});



const updatedNote = mongoose.model("updatedNote", updatedNoteSchema);

module.exports = updatedNote;