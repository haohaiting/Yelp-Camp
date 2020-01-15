var express = require("express");
var router = express.Router();
var Campground = require("../models/campground");

// INDEX a page display campgrounds
router.get('/', function (req, res) {
    Campground.find({}, function (err, allCampgrounds) {
        if (err) {
            console.log(err);
        } else {
            res.render("campgrounds/index", {
                campgrounds: allCampgrounds
            });
        }
    });
});

// CREATE
router.post('/', isLoggedIn, function (req, res) {
    var name = req.body.name,
        image = req.body.image,
        desc = req.body.description,
        author = {
            id: req.user._id,
            username: req.user.username
        };
    var newCamp = {
        name: name,
        image: image,
        description: desc,
        author: author
    };
    // insert the new camp to database
    Campground.create(newCamp, function (err, newlyCreated) {
        if (err) {
            console.log(err);
        } else {
            // console.log("Newly created campground!");
            res.redirect("/campgrounds");
        }
    });
});

// NEW
router.get('/new', isLoggedIn, function (req, res) {
    res.render("campgrounds/new");
});

// SHOW - show more info about the camp
router.get('/:id', function (req, res) {
    // find the campground with provided ID
    Campground.findById(req.params.id).populate('comments').exec(function (err, foundCampground) {
        if (err) {
            console.log(err);
        } else {
            // console.log(foundCampground);
            // render the show template by found campground
            res.render("campgrounds/show", {
                campground: foundCampground
            });
        }
    });
});

// Edit Campground Route

router.get("/:id/edit", checkCampgroundOwnership, function(req, res) {
    Campground.findById(req.params.id, function (err, foundCampground) {
        res.render("campgrounds/edit", { campground: foundCampground });
    });
});

// Update Campground Route

router.put("/:id", checkCampgroundOwnership, function(req, res){
    // find and update the correct campground
    Campground.findByIdAndUpdate(req.params.id, req.body.campground, 
                                 function(err, updatedCampground) {
       if(err){
           console.log(err);
           res.redirect("/campgrounds");
       } else{
           // redirect to somewhere (showpage)
           res.redirect("/campgrounds/" + req.params.id);
       }
    }); 
});


// Destroy Campground Route
router.delete("/:id", checkCampgroundOwnership, function (req, res) {
    Campground.findByIdAndRemove(req.params.id, function(err) {
        res.redirect("/campgrounds");
    });
});


// middleware
function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect("/login");
}

function checkCampgroundOwnership(req, res, next){
    if (req.isAuthenticated()) {
        Campground.findById(req.params.id, function (err, foundCampground) {
            if (err) {
                console.log(err);
                res.redirect("back");
            } else {
                // does user own the campground?
                if (foundCampground.author.id.equals(req.user._id)) {
                    next();
                } else {
                    res.redirect("back");
                }
            }
        });
    // if not, redirect
    } else {
        res.redirect("back");
    }
}

module.exports = router;