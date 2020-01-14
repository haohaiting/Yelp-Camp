var express     = require("express"),
    app         = express(),
    bodyParser  = require("body-parser"),
    expressSanitizer = require("express-sanitizer"),
    mongoose    = require("mongoose"),
    Campground  = require("./models/campground"),
    Comment     = require("./models/comment"),
    // User        = require("./models/user"),
    seedDB      = require("./seeds");

seedDB();

// connect to database
mongoose.connect("mongodb://localhost/yelp_camp", {useNewUrlParser: true, useUnifiedTopology: true });

// app config
app.use(express.static(__dirname + "/public"));
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: true}));
app.use(expressSanitizer());
        
// landing page
app.get('/', function(req, res) {
    res.render("landing");
});

// INDEX a page display campgrounds
app.get('/campgrounds', function(req, res) {
    Campground.find({}, function(err, allCampgrounds) {
        if (err) {
            console.log(err);
        } else {
            res.render("campgrounds/index", {campgrounds: allCampgrounds});
        }
    });
});

// CREATE
app.post('/campgrounds', function(req, res) {
    req.body.camp.body = req.sanitize(req.body.camp.body);
    // insert the new camp to database
    Campground.create(req.body.camp, function(err, newlyCreated) {
            if (err) {
                console.log(err);
            } else {
                // console.log("Newly created campground!");
                res.redirect("/campgrounds");
            }
        });
});

// NEW
app.get('/campgrounds/new', function(req, res) {
    res.render("campgrounds/new");
});

// SHOW - show more info about the camp
app.get('/campgrounds/:id', function(req, res) {
    // find the campground with provided ID
    Campground.findById(req.params.id).populate('comments').exec(function(err, foundCampground) {
        if (err) {
            console.log(err);
        } else {
            // console.log(foundCampground);
            // render the show template by found campground
            res.render("campgrounds/show", {campground: foundCampground});
        }
    });
});

// ========================
// Comment Routes
// ========================

// NEW
app.get("/campgrounds/:id/comments/new", function(req, res) {
    // find campground by id
    Campground.findById(req.params.id, function(err,foundCampground) {
        if(err){
            console.log(err);
        } else {
            res.render("comments/new", {campground: foundCampground});
        }
    });
});

// CREATE
app.post("/campgrounds/:id/comments", function(req, res) {
    req.body.comment.body = req.sanitize(req.body.comment.body);
    // find campground by id
    Campground.findById(req.params.id, function(err, campground) {
        if (err) {
            console.log(err);
        } else {
            // create new comment
            Comment.create(req.body.comment, function(err, comment) {
                if (err) {
                    console.log(err);
                } else {
                    // push the comment to the specific campground
                    campground.comments.push(comment);
                    campground.save();
                    // redirect to campground show page
                    // res.redirect("/campgrounds/" + campground._id);
                    res.redirect("/campgrounds/" + req.params.id);
                }
            });
        }
    });
});

app.listen("8000", "localhost", function() {
    console.log("Server is listening...");
});