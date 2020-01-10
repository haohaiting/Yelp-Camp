var express = require("express");
var app = express();
var bodyParser = require("body-parser");

app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));

// fake data
var campgrounds = [
        {name: "Stone", image: "https://images.unsplash.com/photo-1534187886935-1e1236e856c3"}, 
        {name: "Rock", image: "https://images.unsplash.com/photo-1455496231601-e6195da1f841"},
        {name: "Mountain", image: "https://images.unsplash.com/photo-1493810329807-db131c118da5"},
        {name: "Stone", image: "https://images.unsplash.com/photo-1534187886935-1e1236e856c3"}, 
        {name: "Rock", image: "https://images.unsplash.com/photo-1455496231601-e6195da1f841"},
        {name: "Mountain", image: "https://images.unsplash.com/photo-1493810329807-db131c118da5"},
        {name: "Stone", image: "https://images.unsplash.com/photo-1534187886935-1e1236e856c3"}, 
        {name: "Rock", image: "https://images.unsplash.com/photo-1455496231601-e6195da1f841"},
        {name: "Mountain", image: "https://images.unsplash.com/photo-1493810329807-db131c118da5"}
        ]
        
// landing page
app.get('/', (req, res) =>{
    res.render("landing");
})

// a page display campgrounds
app.get('/campgrounds', (req, res) =>{
    res.render("campgrounds", {campgrounds: campgrounds});
})

app.post('/campgrounds', (req, res) =>{
    var newCamp = {name: req.body.name, image: req.body.url};
    campgrounds.push(newCamp);
    res.redirect("/campgrounds");
})

app.get('/campgrounds/new', (req, res) =>{
    res.render("new");
})

app.listen(process.env.PORT, process.env.IP, () =>{
    console.log("Server is listening...");
})