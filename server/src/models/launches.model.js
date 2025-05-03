const launchesDatabase = require('./launches.mongo');
const planets = require('./planets.mongo');
const axios = require('axios');

const DEFAULT_FLIGHT_NUMBER = 100;

let lastFlightNumber = 100

launch = {
    flightNumber: 100, // flight_number (spaceX)
    mission: 'Kepler Exploration X', // name (spaceX)
    rocket: 'Explorer IS1', // rocket.name (spaceX)
    launchDate: new Date('December 22, 2040'), // date_local (several options but his seems best from spaceX)
    target: 'Kepler-442 b', // not applicable. spaceX not targeting our habitable planets. 
    // organizations/indviduals that want to send a payload into space
    customer: ['ZTM','NASA'], // payload.customers for ea. payload(spaceX)
    upcoming:true, // upcoming (spaceX)
    success:true, // success (spaceX)
  }

saveLaunch(launch);

const SPACEX_API_URL="https://api.spacexdata.com/v4/launches/query";

async function populateLaunches() {
    console.log('Downloading SpaceX Data....')
    const response = await axios.post(SPACEX_API_URL,{
        // need proper json here
                query:{},
                options: {
                    pagination: false,
                    populate: [
                        {
                            path: 'rocket',
                            select: {
                                name:1
                            }
                        },
                        {
                            path: 'payloads',
                            select: {
                                'customers': 1
                            }
                        }
                    ]
                }
        });

        if (response.status !== 200) {
            console.log("Problem downloading launch data");
            throw new Error('Launch data download failed')
        }
        const launchDocs = response.data.docs; // note axios puts here
        for (const launchDoc of launchDocs) {
            const payloads = ['payloads'];
            // get customers into a single list, a single array
            const customers = payloads.flatMap((payload) => {
                return payload['customers'];
            })
    
            const launch = {
                flightNumber: launchDoc['flight_number'],
                mission: launchDoc['name'],
                rocket: launchDoc['rocket']['name'],
                launchDate: launchDoc['date_local'],
                upcoming: launchDoc['upcoming'],
                success: launchDoc['success'],
                customers,
            }
            console.log(`spaceX: ${launch.flightNumber} ${launch.mission}`)
            await saveLaunch(launch);
        }
}
async function loadSpaceXData() {
    const firstLaunch = await findLaunch({
        flightNumber: 1,
        rocket: 'Flacon 1',
        mission: 'FalconSat',
    })
    if (firstLaunch) {
        console.log('Launch data alreadyloaded');
    } else {
        await populateLaunches();
    }
}
async function saveLaunch(launch) {

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
        // findOne returns the js object 
        const planet = await planets.findOne({
            keplerName:launch.target
        })
        if (!planet) {
            throw new Error('No matching planett was found')
        }

    const newFlightNumber = await getLatestFlightNumber() + 1;

    const newLaunch = Object.assign(launch, {
        success:true,
        upcoming:true,
        customers: ['Zerto to Mastery', 'NASA'],
        flightNumber: newFlightNumber,
    })

    await saveLaunch(newLaunch);
}

async function findLaunch(filter) {
    return await launchesDatabase.findOne(filter)
}

async function existsLaunchWithId(launchId) {
    return await findLaunch({
        flightNumber: launchId,
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

module.exports = {
    loadSpaceXData,
    existsLaunchWithId,
    getAllLaunches,
    scheduleNewLaunch,
    abortLaunchById
};

