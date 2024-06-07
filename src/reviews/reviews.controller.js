const service = require("./reviews.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");

async function destroy(req, res) {
  const { review } = res.locals;
  await service.delete(review.review_id);
  res.sendStatus(204);
}
async function update(req, res) {
  const { review } = res.locals;
  const { reviewToUpdate } = res.locals;
  await service.update(reviewToUpdate, review.review_id);
  const result = await service.read(review.review_id);
  const critic = await service.getCritic(review.critic_id);
  const response = { ...reviewToUpdate, critic: critic };

  res.status(200).json({ data: response });
}

//--------------------middleware-------------------------
async function reviewExists(req, res, next) {
  const { reviewId } = req.params;
  const review = await service.read(reviewId);

  if (review) {
    res.locals.review = review;
    return next();
  }
  return next({ status: 404, message: `Review cannot be found` });
}

function hasScoreAndBody(req, res, next) {
  const { data: { score = null, content = null } = {} } = req.body;
  let updatedReview = {};
  if (!score && !content) {
    return next({ status: 400, message: "must include score or content" });
  } else {
    updatedReview = {
      ...res.locals.review,
      ...req.body.data,
      review_id: res.locals.review.review_id,
    };
  }

  res.locals.reviewToUpdate = updatedReview;
  next();
}

module.exports = {
  delete: [asyncErrorBoundary(reviewExists), asyncErrorBoundary(destroy)],
  update: [
    asyncErrorBoundary(reviewExists),
    hasScoreAndBody,
    asyncErrorBoundary(update),
  ],
};
