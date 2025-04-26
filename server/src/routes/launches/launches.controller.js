// FYI: We don't want our controllers concerned with the details of how the data is stored.
//  We want them to be concerned with the data itself. So we will use a model to store the data and then use the model in our controller.

// recall launches is a new map();
const {getAllLaunches,addNewLaunch} = require('../../models/launches.model');
function httpGetAllLaunches(req, res) {
    console.log('Fetching all launches...');
    // json() corresponds to our launches map and what we really want to return is the values of the map
    // i.e. the list of launches. We can use the values() method of the map to get an array of the values.
    // The values() method returns an iterator object, so we need to convert it to an array using the spread operator.
    // so we can't return the map directly as it is not a json object. We need to convert it to an array first.
    // return res.status(200).json(launches.values(launches.values()));
    // A very important point is that we need to know its a map and not an array.
    // we ideally would like not having to know and just use a function or something to get the data
    // no matter the data structure.
    return res.status(200).json(getAllLaunches());
} 

function httpAddNewLaunch(req,res) {
    const launch = req.body;

    if (!launch.mission || !launch.rocket || !launch.launchDate 
        || !launch.destination) {
        return res.status(400).json({
            error: 'Missing required launch property'
        });
    }
    // launchDate comes in as a string and needs to be conveted to ddate IMU.
    launch.launchDate = new Date(launch.launchDate);
    // implicitly, JS will do: launch.launchDate.valueOf() and return # of seconds since 1970 aka unix time
    // which means it's a number. if thereis something bogus, than i will NOT be a #. we could have used
    // launch.launchDate.toString === 'Invalid Date' 
    if(isNaN(launch.launchDate)) {
        return res.status(400).json({
            error: 'Invalid launch date'
        })
    }
    addNewLaunch(launch);
    return res.status(201).json(launch)
}

module.exports = {
    httpGetAllLaunches,
    httpAddNewLaunch
};