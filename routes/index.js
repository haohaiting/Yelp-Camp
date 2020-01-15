var express = require("express");
var router = express.Router();

var passport = require("passport");
var User = require("../models/user");


// Root Route
router.get('/', function (req, res) {
    res.render("landing");
});

// Sign Up
router.get("/register", function (req, res) {
    res.render("register");
});

// Register Form Route
router.post("/register", function (req, res) {
    var newUser = new User({
        username: req.body.username
    });
    User.register(newUser, req.body.password, function (err, user) {
        if (err) {
            // console.log(err);
            req.flash("error", err.message);
            res.redirect("register");
        }
        passport.authenticate("local")(req, res, function () {
            req.flash("success", "Welcome to YelpCamp, " + user.username);
            res.redirect("/campgrounds");
        });
    });
});

// Login Route
router.get("/login", function (req, res) {
    res.render("login");
});

// Login Form
// app.post("dir", middleware, callback)
router.post("/login", passport.authenticate("local", {
    successRedirect: "/campgrounds",
    failureRedirect: "/login",
    failureFlash: true
}), function (req, res) {
});

// Logout Route
router.get("/logout", function (req, res) {
    req.logout();
    req.flash("success", "You have successfully logged out!");
    res.redirect("/campgrounds");
});

module.exports = router;