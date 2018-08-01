var mongoose = require('mongoose');
var Campground = require('./models/campground');

Campground.remove({}, function(err){
    console.log('removed everything succesfully');
});

module.exports = seedDB;