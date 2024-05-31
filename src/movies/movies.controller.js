const service = require("./movies.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");

async function list(req, res) {
  const { is_showing } = req.query;

  if (is_showing) {
    const rows = await service.listShowing()
    
    res.status(200).json({data: rows});
  } else {
    const rows = await service.list()
    res.status(200).json({data: rows});
  }
}

async function read(req, res, next) {
 const {movie} = res.locals
  res.json({data: movie[0]});
}

async function getTheatersShowing(req, res){
  const { movieId } = req.params
  const theaters = await service.theatersShowing(movieId)
  if (theaters.length===0){
    res.json({message: `No Theaters Showing`})
  }
  res.json({data: theaters})
}

async function getMovieReviews(req, res) {
  const { movie } = res.locals; 
  const movieId = movie[0].movie_id
    const reviews = await service.movieReviews(movieId)
   
    for(let i =0; i<reviews.length; i++){
      const review = reviews[i]
      review.critic = 
       {
        preferred_name: reviews[i].preferred_name,
        critic_id: reviews[i].critic_id,
        surname: reviews[i].surname,
        organization_name: reviews[i].organization_name,
        created_at: reviews[i].created_at,
        updated_at: reviews[i].updated_at
       }
    }
    res.json({data: reviews}); 
}

//------------------middleware------------------------------------------

async function movieExists(req, res, next) {
  const { movieId } = req.params;
  const movie = await service.read(movieId);
  
  if (movie.length > 0) {
    res.locals.movie = movie;//please note this grabs the entire object for that movie
  return next(); 
  }
    next({
    status: 404,
    message: `Movie "${movieId}" cannot be found.`,
  });
}

//export to router--------------------------------------------------------
module.exports = {
  list: [asyncErrorBoundary(list)],
  read: [asyncErrorBoundary(movieExists), asyncErrorBoundary(read)],
  getTheatersShowing: [asyncErrorBoundary(movieExists), asyncErrorBoundary(getTheatersShowing)],
  getMovieReviews: [asyncErrorBoundary(movieExists), asyncErrorBoundary(getMovieReviews)]
};
