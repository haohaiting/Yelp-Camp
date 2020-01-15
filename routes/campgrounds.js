var express = require("express");
var router = express.Router();
var Campground = require("../models/campground");
var middleware = require("../middleware");

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
router.post('/', middleware.isLoggedIn, function (req, res) {
    var name = req.body.name,
        price = req.body.price,
        image = req.body.image,
        desc = req.body.description,
        author = {
            id: req.user._id,
            username: req.user.username
        };
    var newCamp = {
        name: name,
        price: price,
        image: image,
        description: desc,
        author: author
    };
    // insert the new camp to database
    Campground.create(newCamp, function (err, newlyCreated) {
        if (err) {
            console.log(err);
        } else {
            req.flash("success", "Successfully created a new Campground! ^_^");
            // console.log("Newly created campground!");
            res.redirect("/campgrounds");
        }
    });
});

// NEW
router.get('/new', middleware.isLoggedIn, function (req, res) {
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
router.get("/:id/edit", middleware.checkCampgroundOwnership, function (req, res) {
    Campground.findById(req.params.id, function (err, foundCampground) {
        res.render("campgrounds/edit", { campground: foundCampground });
    });
});

// Update Campground Route
router.put("/:id", middleware.checkCampgroundOwnership, function (req, res) {
    // find and update the correct campground
    Campground.findByIdAndUpdate(req.params.id, req.body.campground, 
                                 function(err, updatedCampground) {
       if(err){
           console.log(err);
           res.redirect("/campgrounds");
       } else{
           // redirect to somewhere (showpage)
           req.flash("success", "Campground updated ^_^");
           res.redirect("/campgrounds/" + req.params.id);
       }
    }); 
});


// Destroy Campground Route
router.delete("/:id", middleware.checkCampgroundOwnership, function (req, res) {
    Campground.findByIdAndRemove(req.params.id, function(err) {
        req.flash("success", "Campground deleted ... X_X");
        res.redirect("/campgrounds");
    });
});

module.exports = router;