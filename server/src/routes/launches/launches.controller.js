// FYI: We don't want our controllers concerned with the details of how the data is stored.
//  We want them to be concerned with the data itself. So we will use a model to store the data and then use the model in our controller.

// recall launches is a new map();
const {launches} = require('../../models/launches.model');
console.log("LAUNCHES",launches);
function getAllLaunches(req, res) {
    console.log('Fetching all launches...');
    // json() corresponds to our launches map and what we really want to return is the values of the map
    // i.e. the list of launches. We can use the values() method of the map to get an array of the values.
    // The values() method returns an iterator object, so we need to convert it to an array using the spread operator.
    // so we can't return the map directly as it is not a json object. We need to convert it to an array first.
    // return res.status(200).json(launches.values(launches.values()));
    // A very important point is that we need to know its a map and not an array.
    // we ideally would like not having to know and just use a function or something to get the data
    // no matter the data structure.
    return res.status(200).json(Array.from(launches.values()));
} 

module.exports = {
    getAllLaunches,
};