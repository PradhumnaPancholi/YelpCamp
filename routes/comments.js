var express = require('express'),
    router  = express.Router({mergeParams : true}),
    Campground = require('../models/campground'),
    Comment    = require('../models/comment')

//displays form to create new comment//
router.get('/new', isLoggedIn, function(req, res){
    //find campground by id//
    Campground.findById(req.params.id, function(err, campground){
        if(err){
            console.log(err);
            res.redirect('/campgrounds');
        }else{
            res.render('comments/new', {campground : campground});
        } 
    });  
});

//adds new comment//
router.post('/comments', isLoggedIn, function(req, res){
    //find the campground using id//
    Campground.findById(req.params.id, function(err, campground){
        if(err){
            console.log(err);
        }else{
            //create comment//
            Comment.create(req.body.comment, function(err, comment){
                if(err){
                    console.log(err);
                    res.redirect('/campgrounds');
                }else{
                     // add username and id //
                     comment.author.id = req.user._id;
                     comment.author.username = req.user.username;
                     //save  comment//
                     comment.save();
                     //associate comment with campground//
                     campground.comments.push(comment);
                     campground.save();
                     //redirect to show page//
                     res.redirect('/campgrounds/' + campground._id);
                }
            });     
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