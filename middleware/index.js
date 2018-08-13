//all the middlewares are here//
var Campground = require('../models/campground'),
    Comment    = require('../models/comment'),
    middlewareObj = {}

middlewareObj.isLoggedIn = function (req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    req.flash("error", "Please login first!");
    res.redirect('/login');
};

middlewareObj.checkCampgroundOwner = function (req, res, next){
    //if user logged in//
    if(req.isAuthenticated()){
        Campground.findById(req.params.id, function(err, foundCampground){
            if(err){
                res.redirect('back');
            }else{
                //if user owns the campground//
                if(foundCampground.author.id.equals(req.user._id)){
                    next();
                } else{
                    //redirect somewhere//
                    res.redirect('back');
                }
            }
        });       
    }else {
        //redirect if not logged in//
        res.redirect('back');
    }

};

middlewareObj.checkCommentOwner = function (req, res, next){
    //if user logged in//
    if(req.isAuthenticated()){
        Comment.findById(req.params.comment_id, function(err, foundComment){
            if(err){
                res.redirect('back');
            }else{
                //if user owns the comment//
                if(foundComment.author.id.equals(req.user._id)){
                    next();
                } else{
                    //redirect somewhere//
                    res.redirect('back');
                }
            }
        });       
    }else {
        //redirect if not logged in//
        res.redirect('back');
    }

};

module.exports = middlewareObj;