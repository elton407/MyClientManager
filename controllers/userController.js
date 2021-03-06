const db = require("../models");

module.exports = {

create: function(req, res) {
    db.User
      .create(req.body)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
    findById: function(req, res) {
    db.User
      .findById(req.params.id)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },

  findByUserName: function(req, res) {
    db.User
    .find( { "userName": req.params.userName}, "userName email")
    .then(dbModel => res.json(dbModel))
    .catch(err => res.status(422).json(err));


  },
  findAll: function(req, res) {
    db.User
      .find(req.query)
      .sort({ date: -1 })
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  }


};
