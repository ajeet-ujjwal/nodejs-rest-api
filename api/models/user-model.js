const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true, minlength: 6 },
    favourite_movies: [{
        type: Schema.Types.ObjectId,
        ref: "Movie"
    }]
});

module.exports = mongoose.model('User', userSchema);