if (process.env.NODE_ENV != "production") {
  require("dotenv").config();
}
// console.log(process.env.SECRET);

//All Requrie's
const express = require("express");
const app = express();
const path = require("path");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");
const mongoose = require("mongoose");
const ExpressError = require("./util/ExpressError.js");
const listings_route = require("./routes/listings.js");
const reviews_route = require("./routes/review.js");
const users_route = require("./routes/user.js");
const session = require("express-session");
const MongoStore = require("connect-mongo");
const { date } = require("joi");
const flash = require("connect-flash");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const User = require("./models/users.js");
const { serialize } = require("v8");
const list = require("./models/listening.js");

// const MongoDb_url = "mongodb://127.0.0.1:27017/WanderLust";
const DbUrl=process.env.ATLASDB_URL;

const store=MongoStore.create({
    mongoUrl:DbUrl,
    crypto:{
         secret: process.env.SECRET,
    },
    touchAfter:24*3600,
});

store.on("error",()=>{
    console.log("Error in mongostore.",err);
})

const sessionOption = {
  store,
  secret: process.env.SECRET,
  resave: false,
  saveUninitialized: true,
  cookie: {
    expires: Date.now() + 7 * 24 * 60 * 60 * 1000,
    mazAge: 7 * 24 * 60 * 60 * 1000,
    httpOnly: true,
  },
};

app.use(session(sessionOption));
app.use(flash());

//passport
app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(methodOverride("_method"));
app.engine("ejs", ejsMate);
// for views(ejs)
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
// for public
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// getting-started.js

main()
  .then(() => {
    console.log("db connection is done.");
  })
  .catch((err) => console.log(err));

async function main() {
  await mongoose.connect(DbUrl);
}

const port = 8080;
app.listen(port, () => {
  console.log(`server is listening to port:${port}.`);
});

app.use((req, res, next) => {
  res.locals.success = req.flash("success");
  res.locals.error = req.flash("error");
  res.locals.CurrUser = req.user;
  next();
});

// demouser
// app.get("/signup",async(req,res)=>{
//     let fakeUser=new User({
//         email:"fake69@gmail.com",
//         username:"faker"
//     });
//     let fakeUserReg=await User.register(fakeUser,"fakepassword");
//     res.send(fakeUserReg);
// });

// routes
app.use("/listings", listings_route);
app.use("/listings/:id/reviews", reviews_route);
app.use("/", users_route);

app.all("*", (req, res, next) => {
  next(new ExpressError(404, "Page Not Found"));
});
app.use((err, req, res, next) => {
  let { status = 500, message = "Something Went Wrong" } = err;
  // res.status(status).send(message);
  res.status(status).render("err.ejs", { err });
});
// app.get("/testListening",async (req,res)=>{
//     let samplelist=list({
//         title:"The Goa",
//         desciption:"Hii,Welcome to Goa have fun.",
//         price:1000,
//         location:"right of goa beach",
//         country:"India"
//     });
//     await samplelist.save();
//     res.send("data is saved");
//     console.log("sampletesting is done.");
// });
