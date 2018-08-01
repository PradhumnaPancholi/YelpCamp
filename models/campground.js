var mongoose = require('mongoose');

//schema setup//
var campgroundSchema = new mongoose.Schema({
    name: String,
    image: String,
    description: String
});

module.export = mongoose.model("Campground", campgroundSchema);