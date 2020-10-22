var mongoose = require('mongoose');

// Setup schema
var contactScheme = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    gender: String,
    phone: String,
    create_date: {
        type: Date,
        default: Date.now
    }
});

// Export Contact model
var Contact = module.exports = mongoose.model('contact', contactScheme);

module.exports.get = function (callback, limit) {
    Contact.find(callback).limit(limit);
}