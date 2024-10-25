const express=require("express");
const router=express.Router({mergeParams:true});
const list = require("../models/listening.js");
const ExpressError = require("../util/ExpressError.js");
const WrapAsync = require("../util/WrapAsync.js");
const { ReviewSchema } = require("../schema.js");
const Review = require("../models/review.js");
const { validationReview, IsLoggedIn, IsAuthor } = require("../middleware.js");
const reviewController=require("../controller/review.js");

// Review Route
// Post review route
router.post("/", IsLoggedIn,validationReview, WrapAsync(reviewController.createReview));

// Post review route
router.delete("/:reviewid",IsLoggedIn,IsAuthor,WrapAsync(reviewController.destroyReview));

module.exports=router;