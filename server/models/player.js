const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const playerSchema = new Schema({
    name      : String,
    gender    : String,
    team      : String
});

module.exports = mongoose.model('Players', playerSchema);
