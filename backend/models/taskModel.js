const db = require("../db");

/**
 * Retrieves all tasks from the database, ordered by creation date in descending order.
 * @returns {Promise<Array>} An array of task objects representing all tasks in the database.
 */
const getTasks = async () => {
  const res = await db.query(
    //correct this SQL query to select all tasks from the database
    "SELECT * FROM tasks ORDER BY created_at DESC"
  );
  return res.rows;
};

/**
 * Inserts a new task into the database with the provided title and description.
 * Sets the task's is_complete status to false and records the current timestamp.
 * @param {string} title - The title of the task.
 * @param {string} description - The description of the task.
 * @returns {Promise<Object>} The inserted task object, including its generated id and timestamps.
 */
const addTask = async (title, description) => {
  const res = await db.query(
    "INSERT INTO tasks (title, description, is_complete, created_at) VALUES ($1, $2, false, NOW()) RETURNING *",
    [title, description]
  );
  return res.rows[0];
};

module.exports = { getTasks, addTask };
