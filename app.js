var express= require("express");
var app= express();
var bodyParser=require("body-parser");
var mongoose= require("mongoose");
var Campground = require ("./models/campground");
var Comment = require ("./models/comment");
var User = require ("./models/user");
var passport= require ("passport");
var LocalStrategy= require("passport-local");
var  seedDB =require ('./seeds');
var commentRoutes= require ("./routes/comments");
var campgroundRoutes= require("./routes/campgrounds");
var indexRoutes = require ("./routes/index")
mongoose.connect('mongodb://localhost/yelpcamp',  {useNewUrlParser: true});
//seedDB();

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended:true}));

//passsport session
app.use(require("express-session")({
    secret:"Once again Rusty wins cutest dog",
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


app.use(function(req, res,next){
    res.locals.currentUser= req.user;
    next();
});
app.use(indexRoutes);
app.use(campgroundRoutes);
app.use(commentRoutes);



app.listen(3000, function(){
    
    console.log("Server is listening!!");
})