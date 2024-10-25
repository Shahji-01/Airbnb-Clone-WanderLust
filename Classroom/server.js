const express = require("express");
const app = express();
const users = require("./routes/users");
const posts = require("./routes/post");
const cookieParser = require('cookie-parser');
const session = require("express-session");
const flash = require('connect-flash');

app.use(cookieParser("secretcode"));
app.use(flash());

const port = 8080;
app.listen(port, () => {
    console.log(`server is listening to port:${port}.`);
});

// Routes
app.use("/users", users);
app.use("/post", posts);



/// ###################################
// Cookies

// // sent cookie to web browser
// app.get("/getCookies",(req,res)=>{
//     res.cookie("greet","Jai jinendera");
//     res.cookie("follow","jainism");
//     res.send("I gave you some cookies.");
// });

// app.get("/",(req,res)=>{
//     console.log(req.cookies);
//     res.send("printing cookies");
// });

// app.get("/greet",(req,res)=>{
//     let {name="strange"}=req.cookies;
//     res.send(`Hello,${name}`);
// });

// // Send Signed Cookies
// app.get("/getsignedCookies",(req,res)=>{
//     res.cookie("made-In","India",{signed:true});
//     res.send("signed cookies sent");
// });

// // Verifying the signed cookies 
// app.get("/verified",(req,res)=>{
//     console.log(req.signedCookies);
//     res.send("verified");
// });

/// ####################### 

// Express Sessions and connect-flash

app.use(session({ secret: 'MyString', resave: false, saveUninitialized: true }));

app.use((req,res,next)=>{
    res.locals.success=req.flash("success");
    res.locals.error=req.flash("error");
    next();
});

app.get("/", (req, res) => {
    res.send("session test");
});

app.get("/register",(req,res)=>{
    let {name="stranger"}=req.query;
    console.log(req.session);
    req.session.name=name;
    if(name==="stranger"){
        req.flash("error","User is not registered!");
    }else{
        req.flash("success","User is registered successfully!");
    }
        res.redirect("/greet");
});

app.get("/greet",(req,res)=>{
    res.render("page.ejs",{name:req.session.name});
    // res.render("page.ejs",{name:req.session.name,msg:req.flash("success")});
    // res.send(`Hello ${req.session.name}`);
});

//  count the session request;
app.get("/reqcount", (req, res) => {
    if (req.session.count) {
        req.session.count++;
    } else {
        req.session.count = 1;
    }
    res.send(`You sent the session request ${req.session.count} times.`);
});
