
const router = require("express").Router();
const customerController = require("../../controllers/customerController");

// Matches with "/api/customer"
//isLoggedIn need for authentication
router.route("/")
  .get( customerController.findAll)
  .post(customerController.create);

// Matches with "/api/customer/:id"
router
  .route("/:id")
  .get(customerController.findById)
  .put(customerController.update)
  .delete(customerController.remove);

  router
  .route("/:id/notes")
  .get(customerController.getNotes)
  .post(customerController.createNotes);
  

  module.exports = router;

