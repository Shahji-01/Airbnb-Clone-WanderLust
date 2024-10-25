const list=require("./models/listening");
const Review=require("./models/review.js");
const { listSchema } = require("./schema");
const { ReviewSchema } = require("./schema.js");
const ExpressError=require("./util/ExpressError.js");

module.exports.IsLoggedIn=(req,res,next)=>{
  // console.log(req.user);
  // console.log(req.path ,"...",req.originalUrl);

    if(!req.isAuthenticated()){
        req.session.redirectUrl=req.originalUrl;
        req.flash("error","You must first login!");
      return  res.redirect("/login");
    }
    next();
};

module.exports.saveRedirectUrl=(req,res,next)=>{
  if(req.session.redirectUrl){
    res.locals.redirectUrl=req.session.redirectUrl;
  }
  next();
};
module.exports.IsOwner=async(req,res,next)=>{
  let { id } = req.params;
  let listing=await list.findById(id);
    if(!listing.owner.equals(res.locals.CurrUser._id)){
        req.flash("error","You don't have permession to edit.");
        return res.redirect(`/listings/${id}`);
    }
    next();
};
// validationListing
module.exports.validationListing= (req, res, next) => {
  let { error } = listSchema.validate(req.body);
  // console.log(result);
  if (error) {
      let errMsg = error.details.map((el) => el.message).join(",");
      throw new ExpressError(400, errMsg);
  } else {
      next();
  }
};
// validationReview
module.exports.validationReview= (req, res, next) => {
  let { error } = ReviewSchema.validate(req.body);
  // console.log(result);
  if (error) {
      let errMsg = error.details.map((el) => el.message).join(",");
      throw new ExpressError(400, errMsg);
  } else {
      next();
  }
};

module.exports.IsAuthor=async(req,res,next)=>{
  let { id,reviewid } = req.params;
  let review=await Review.findById(reviewid);
    if(!review.author.equals(res.locals.CurrUser._id)){
        req.flash("error","You don't have permession to delete.");
        return res.redirect(`/listings/${id}`);
    }
    next();
};