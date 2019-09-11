const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const inningsSchema = new Schema({
    score      : Number,
    wickets    : Number,
    dots       : Number,
    centuries  : Boolean,
    fifties    : Boolean,
    mom        : Boolean,
    type       : String,
    playerID   : String
});

module.exports = mongoose.model('Innings', inningsSchema);
