const launchesDatabase = require('./launches.mongo');
const planets = require('./planets.mongo');

const launches = new Map();

const DEFAULT_FLIGHT_NUMBER = 100;

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
    //replaced upateOne with findOneAndUpdate to avoid the $setOnInsert being sent back
    // we don't want internal and uncessary data revealing what tech our API is running on
    await launchesDatabase.findOneAndUpdate({
        // does this data already exist which is determined by flightNumber
        flightNumber: launch.flightNumber
    },
    launch, 
    {
        upsert: true
    })
}

async function scheduleNewLaunch(launch) {
    const newFlightNumber = await getLatestFlightNumber() + 1;

    const newLaunch = Object.assign(launch, {
        success:true,
        upcoming:true,
        customers: ['Zerto to Mastery', 'NASA'],
        flightNumber: newFlightNumber,
    })

    await saveLaunch(newLaunch);
}

// launches.set(launch.flightNumber,launch);

async function existsLaunchWithId(launchId) {
    // return launches.has(launchId)
    return await launchesDatabase.findOne({
        flightNumber:launchId
    })
}

async function getLatestFlightNumber() {
    const latestLaunch = await launchesDatabase
        .findOne() // only one document needed
        // sort by flightNumber property- defaults ascending order
        // to get into descending - Add the '-' to flightNumber per below
        .sort('-flightNumber'); 
    if (!latestLaunch) {
        return DEFAULT_FLIGHT_NUMBER;
    }
    return latestLaunch.flightNumber;
}

async function abortLaunchById(launchId) {
    const aborted = await launchesDatabase.updateOne({
        flightNumber: launchId,
    }, 
    {
        upcoming:false,
        success:false
        // didn't use 'upsert' cause we don't want anything insert if something 
        // does NOT exist. In he very odd chance
    })  
    // console.log(`Launch id ${Object.keys(aborted)} aborted!`)
    // my version
    // return aborted.acknowledged === true && aborted.modifiedCount === 1;
    // udemy version
    return aborted.modifiedCount === 1;

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
    scheduleNewLaunch,
    existsLaunchWithId,
    abortLaunchById
  };

