var express    = require('express'),
    router     = express.Router(),
    Campground = require('../models/campground')

//Index route -> shows all the campgrounds//
router.get('/', function(req,res){
    //get all campgrounds from database//
    Campground.find({}, function(err, allCampgrounds){
        if(err){
            console.log(err);
        }else{
            res.render("campgrounds/index", {campgrounds : allCampgrounds});
        }
    });
});

//New route -> displays from to add new campground//
router.get('/new', isLoggedIn, function(req,res){
    res.render('campgrounds/new');
});

//Create route -> adds new campground//
router.post('/',isLoggedIn, function(req, res){
    //get data from form and add to campground array//
    var name = req.body.name;
    var image = req.body.image;
    var desc = req.body.description;
    var author = {
        id: req.user._id,
        username: req.user.username
    }
    var newCampground = {name: name, image: image, description: desc, author: author}
    //create a new campground and save it to DB yelp_camp//
    Campground.create(newCampground, function(err, newlyCreated){
        if(err){
            console.log(err);
            console.log('can not save data');
        }else{
            res.redirect('/campgrounds');
        }
    });
});

//Show route -> display about particular campground//
router.get('/:id', function(req, res){
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

//Edit Route//
router.get('/:id/edit', function(req, res){
    //if user logged in//
    if(req.isAuthenticated()){
        Campground.findById(req.params.id, function(err, foundCampground){
            if(err){
                res.redirect('/campgrounds');
            }else{
                //if user owns the campground//
                console.log(campground.author.id);
                console.log(req.user._id);
                res.render('campgrounds/edit', {campground : foundCampground});
            }
        });       
    }else {
        console.log('You need to sign in');
    }
        
        //redirect somewhere//
    //redirect if not logged in//
    
    
});

//Update Route//
router.put('/:id', function(req, res){
    //find and update the campground//
    Campground.findByIdAndUpdate(req.params.id, req.body.campground, function(err, updatedCampground){
        if(err){
            res.redirect('/campgrounds');
        } else { 
            //redirect to show page// 
            res.redirect('/campgrounds/'+ req.params.id);
        }
    });
    
});

// Destroy Route//
router.delete('/:id/', function(req, res){
    Campground.findByIdAndRemove(req.params.id, function(err){
        if(err){
            res.redirect('/campgrounds');
        }else{
            res.redirect('/campgrounds');
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