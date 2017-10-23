const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const relationship = require("mongoose-relationship");


const noteSchema = new Schema({
	note    : { type: String },
	date: { type: Date, default: Date.now },
	customerId : {type: Schema.Types.ObjectId, ref: "Customer", childPath: "notes" }
});

noteSchema.plugin(relationship, { relationshipPathName:'customerId' });

const Note = mongoose.model("Note", noteSchema);

module.exports = Note;