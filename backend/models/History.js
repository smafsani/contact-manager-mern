const mongoose = require("mongoose");

const HistorySchema = mongoose.Schema({

    receiver: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Contact', 
        required: true
    },

    contactType: {type: String,},

    message: {type: String},

    details: {type: String},

    date: {type: Date},

});

const History = mongoose.model("History", HistorySchema);

module.exports = History;