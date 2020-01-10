var express     = require("express"),
    app         = express(),
    bodyParser  = require("body-parser"),
    mongoose    = require("mongoose")

// connect to database
mongoose.connect("mongodb://localhost/yelp_camp", {useNewUrlParser: true, useUnifiedTopology: true });
// mongoose.connect("mongodb://localhost:27017/yelp_camp", {useNewUrlParser: true, useUnifiedTopology: true });

app.use(express.static("public"));
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: true}));

// Schema setup
var campgroundSchema = new mongoose.Schema({
    name: String,
    image: String,
    description: String
})

var Campground = mongoose.model("Campground", campgroundSchema);

// ===== Create new campgounds ===== 
// Campground.create(
//     {
//         name: "Stone",
//         image: "https://images.unsplash.com/photo-1534187886935-1e1236e856c3",
//         description: "Really great place, you must go there!!! Fresh air, fresh mood!"
//     }, function(err, campground) {
//         if (err) {
//             console.log(err);
//         } else {
//             console.log("Newly created campground: ")
//             console.log(campground);
//         }
//     })

// ===== Remove campgounds if needed ===== 
// Campground.remove({name: "Stone"}, function(err, campground ) {
//   if(err) {
//       console.log("wrong");
//   }  else {
//       console.log("We just removed a campground");
//       console.log(campground);
//   }
// });


// ===== fake data used when there's no database
// var campgrounds = [
//         {name: "Stone", image: "https://images.unsplash.com/photo-1534187886935-1e1236e856c3"}, 
//         {name: "Rock", image: "https://images.unsplash.com/photo-1455496231601-e6195da1f841"},
//         {name: "Mountain", image: "https://images.unsplash.com/photo-1493810329807-db131c118da5"},
//         {name: "Stone", image: "https://images.unsplash.com/photo-1534187886935-1e1236e856c3"}, 
//         {name: "Rock", image: "https://images.unsplash.com/photo-1455496231601-e6195da1f841"},
//         {name: "Mountain", image: "https://images.unsplash.com/photo-1493810329807-db131c118da5"},
//         {name: "Stone", image: "https://images.unsplash.com/photo-1534187886935-1e1236e856c3"}, 
//         {name: "Rock", image: "https://images.unsplash.com/photo-1455496231601-e6195da1f841"},
//         {name: "Mountain", image: "https://images.unsplash.com/photo-1493810329807-db131c118da5"}
//         ]
        
// landing page
app.get('/', (req, res) =>{
    res.render("landing");
})

// a page display campgrounds
app.get('/campgrounds', (req, res) =>{
    Campground.find({}, function(err, allCampgrounds) {
        if (err) {
            console.log(err);
        } else {
            res.render("campgrounds", {campgrounds: allCampgrounds});
        }
    })
    // res.render("campgrounds", {campgrounds: campgrounds});
})

app.post('/campgrounds', (req, res) =>{
    // receive the info about new camp
    var newCamp = {name: req.body.name, 
                   image: req.body.url, 
                   description: req.body.description};
    // insert the new camp to database
    Campground.create(newCamp, function(err, newlyCreated) {
            if (err) {
                console.log(err);
            } else {
                // console.log("Newly created campground: ")
                // console.log(newlyCreated);
                res.redirect("/campgrounds");
            }
        })
    // campgrounds.push(newCamp);
    // res.redirect("/campgrounds");
})

app.get('/campgrounds/new', (req, res) =>{
    res.render("new");
})

// SHOW - show more info about the camp
app.get('/campgrounds/:id', (req, res) =>{
    // find the campground with provided ID
    Campground.findById(req.params.id, function(err, foundCampground) {
        if (err) {
            console.log(err);
        } else {
            // render the show template by found campground
            res.render("show", {campground: foundCampground});
        }
    })
})


app.listen(process.env.PORT, process.env.IP, () =>{
    console.log("Server is listening...");
})