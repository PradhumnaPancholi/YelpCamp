var express = require('express'),
    router  = express.Router(),
    passport = require('passport'),
    User     = require('../models/user')


//landing page//
router.get('/', function(req,res){
    res.render('landing');
});

//=====================================Auth Routes=================================================//

//show sigup form//
router.get('/register', function(req, res){
    res.render('register');
});

//handle sign up logic//
router.post('/register', function(req, res){
    var newUser = new User({username: req.body.username});
    User.register(newUser, req.body.password, function(err, user){
        if(err){
            console.log(err);
            return res.render('register');
        } 
            passport.authenticate('local')(req, res, function(){
            res.redirect('/campgrounds');
            });
    });
});

//show login form//
router.get('/login', function(req, res){
    res.render('login');
});

//handle login logic//
router.post('/login', passport.authenticate('local',
    {
        successRedirect: '/campgrounds', 
        failureRedirect: '/login'
    }),function(req, res){
});

//Log out functionality//
router.get('/logout', function(req, res){
    req.logout();
    res.redirect('/campgrounds');
});

//middleware to check if user is logged in//
function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect('/login');
};

module.exports = router;