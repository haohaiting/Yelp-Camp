var mongoose = require("mongoose"),
    Campground = require("./models/campground"),
    Comment = require("./models/comment")

var data = [
    {
        name: "Stone",
        image: "https://images.unsplash.com/photo-1471115853179-bb1d604434e0?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1000&q=60",
        description: "Definately an awesome place!!!"
    },
    {
        name: "Brook",
        image: "https://images.unsplash.com/photo-1500581276021-a4bbcd0050c5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1000&q=60",
        description: "I've never been there before. But I fell in love with the image..."
    },
    {
        name: "Beach Park",
        image: "https://images.unsplash.com/photo-1475483768296-6163e08872a1?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80",
        description: "Camping is the best. Beach Park is the beat place for camping in summer!!"
    }
]

function seedDB() {
    Campground.deleteMany({}, (err) => {
        if (err) {
            console.log(err);
        } else {
            // remove all campgrounds
            console.log("Removed all campgrounds!");
            // add a few campgrounds
            data.forEach(function (seed) {
                Campground.create(seed, (err, campground) => {
                    if (err) {
                        console.log(err);
                    } else {
                        console.log("Added a campground!");
                        // add a few comments
                        Comment.create({
                            text: "I went this place last year. It's awesome! But I wish there's Wi-Fi...",
                            author: "No one"
                        }, (err, comment) => {
                            if(err){
                                console.log(err);
                            } else {
                                campground.comments.push(comment);
                                campground.save();
                                console.log("Created a new comment!");
                            }
                        })
                    }
                })
            })
        }
    })
}

module.exports = seedDB;
