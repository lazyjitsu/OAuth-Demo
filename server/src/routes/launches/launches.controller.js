// FYI: We don't want our controllers concerned with the details of how the data is stored.
//  We want them to be concerned with the data itself. So we will use a model to store the data and then use the model in our controller.

// recall launches is a new map();
const {getAllLaunches,addNewLaunch,existsLaunchWithId, abortLaunchById} = require('../../models/launches.model');
async function httpGetAllLaunches(req, res) {
    console.log('Fetching all launches...');

    return res.status(200).json(await getAllLaunches());
} 

function httpAddNewLaunch(req,res) {
    const launch = req.body;
    console.log(`LNCHEZ Key:${launch.mission}`)
    if (!launch.mission || !launch.rocket 
        || !launch.target || !launch.launchDate) {
        return res.status(400).json({
            error: 'Missing required launch property'
        });
    }
    // launchDate comes in as a string and needs to be conveted to ddate IMU.
    launch.launchDate = new Date(launch.launchDate);

    if(isNaN(launch.launchDate)) {
        return res.status(400).json({
            error: 'Invalid launch datee'
        })
    }
    console.log(`Adding launch: ${launch}`)
    addNewLaunch(launch);
    return res.status(201).json(launch)
}

function httpAbortLaunch(req,res) {
    const launchId = Number(req.params.id);

    // if launch not exist
    if (!existsLaunchWithId(launchId)) {
        return res.status(404).json({
            error: 'Launccch not found',
        });
    }
    // if exists
    const aborted = abortLaunchById(launchId);

    return res.status(200).json(aborted);
}

module.exports = {
    httpGetAllLaunches,
    httpAddNewLaunch,
    httpAbortLaunch
};