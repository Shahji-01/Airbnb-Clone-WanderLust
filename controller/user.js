const User = require("../models/users");
module.exports.signup=(req, res) => {
    res.render("users/signup.ejs");
};

module.exports.renderSignUp=async (req, res) => {
    try {
        let { username, email, password } = req.body;
        let newUser = new User({ username, email });
        let newUserRegister = await User.register(newUser, password);
        // console.log(newUserRegister);
        req.login(newUserRegister, (err) => {
            if (err) {
                return next(err);
            }
            req.flash("success", "Welcome to WonderLust!");
            res.redirect("/listings");
        })
    } catch (er) {
        req.flash("error", er.message);
        res.redirect("/signup");
    }
};

module.exports.renderLoginForm=(req, res) => {
    res.render("users/login.ejs");
};

module.exports.login= async (req, res) => {
    req.flash("success", "Welcome Back To WanderLust!");
    let redirectUrl=res.locals.redirectUrl || "/listings";
    res.redirect(redirectUrl);
};

module.exports.logout=(req, res, next) => {
    req.logOut((err) => {
        if (err) {
            return next(err);
        }
        req.flash("success", "You Logout SuccessFully!");
        res.redirect("/listings");
    })
};