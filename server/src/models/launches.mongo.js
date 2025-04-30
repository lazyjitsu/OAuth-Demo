const mongoose = require('mongoose');
// see documention for types allowed
// const launchesSchema = new mongoose.Schema({
//     flightNumber: Number,
//     launchDate: Date,
// })

// We can go a step further and require data
// const launchesSchema = new mongoose.Schema({
//         flightNumber: {
//             type: Number,
//             required:true,
//             default:100,
//             min: 100,
//             max: 999,
//         },
//         launchDate: Date,
// })
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
        // tell mongo to check that any planets we selected as a target, is a planet in our collection!
        // type: mongoose.ObjectId,
        // ref: 'Planet'
        // the above is too difficult for now per Udemy. So we'll go with
        type: String,
        required: true
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
// Connects launchesSchma with the "launches" collection
module.exports=mongoose.model('Launch', launchesSchema);

