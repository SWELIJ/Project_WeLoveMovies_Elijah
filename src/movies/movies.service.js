const knex = require("../db/connection");

async function list() {
  return await knex.raw(`
    select * from movies
    `);

}

async function listShowing() {
  return await knex.raw(`
    select distinct
      m.movie_id,
      m.title,
      m.runtime_in_minutes,
      m.rating,
      m.description,
      m.image_url
    from movies as m
    join movies_theaters as mt 
    on mt.movie_id = m.movie_id
    where mt.is_showing = true;
  `);
}

async function read(movieId) {
  return await knex.raw(`
    select *
    from movies
    where movie_id = ${movieId}
    `);
}

async function theatersShowing(movieId) {
  return await knex.raw(`
        select distinct
        t.*,
        mt.movie_id,
        mt.is_showing
        from theaters as t
        join movies_theaters as mt
        on mt.theater_id = t.theater_id
        where mt.movie_id = ${movieId}
        `);
}
async function movieReviews(movieId) {
  return await knex.raw(`
    select distinct
    r.*,
    c.*
    from reviews as r
    full join critics as c
    on c.critic_id = r.critic_id
    where r.movie_id = ${movieId}
    `)
}

module.exports = {
  list,
  listShowing,
  read,
  theatersShowing,
  movieReviews,
};
