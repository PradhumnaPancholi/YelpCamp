var mongoose = require('mongoose'),
    passportLocalMongoose = requiq('passport-local-mongoose');

var userSchema = mongoose.Schema({
    username: String,
    password: String
});

userSchema.plugin(passportLocalMongoose);

module.exports('User', userSchema);