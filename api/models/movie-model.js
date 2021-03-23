var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var MovieSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    genre: {
        type: String
    },
    release_date: {
        type: Date,
        required: true
    }
});

module.exports = mongoose.model('Movie', MovieSchema);