var express     = require("express"),
    app         = express(),
    bodyParser  = require("body-parser"),
    expressSanitizer = require("express-sanitizer"),
    mongoose    = require("mongoose"),
    flash       = require("connect-flash"),
    passport    = require("passport"),
    LocalStrategy = require("passport-local"),
    methodOverride = require("method-override"),
    Campground  = require("./models/campground"),
    Comment     = require("./models/comment"),
    User        = require("./models/user"),
    seedDB      = require("./seeds");

// requring routes
var commentRoutes = require("./routes/comments"),
    campgroundRoutes = require("./routes/campgrounds"),
    indexRoutes = require("./routes/index");

// connect to database
console.log(process.env.DATABASEURL);
mongoose.connect(process.env.DATABASEURL, {useNewUrlParser: true, useUnifiedTopology: true });
// var uri = 'mongodb+srv://Haiting:djnlvWp8d5jQdDCd@cluster0-n84cl.mongodb.net/test?retryWrites=true&w=majority';

// mongoose.connect(uri, {
//     useUnifiedTopology: true,
//     useNewUrlParser: true
// }).then(() => console.log('Connected')
// ).catch(err => console.log('Caught', err.stack));

// app config
app.use(express.static(__dirname + "/public"));
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: true}));
app.use(expressSanitizer());
app.use(methodOverride("_method"));
app.use(flash());

// seed the database
// seedDB();

// passport config
app.use(require("express-session")({
    secret: "Kuma is the best",
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function (req, res, next) {
    res.locals.currentUser = req.user;
    res.locals.error = req.flash("error");
    res.locals.success = req.flash("success");
    res.locals.info = req.flash("info");
    res.locals.warning = req.flash("warning");
    next();
});

app.use("/campgrounds", campgroundRoutes);
app.use("/campgrounds/:id/comments", commentRoutes);
app.use(indexRoutes);


const PORT = process.env.PORT || 8080;

app.listen(PORT, process.env.IP, function() {
    console.log("Server is listening...");
});