const list = require("../models/listening");
const ExpressError = require("../util/ExpressError");

module.exports.index = (req, res) => {
    list.find().then((data) => {
        res.render("index.ejs", { data });
    })
};
module.exports.newListing = (req, res) => {
    res.render("new.ejs");
};

module.exports.showListing= async (req, res) => {
    let { id } = req.params;
    let iddata = await list.findById(id).populate({
        path: "reviews", populate: {
            path: "author"
        }
    }).populate("owner");
    console.log(iddata);
    if (!iddata) {
        req.flash("error", "No such listing is found!");
        res.redirect("/listings");
    }
    res.render("show.ejs", { iddata });
};

module.exports.createListing=async (req, res, next) => {
    // let {title,description,price,location,country}=req.body;
    // const list1 =new list({
    //     title:title,
    //     description:description,
    //     price:price,
    //     location:location,
    //     country:country
    // });
    // console.log(list1);
    //         or or or  or or or or or or or or or or

    // if(!req.body.list){
    //     next(new ExpressError(400,"Enter a valid input."));
    // }
    let url=req.file.path;
    let filename=req.file.filename;
    console.log(url,filename);
    const list1 = new list(req.body.list);
    list1.owner = req.user._id;
    list1.image={url,filename};
    // validationListing (hoppscotch)
    // if(!list1.description){
    //     next(new ExpressError(400,"description is missing"));
    // }if(!list1.price){
    //     next(new ExpressError(400,"price is missing"));
    // }
    // if(!list1.location){
    //     next(new ExpressError(400,"location is missing"));
    // }  if(!list1.country){
    //     next(new ExpressError(400,"country is missing"));
    // }
    await list1.save();
    req.flash("success", "New Listings is Created!");
    res.redirect("/listings");

};

module.exports.editListing=async (req, res) => {
    let { id } = req.params;
    let iddata = await list.findById(id);
    if(!iddata){
        req.flash("error","Listing you requested for doesn't exit!");
        res.render("listings");
    }
    let originalImg=iddata.image.url;
    originalImg=originalImg.replace("/upload","/upload/w_250");
    res.render("edit.ejs",{iddata,originalImg});

};

module.exports.upadateListing=async (req, res) => {
    let { id } = req.params;
    // let listing=await list.findById(id);
    // if(!listing.owner.equals(res.locals.CurrUser._id)){
    //     req.flash("error","You don't have permession to edit.");
    //     return res.redirect(`/listings/${id}`);
    // }
    if (!req.body.list) {
        next(new ExpressError(400, "Enter a valid input."));
    }
    const updatedata = await list.findByIdAndUpdate(id, { ...req.body.list });

    if(typeof req.file !="undefined"){
    let url=req.file.path;
    let filename=req.file.filename;

    updatedata.image={url,filename};
    await updatedata.save();
    }
    console.log(updatedata);
    req.flash("success", "Listings is Updated!");
    res.redirect(`/listings/${id}`);

};

module.exports.deleteListing=async (req, res) => {
    let { id } = req.params;
    await list.findByIdAndDelete(id);
    console.log("data is deleted.");
    req.flash("success", "Listings Deleted!");
    res.redirect("/listings");
};