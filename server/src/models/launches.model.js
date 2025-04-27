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

function addNewLaunch(launch) {
    lastFlightNumber++;
    // key=lastFlightNumber, value is the object launch and we use Object.assign to assign
    // new properties to the launch object, if there are pre-existing properties, they are 
    // overwritten.

    launches.set(
        lastFlightNumber,
        Object.assign(launch,
            {
            // these properties we set for our client call. Stuff the server doesnt need to know from
            // the client and providing this convenience for  our client.
            success:true,
            upcoming:true,
            customers: ['ZTM','NASA'],
            flightNumber:lastFlightNumber,
        }));
};
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
function getAllLaunches() {
    return Array.from(launches.values())
}
  launches.set(launch.flightNumber, launch);
  module.exports = {
    getAllLaunches,
    addNewLaunch,
    existsLaunchWithId,
    abortLaunchById
  };

