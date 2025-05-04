// FYI: We don't want our controllers concerned with the details of how the data is stored.
//  We want them to be concerned with the data itself. So we will use a model to store the data and then use the model in our controller.

// recall launches is a new map();
const {getAllLaunches,scheduleNewLaunch,existsLaunchWithId, abortLaunchById} = require('../../models/launches.model');
const {getPagination} = require('../../services/query');

async function httpGetAllLaunches(req, res) {
    const {skip, limit } = getPagination(req.query);
    const launches = await getAllLaunches(skip,limit)
    return res.status(200).json(launches);
} 

async function httpAddNewLaunch(req,res) {
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
    // addNewLaunch(launch);
    await scheduleNewLaunch(launch);
    return res.status(201).json(launch)
}

async function httpAbortLaunch(req,res) {
    const launchId = Number(req.params.id);

    // if launch not exist
    const existsLaunch = await existsLaunchWithId(launchId);
    if (!existsLaunch) {
        return res.status(404).json({
            error: 'Launccch not found',
        });
    }
    // if exists
    const aborted = await abortLaunchById(launchId);

    if (!aborted) {
        return res.status(400).json({
            error: 'Launch not aborted',
        })
    }
    return res.status(200).json({
        ok: true,
    });
}

module.exports = {
    httpGetAllLaunches,
    httpAddNewLaunch,
    httpAbortLaunch
};