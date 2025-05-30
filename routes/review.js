const express = require ("express");
const router = express.Router({mergeParams: true});
const wrapAsync = require("../utils/wrapAsync.js");
const ExpressError = require("../utils/ExpressError.js");
const { reviewSchema } = require("../schema.js");
const Listing = require("../models/listing.js");
const Review = require("../models/review.js");

//Midddleware function forj validation

const validateReview = (req, res, next) => {
  let { error } = reviewSchema.validate(req.body);
  
  if (error) {
    let errMsg = error.details.map(el => el.message).join(", ");
    throw new ExpressError(400, errMsg);
  } else {
    next();
  }
};



//reviews
//Post Route
router.post("/", validateReview, wrapAsync (async(req,res,next)=>{
 let listing = await Listing.findById(req.params.id);
 let newReview = new Review(req.body.review)

 listing.reviews.push(newReview);
 await newReview.save();
 await listing.save();
 res.redirect(`/listings/${listing._id}`);
}));



//delete review route
router.delete("/:reviewId", wrapAsync(async (req, res,next) => {
  const { id, reviewId } = req.params;
  await Listing.findByIdAndUpdate(id, { 
    $pull: { reviews: reviewId } 
  });
  await Review.findByIdAndDelete(reviewId);
  res.redirect(`/listings/${id}`);
}));

module.exports = router;