const knex = require("../db/connection");

async function list() {
  const theaters = await knex("theaters")
    .select("*");
  return theaters;
}

async function listMovies(theaterId) {
  const movies = await knex("movies_theaters as mt")
    .select("m.*", "mt.created_at", "mt.updated_at", "mt.is_showing", "mt.theater_id")
    .innerJoin("movies AS m", "m.movie_id", "mt.movie_id") // Use innerJoin for clearer intent
    .where({ "mt.theater_id": theaterId });
  return movies;
}

async function listTheaterbyMovieId(movieId) {
  const theaters = await knex("theaters as t")
    .select("t.*", "mt.is_showing", "mt.movie_id")
    .innerJoin("movies_theaters AS mt", "t.theater_id", "mt.theater_id")
    .where({ "mt.movie_id": movieId });
  return theaters;
}
module.exports = {
  list,
  listMovies,
};
