const mongoose = require('mongoose');

const launchesSchema = new mongoose.Schema({
    flightNumber: {
        type:Number,
        required:true,
    },
    launchDate: {
        type: Date,
        required: true,
    },
    mission: {
        type: String,
        required: true
    },
    rockets: {
        type: String,
        required: true
    },
    target: {
        type: String,
        // required: true
    },
    // customers is an array of strings
    customers: [ String ],
    upcoming: {
        type: Boolean,
        required: true
    },
    success: {
        type: Boolean,
        required: true,
        default: true
    }
});
// Connects launchesSchema with the "launches" collection
module.exports=mongoose.model('Launch', launchesSchema);

