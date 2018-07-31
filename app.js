var express    = require('express'),
    app        = express(),
    bodyParser = require('body-parser'),
    mongoose   = require('mongoose')

//connecton with database//
mongoose.connect("mongodb://pradhumna:data6629@ds253891.mlab.com:53891/pnpcamp");

app.use(bodyParser.urlencoded({extended: true}));
//addding view engine//
app.set('view engine', 'ejs');

//schema setup//
var campgroundSchema = new mongoose.Schema({
    name: String,
    image: String,
    description: String
});

var Campground = mongoose.model("Campground", campgroundSchema);

/*Campground.create(
    {
        name: "Niagara Falls", 
        image: "https://images.unsplash.com/photo-1461775899071-bc47db1478c9?ixlib=rb-0.3.5&s=6f9303fb26cfedf612fe6dde01f7a83c&auto=format&fit=crop&w=752&q=80",
        description: "One of the most beautifu places in Ontario. FYI, also one of the seven wonders in the world"

    }, function(err,campground){
        if(err){
            console.log(err);
        } else{
            console.log("newly added capground");
            console.log(campground);
        }
    }
);*/

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
            res.render("index", {campgrounds : allCampgrounds});
        }
    });
});

//Create route -> adds new campground//
app.post('/campgrounds', function(req, res){
    //get data from form and add to campground array//
    var name = req.body.name;
    var image = req.body.image;
    var desc = req.body.description;
    var newCampground = {name:name, image: image, description:desc }
    //create a new campground and save it to DB yelp_camp//
    Campground.create(newCampground, function(err, newlyCreated){
        if(err){
            console.log(err);
        }else{
            console(newlyCreated);
            //redirect back to campground page//
            res.redirect('/campgrounds');
        }
    });
});

//New route -> displays from to add new campground//
app.get('/campgrounds/new', function(req,res){
    res.render('new');
});

//Show route -> display about particular campground//
app.get('campgrounds/:id', function(req, res){
    //find the campground with provided id//
    Campground.findById(req.params.id , function(err, foundCampground){
        if(err){
            console.log(err);
        }else{
            //render show template with more info//
            res.render("show", {campground : foundCampground});
        }
    }); 
});
app.listen(process.env.PORT, process.env.IP);