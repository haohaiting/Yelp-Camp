var express = require("express");
var router = express.Router({mergeParams: true});

var Campground = require("../models/campground");
var Comment = require("../models/comment");

var middleware = require("../middleware");

// NEW
router.get("/new", middleware.isLoggedIn, function (req, res) {
    // find campground by id
    Campground.findById(req.params.id, function (err, foundCampground) {
        if (err) {
            console.log(err);
        } else {
            res.render("comments/new", {
                campground: foundCampground
            });
        }
    });
});

// CREATE
router.post("/", middleware.isLoggedIn, function (req, res) {
    req.body.comment.body = req.sanitize(req.body.comment.body);
    // find campground by id
    Campground.findById(req.params.id, function (err, campground) {
        if (err) {
            req.flash("error", "Something went wrong.");
            // console.log(err);
        } else {
            // create new comment
            Comment.create(req.body.comment, function (err, comment) {
                if (err) {
                    console.log(err);
                } else {
                    // add username an id to comment and save
                    comment.author.id = req.user._id;
                    comment.author.username = req.user.username;
                    comment.save();
                    console.log(comment);
                    // push the comment to the specific campground and save
                    campground.comments.push(comment);
                    campground.save();
                    // redirect to campground show page
                    // req.flash("success", "Successfully added comment!");
                    res.redirect("/campgrounds/" + req.params.id);
                }
            });
        }
    });
});


// EDIT
router.get("/:comment_id/edit", middleware.checkCommentOwnership, function (req, res) {
    Comment.findById(req.params.comment_id, function(err, foundComment){
        if(err){
            // console.log(err);
            req.flash("error", err.message);
            res.redirect("back");
        } else {
            res.render("comments/edit", {
                campground_id: req.params.id,
                comment: foundComment
            });
        }
    });
});

// UPDATE
router.put("/:comment_id", middleware.checkCommentOwnership, function (req, res) {
    Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, function (err, updatedComment) {
        if(err){
            // console.log(err);
            res.flash("error", err.message);
            res.redirect("back");
        } else {
            // req.flash("success", "Comment updated.");
            res.redirect("/campgrounds/" + req.params.id);
        }
    });
});


// Destroy
router.delete("/:comment_id", middleware.checkCommentOwnership, function (req, res) {
    Comment.findByIdAndRemove(req.params.comment_id, function (err) {
        // req.flash("success", "Comment deleted.");
        res.redirect("/campgrounds/" + req.params.id);
    });
});

module.exports = router;