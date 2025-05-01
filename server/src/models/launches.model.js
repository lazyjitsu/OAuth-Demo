const launchesDatabase = require('./launches.mongo');
const planets = require('./planets.mongo');

const launches = new Map();

let lastFlightNumber = 100

launch = {
    flightNumber: 100,
    mission: 'Kepler Exploration X',
    rocket: 'Explorer IS1',
    launchDate: new Date('December 22, 2040'),
    target: 'Kepler-442 b',
    customer: ['ZTM','NASA'],
    upcoming:true,
    success:true,
  }

saveLaunch(launch);

async function saveLaunch(launch) {
    // findOne returns the js object 
    const planet = await planets.findOne({
        keplerName:launch.target
    })

    if (!planet) {
        throw new Error('No matching planett was found')
    }

    await launchesDatabase.updateOne({
        // does this data already exist which is determined by flightNumber
        flightNumber: launch.flightNumber
    },
    launch, 
    {
        upsert: true
    })
}
function addNewLaunch(launch) {
    lastFlightNumber++;
    launches.set(
        lastFlightNumber,
        Object.assign(launch,
            {
            success:true,
            upcoming:true,
            customers: ['ZTM','NASA'],
            flightNumber:lastFlightNumber,
        }));
};

// launches.set(launch.flightNumber,launch);

function existsLaunchWithId(launchId) {
    return launches.has(launchId)
}


function abortLaunchById(launchId) {
    // in the era of big data, we do NOT delete but we can mark
    // it as aborted etc. Even though our aborted object is constand and we can't reassign it,
    //  we can still mutate the properties.
    const aborted = launches.get(launchId);

    aborted.upcoming = false;
    aborted.success = false;

    return aborted;
}
async function getAllLaunches() {
    // return Array.from(launches.values())
    return await launchesDatabase
    .find({},
        {
            '_id':0,
            '__v':0
        })
}
//   launches.set(launch.flightNumber, launch);
  module.exports = {
    getAllLaunches,
    addNewLaunch,
    existsLaunchWithId,
    abortLaunchById
  };

