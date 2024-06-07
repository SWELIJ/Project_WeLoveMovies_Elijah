const knex = require("../db/connection");
async function list() {
  return await knex('movies').select('*');
}

async function listShowing() {
  return await knex('movies as m')
    .distinct()
    .select('m.movie_id', 'm.title', 'm.runtime_in_minutes', 'm.rating', 'm.description', 'm.image_url')
    .join('movies_theaters as mt', 'mt.movie_id', 'm.movie_id')
    .where('mt.is_showing', true);
}

async function read(movieId) {
  return await knex('movies').where('movie_id', movieId).select('*');
}

async function theatersShowing(movieId) {
  return await knex('theaters as t')
    .distinct()
    .select('t.*', 'mt.movie_id', 'mt.is_showing')
    .join('movies_theaters as mt', 'mt.theater_id', 't.theater_id')
    .where('mt.movie_id', movieId);
}

async function movieReviews(movieId) {
  return await knex('reviews as r')
    .distinct()
    .select('r.*', 'c.*')
    .leftJoin('critics as c', 'c.critic_id', 'r.critic_id')
    .where('r.movie_id', movieId);
}

module.exports = {
  list,
  listShowing,
  read,
  theatersShowing,
  movieReviews,
};
