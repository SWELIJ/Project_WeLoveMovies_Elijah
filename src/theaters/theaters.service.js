const knex = require("../db/connection");

async function list() {
  return await knex.raw(`
    select * 
    from theaters
    `);
}

async function listMovies(theaterId) {
  return await knex.raw(`
    select m.*, mt.created_at, mt.updated_at, mt.is_showing, mt.theater_id
    from movies_theaters AS mt
    join movies AS m ON m.movie_id = mt.movie_id
    where mt.theater_id = ${theaterId};
  `);
}

async function listTheaterbyMovieId(movieId) {
  return knex.raw(`
    select t.*, mt.is_showing, mt.movie_id
    from theaters AS t
    join movies_theaters AS mt ON t.theater_id = mt.theater_id
    where mt.movie_id = ${movieId};
  `);
}
module.exports = {
  list,
  listMovies,
};
