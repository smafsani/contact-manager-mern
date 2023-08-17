const mongoose = require("mongoose");

const HistorySchema = mongoose.Schema({

    receiver: {
        type: String,
        required: true
    },

    contactType: {type: String,},

    message: {type: String},

    details: {type: String},

    date: {type: Date},

});

const History = mongoose.model("History", HistorySchema);

module.exports = History;