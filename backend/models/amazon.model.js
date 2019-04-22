const mongoose = require('mongoose');

const AmazonSchema = mongoose.Schema({
    body: String
});

module.exports = mongoose.model('Amazon', AmazonSchema);

