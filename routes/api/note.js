const router = require("express").Router();



const noteController = require("../../controllers/noteController");

// Matches with "/api/note"
router.route("/")
  .get(noteController.findAll)
  .post(noteController.create);

// Matches with "/api/note/:id"
router
  .route("/:id")
  .get(noteController.findById);

  


router
  .route("/:id/notes")
  .delete(noteController.remove)
  .get(noteController.findByNoteById);

  


  module.exports = router;

