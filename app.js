var express       = require('express'),
    app           = express(),
    bodyParser    = require('body-parser'),
    mongoose      = require('mongoose'),
    passport      = require('passport'),
    LocalStrategy = require('passport-local'),
    Campground    = require('./models/campground'),
    Comment       = require('./models/comment'),
    User          = require('./models/user')

var camogroundRoutes  = require('./routes/campgrounds'),
    commentRoutes     = require('./routes/comments'),
    authRoutes        = require('./routes/auth') 
    
//app config//
mongoose.connect("mongodb://pradhumna:data6629@ds253891.mlab.com:53891/pnpcamp");
app.use(bodyParser.urlencoded({extended: true}));
app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));

//passport config//
app.use(require('express-session')({
    secret: 'I am the Best',
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req, res, next){
    res.locals.currentUser = req.user;
    next();
});

app.use(camogroundRoutes);
app.use(commentRoutes);
app.use(authRoutes);

//==================================================================================================//
app.listen(process.env.PORT, process.env.IP);