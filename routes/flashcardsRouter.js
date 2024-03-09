const express = require("express");
const router = express.Router();
const db = require("../connection");

//create flashcard //'next' will be used when creating advanced error handling //user_id needs to change later on to be dynamic

router.post("/", async (req, res, next) => {
  try {
    const { question, answer } = req.body;
    const newFlashcard = await db.query(
      `INSERT INTO flashcards (user_id, question, answer) VALUES (1, $1, $2) RETURNING *;`,
      [question, answer]
    );

    res.json(newFlashcard.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
});

//get all flashcards

router.get("/", async (req, res, next) => {
  try {
    const allFlashcards = await db.query(`SELECT * FROM flashcards;`);
    res.json(allFlashcards.rows);
  } catch (err) {
    console.error(err.message);
  }
});

//get flashcard by id

router.get("/:flashcard_id", async (req, res, next) => {
  try {
    const { flashcard_id } = req.params;
    const flashcardById = await db.query(
      `SELECT * FROM flashcards WHERE flashcard_id = $1;`,
      [flashcard_id]
    );
    res.json(flashcardById.rows);
  } catch (err) {
    console.error(err.message);
  }
});

//update a flashcard by id //user_id needs to change later on to be dynamic

router.patch("/:flashcard_id", async (req, res, next) => {
  try {
    const { flashcard_id } = req.params;
    const { question, answer } = req.body;
    const updateFlashcardById = await db.query(
      `UPDATE flashcards SET question = $1, answer = $2 WHERE flashcard_id = $3 RETURNING *;`,
      [question, answer, flashcard_id]
    );
    res.json(updateFlashcardById.rows);
  } catch (err) {
    console.error(err.message);
  }
});

//delete a flashcard

router.delete("/:flashcard_id", async (req, res, next) => {
  try {
    const { flashcard_id } = req.params;
    const deleteFlashcardById = await db.query(
      `DELETE FROM flashcards WHERE flashcard_id = $1 RETURNING *;`,
      [flashcard_id]
    );
    res.json(deleteFlashcardById.rows);
  } catch (err) {
    console.error(err.message);
  }
});

module.exports = router;
