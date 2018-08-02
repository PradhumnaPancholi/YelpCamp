var express    = require('express'),
    app        = express(),
    bodyParser = require('body-parser'),
    mongoose   = require('mongoose'),
    Campground = require('./models/campground'),
    seedDB     = require('./seeds')

//seedDB();
//app config//
mongoose.connect("mongodb://pradhumna:data6629@ds253891.mlab.com:53891/pnpcamp");
app.use(bodyParser.urlencoded({extended: true}));
app.set('view engine', 'ejs');

//landing page//
app.get('/', function(req,res){
    res.render('landing');
});

//Index route -> shows all the campgrounds//
app.get('/campgrounds', function(req,res){
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
app.post('/campgrounds', function(req, res){
    //get data from form and add to campground array//
    var name = req.body.name;
    var image = req.body.image;
    var desc = req.body.description;
    var newCampground = {name: name, image: image, description: desc }
    //create a new campground and save it to DB yelp_camp//
    Campground.create(newCampground, function(err, newlyCreated){
        if(err){
            console.log(err);
        }else{
            res.redirect('/campgrounds');
        }
    });
});

//New route -> displays from to add new campground//
app.get('/campgrounds/new', function(req,res){
    res.render('campgrounds/new');
});

//Show route -> display about particular campground//
app.get('/campgrounds/:id', function(req, res){
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

//==================================Comment Router=================================================//
app.get('/campgrounds/:id/comments/new', function(req, res){
    //find campground by id//
    Campground.find(req.params.id, function(err, campground){
        if(err){
            console.log(err);
        }else{
            res.render('comments/new', {campground : campground});
        } 
    });  
});
//=================================================================================================//
app.listen(process.env.PORT, process.env.IP);