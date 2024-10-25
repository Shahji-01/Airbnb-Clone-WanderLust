const express = require("express");
const router = express.Router();
const list = require("../models/listening.js");
const ExpressError = require("../util/ExpressError.js");
const WrapAsync = require("../util/WrapAsync.js");
const { listSchema } = require("../schema.js");
const { IsLoggedIn, IsOwner, validationListing } = require("../middleware.js");
const listingController = require("../controller/listting.js");
const multer  = require('multer');
const {storage}=require("../CloudConfig.js");
const upload = multer({ storage });

// Home route
router.route("/")
    .get(listingController.index)
    .post(IsLoggedIn,upload.single('list[image]'),validationListing,WrapAsync(listingController.createListing));
// New route
router.get("/new", IsLoggedIn, listingController.newListing);

router.route("/:id")
    .get(WrapAsync(listingController.showListing))
    .patch(IsLoggedIn, IsOwner,upload.single('list[image]'), validationListing, WrapAsync(listingController.upadateListing))
    .delete(IsLoggedIn, IsOwner, WrapAsync(listingController.deleteListing));



// edit route
router.get("/:id/edit", IsLoggedIn, IsOwner, WrapAsync(listingController.editListing));


module.exports = router;