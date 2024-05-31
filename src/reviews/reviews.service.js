const knex = require("../db/connection");

async function read(reviewId) {
  const review = await knex.raw(`
  select *
  from reviews
  where review_id = ${reviewId}
  `);
  return review[0];
}

async function getCritic(criticId) {
  return await knex.raw(`
   select *
   from critics
   where critic_id = ${criticId}
   `);
}

async function destroy(reviewId) {
  return await knex.raw(
    `delete from reviews
    where review_id = ${reviewId}`
  );
}

async function update(reviewToUpdate, id) {
  // couldnt get preferred method .raw to work,
  return await knex("reviews")
    .select("*")
    .where({ review_id: id })
    .update({ ...reviewToUpdate });
}

module.exports = {
  read,
  delete: destroy,
  getCritic,
  update,
};
