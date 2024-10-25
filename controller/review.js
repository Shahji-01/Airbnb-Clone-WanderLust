const list=require("../models/listening");
const Review=require("../models/review");

module.exports.createReview=async (req, res) => {
    let listing = await list.findById(req.params.id);
    let newReview = new Review(req.body.review);
    newReview.author=req.user._id;
    listing.reviews.push(newReview);

    await newReview.save();
    await listing.save();
    console.log("review is saved");
    req.flash("success","New Review is Added!");
    res.redirect(`/listings/${listing.id}`);
};

module.exports.destroyReview=async(req,res)=>{
    let {id,reviewid}=req.params;
    await list.findByIdAndUpdate(id,{$pull:{reviews:reviewid}});
    await Review.findById(reviewid);
    req.flash("success","Review Deleted!");
    res.redirect(`/listings/${id}`);
};