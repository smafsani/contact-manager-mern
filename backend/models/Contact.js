const mongoose = require('mongoose');

const ContactSchema = mongoose.Schema({

    name: {
        type: String
    },

    phone: {
        type: Array
    },

    email: {
        type: String
    },

    address: {
        type: String
    }

});

const Contact =  mongoose.model('Contact', ContactSchema);

module.exports = Contact;