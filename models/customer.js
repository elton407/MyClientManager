const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const relationship = require("mongoose-relationship");


const customerSchema = new Schema({
  userId: {type: String},
  firstName: { type: String},
  lastName: { type: String},
  companyName: { type: String},
  companyAddress: { type: String},
  companyBudget: { type: String},
  companyNotes: { type: String}, 
  dateExpected: { type: Date },
  date: { type: Date, default: Date.now },
  notes: [{ type: Schema.ObjectId, ref: "Note" }]
});

const Customer = mongoose.model("Customer", customerSchema);

module.exports = Customer;