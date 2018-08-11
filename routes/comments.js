var express = require('express'),
    router  = express.Router({mergeParams : true}),
    Campground = require('../models/campground'),
    Comment    = require('../models/comment'),
    middleware = require('../middleware')

//displays form to create new comment//
router.get('/new', middleware.isLoggedIn, function(req, res){
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
router.post('/', middleware.isLoggedIn, function(req, res){
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

//Edit Route//
router.get('/:comment_id/edit', middleware.checkCommentOwner, function(req, res){
    Comment.findById(req.params.comment_id, function(err, foundComment){
        if(err){
            console.log(err);
        }else{
            res.render('comments/edit', {campground_id : req.params.id, comment : foundComment});
        }
    });  
});

//Update Route//
router.put('/:comment_id', middleware.checkCommentOwner, function(req, res){
    Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, function(err, updatedComment){
        if(err){
            console.log(err);
        }else{
            res.redirect('/campgrounds/' + req.params.id);
        }
    });
});

//Delete Route//
router.delete('/:comment_id', middleware.checkCommentOwner, function(req, res){
    Comment.findByIdAndRemove(req.params.comment_id, function(err){
        if(err){
            res.redirect('back');
        }else{
            res.redirect('/campgrounds/' + req.params.id);
        }
    });
});


module.exports = router;