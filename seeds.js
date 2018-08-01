var mongoose = require('mongoose');
var Campground = require('./models/campground');

var data = [
    {
        name: 'TEST 1',
        image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQQFz7m3UbgG_8mz2YN-wa_NCkKdPd_QxcqsnNy1irdpKjTG10X',
        description: 'It worked!!!'
    },
    {
        name: 'TEST 2',
        image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSMa-1VfLsDRoxhreQ8GPXw79c76XJ2TRoFLPI-RSNkwn1M_ZpU',
        description: 'It worked!!!'
    },
    {
        name: 'TEST 3',
        image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSZx6rj2wRoCc2qMGWJkgkywTKORNzK1tfsxKDXGkfFGi0Cn2xq',
        description: 'It worked!!!'
    },
    {
        name: 'TEST 4',
        image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQKzRlt03wDDc6uWpSPpma7-rfwP7FSPpO4EFWC3QkJ_MZ4lERHVw',
        description: 'It worked!!!'
    }
]
function seedDB(){
    //remove all campgrounds//
    Campground.remove({}, function(err){
        if(err){
            console.log(err);
        }
        console.log('removed user data succesfully');
        //add few campgrounds//
        data.forEach(function(seed){
            Campground.create(seed, function(err, data){
                if(err){
                    console.log(err);
                }else{
                    console.log('seed.js successfull');
                }
            });
        });
    });

    //add some comments//
};

module.exports = seedDB;