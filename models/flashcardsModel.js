const db = require("../connection");

//insert flashcard into flashcards table

exports.insertFlashcard = async (user_id, question, answer, topic) => {
  try {
    const newFlashcard = await db.query(
      `INSERT INTO flashcards (user_id, question, answer, topic) VALUES ($1, $2, $3, $4) RETURNING *;`,
      [user_id, question, answer, topic]
    );

    return newFlashcard.rows[0];
  } catch (err) {
    console.error(err.message);
  }
};

//select all flashcards from flashcards table

exports.selectFlashcards = async (
  user_id,
  sort_by = "created_at",
  order = "desc",
  topic
) => {
  if (!["created_at"].includes(sort_by)) {
    return Promise.reject({
      msg: "Invalid sort by query",
    });
  }

  let queryStr = `SELECT * FROM flashcards WHERE user_id = $1`;

  const queryParams = [user_id];

  if (topic) {
    queryStr += `AND topic = $2`;
    queryParams.push(topic);
  }

  queryStr += `ORDER BY ${sort_by} ${order}`;

  const allFlashcards = await db.query(queryStr, queryParams);
  return allFlashcards.rows;
};

//select flashcard by id from flashcards table

exports.selectFlashcardById = async (flashcard_id) => {
  const flashcardById = await db.query(
    `SELECT * FROM flashcards WHERE flashcard_id = $1;`,
    [flashcard_id]
  );
  if (flashcardById.rows.length === 0) {
    return Promise.reject({ status: 404, msg: "Flashcard does not exist" });
  }
  return flashcardById.rows;
};

//update flashcard by id in flashcards table

exports.updateFlashcardById = async (question, answer, flashcard_id) => {
  const updatedFlashcard = await db.query(
    `UPDATE flashcards SET question = $1, answer = $2 WHERE flashcard_id = $3 RETURNING *;`,
    [question, answer, flashcard_id]
  );
  if (updatedFlashcard.rows.length === 0) {
    return Promise.reject({ status: 404, msg: "Flashcard does not exist" });
  }
  return updatedFlashcard.rows;
};

//delete flashcard by id from flashcards table

exports.removeFlashcardById = async (flashcard_id) => {
  const flashcardToDelete = await db.query(
    `DELETE FROM flashcards WHERE flashcard_id = $1 RETURNING *;`,
    [flashcard_id]
  );
  if (flashcardToDelete.rows.length === 0) {
    return Promise.reject({ status: 404, msg: "Flashcard does not exist" });
  }
  return flashcardToDelete.rows;
};

//search for flashcard

exports.findFlashcard = async (query) => {
  const flashcardToSearch = await db.query(
    `SELECT * FROM flashcards WHERE question ILIKE $1 OR answer ILIKE $1`,
    [`%${query}%`]
  );
  if (flashcardToSearch.rows.length === 0) {
    return Promise.reject({ status: 404, msg: "Flashcard does not exist" });
  }
  return flashcardToSearch.rows;
};
