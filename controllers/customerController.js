const db = require("../models");
//const Note = require("../models/note");
const customerDB = require("../models/customer");
// Defining methods for the booksController
module.exports = {
  findAll: function(req, res) {
  if (req.user) {
    db.Customer
      .find({"userId": req.user.username})
      .sort({ date: -1 })
      .then(dbModel => res.json({results: dbModel, sess: req.session}))
      .catch(err => res.status(422).json(err));
  }
    else { res.json({ error: "Please login", statusCode: 401 }) }
  },
  findById: function(req, res) {
  if (req.user) {
    db.Customer
      .findById(req.params.id)
      .then(dbModel => res.json({results: dbModel, sess: req.session}))
      .catch(err => res.status(422).json(err));
  }
    else { res.json({ error: "Please login", statusCode: 401 }) }
  },
  create: function(req, res) {
  if (req.user) {
    db.Customer
      .create(req.body)
      .then(dbModel => res.json({results: dbModel, sess: req.session}))
      .catch(err => res.status(422).json(err));
  }
    else { res.json({ error: "Please login", statusCode: 401 }) }
  },
  update: function(req, res) {
  if (req.user) {
    db.Customer
      .findOneAndUpdate({ _id: req.params.id }, req.body)
      .then(dbModel => res.json({results: dbModel, sess: req.session}))
      .catch(err => res.status(422).json(err));
  }
    else { res.json({ error: "Please login", statusCode: 401 }) }
  },
  remove: function(req, res) {
  if (req.user) {
    db.Customer
      .findById({ _id: req.params.id })
      .then(dbModel => dbModel.remove())
      .then(dbModel => res.json({results: dbModel, sess: req.session}))
      .catch(err => res.status(422).json(err));
  }
    else { res.json({ error: "Please login", statusCode: 401 }) }
  },
  getNotes: function(req, res) {
    const {id} = req.params;
    const customer = customerDB.findById(id);
    console.log('customer', customer);
  },
  createNotes: function(req, res) {
   
    const newNote = new Note(req.body);
   
    newNote.customerId = req.params.id ;
    console.log(newNote);
    //save car with changes
    newNote.save();

    res.status(201).json(newNote);


  }
};
