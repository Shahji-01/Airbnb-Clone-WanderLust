const express = require("express");
const WrapAsync = require("../util/WrapAsync");
const router = express.Router();
const User = require("../models/users");
const passport = require("passport");
const {saveRedirectUrl}=require("../middleware");
const UserController=require("../controller/user");

router.route("/signup")
    .get(UserController.signup)
    .post( WrapAsync(UserController.renderSignUp));

router.route("/login")
    .get( UserController.renderLoginForm)
    .post(
        saveRedirectUrl,
        passport.authenticate("local",
            {
                failureRedirect: "/login",
                failureFlash: true,

            }),
            UserController.login
    );


router.get("/logout",UserController.logout);

module.exports = router;