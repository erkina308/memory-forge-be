const express = require("express");
const router = express.Router();
const {
  validateFlashcardInput,
} = require("../authentication/validationMiddleware");
const {
  postFlashcard,
  getFlashcards,
  getFlashcardById,
  patchFlashcardById,
  deleteFlashcardById,
  searchFlashcard,
} = require("../controllers/flashcardsController");

//create flashcard //'next' will be used when creating advanced error handling //user_id needs to change later on to be dynamic

router.post("/", validateFlashcardInput, postFlashcard);

//get all flashcards

router.get("/", getFlashcards);

//get flashcard by id

router.get("/:flashcard_id", getFlashcardById);

//update a flashcard by id //user_id needs to change later on to be dynamic

router.patch("/:flashcard_id", validateFlashcardInput, patchFlashcardById);

//delete a flashcard

router.delete("/:flashcard_id", deleteFlashcardById);

//search for a specific flashcard

router.get("/search", searchFlashcard);

module.exports = router;
