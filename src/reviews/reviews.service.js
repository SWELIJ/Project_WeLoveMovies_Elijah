const knex = require("../db/connection");

async function read(reviewId) {
  const review = await knex("reviews")
    .select("*")
    .where({ review_id: reviewId })
    .first(); // Fetch the first matching row
  return review;
}

async function getCritic(criticId) {
  const critic = await knex("critics")
    .select("*")
    .where({ critic_id: criticId })
    .first();
  return critic;
}

async function destroy(reviewId) {
  const deletedCount = await knex("reviews")
    .where({ review_id: reviewId })
    .delete();
  return deletedCount; // Returns the number of rows deleted
}

async function update(reviewToUpdate, id) {
  const updatedCount = await knex("reviews")
    .where({ review_id: id })
    .update(reviewToUpdate);
  return updatedCount; // Returns the number of rows updated
}

module.exports = {
  read,
  delete: destroy,
  getCritic,
  update,
};
