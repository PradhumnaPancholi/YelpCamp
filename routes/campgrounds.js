var express    = require('express'),
    router     = express.Router(),
    Campground = require('../models/campground'),
    middleware = require('../middleware')

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
router.get('/new', middleware.isLoggedIn, function(req,res){
    res.render('campgrounds/new');
});

//Create route -> adds new campground//
router.post('/', middleware.isLoggedIn, function(req, res){
    //get data from form and add to campground array//
    var name = req.body.name;
    var price = req.body.price;
    var image = req.body.image;
    var desc = req.body.description;
    var author = {
        id: req.user._id,
        username: req.user.username
    }
    var newCampground = {name: name, price: price , image: image, description: desc, author: author}
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
router.get('/:id/edit', middleware.checkCampgroundOwner ,function(req, res){
    Campground.findById(req.params.id, function(err, foundCampground){
        if(err){
            res.redirect('back');
        }else{
            res.render('campgrounds/edit', {campground : foundCampground});
        }         
    });
});

//Update Route//
router.put('/:id', middleware.checkCampgroundOwner , function(req, res){
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
router.delete('/:id/', middleware.checkCampgroundOwner , function(req, res){
    Campground.findByIdAndRemove(req.params.id, function(err){
        if(err){
            res.redirect('/campgrounds');
        }else{
            res.redirect('/campgrounds');
        }
    });
});

module.exports = router;