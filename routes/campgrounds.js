var express    = require('express'),
    router     = express.Router(),
    Campground = require('../models/campground')

//Index route -> shows all the campgrounds//
router.get('/campgrounds', function(req,res){
    //get all campgrounds from database//
    Campground.find({}, function(err, allCampgrounds){
        if(err){
            console.log(err);
        }else{
            res.render("campgrounds/index", {campgrounds : allCampgrounds});
        }
    });
});

//Create route -> adds new campground//
router.post('/campgrounds', function(req, res){
    //get data from form and add to campground array//
    var name = req.body.name;
    var image = req.body.image;
    var desc = req.body.description;
    var newCampground = {name: name, image: image, description: desc }
    //create a new campground and save it to DB yelp_camp//
    Campground.create(newCampground, isLoggedIn ,function(err, newlyCreated){
        if(err){
            console.log(err);
        }else{
            res.redirect('/campgrounds');
        }
    });
});

//New route -> displays from to add new campground//
router.get('/campgrounds/new', isLoggedIn, function(req,res){
    res.render('campgrounds/new');
});

//Show route -> display about particular campground//
router.get('/campgrounds/:id', function(req, res){
    //find the campground with provided id//
    Campground.findById(req.params.id).populate('comments').exec(function(err, foundCampground){
        if(err){
            console.log(err);
        }else{
            //render show template with more info//
            res.render("campgrounds/show", {campground : foundCampground});
        }
    }); 
});

//middleware to check if user is logged in//
function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect('/login');
};

module.exports = router;