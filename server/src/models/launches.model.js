const launches = new Map();

let lastFlightNumber = 100

launch = {
    flightNumber: 100,
    mission: 'Kepler Exploration X',
    rocket: 'Explorer IS1',
    launchDate: new Date('December 22, 2040'),
    destination: 'Kepler-442 b',
    customer: ['ZTM','NASA'],
    upcoming:true,
    success:true,
  }

function addNewLaunch(launch) {
    lastFlightNumber++;
    // key=lastFlightNumber, value is the object launch and we use Object.assign to assign
    // new properties to the launch object, if there are pre-existing properties, they are 
    // overwritten.

    launches.set(lastFlightNumber,
        Object.assign(launch,{
            // these properties we set for our client call. Stuff the server doesnt need to know from
            // the client and providing this convenience for  our client.
            success:true,
            upcoming:true,
            customers: ['ZTM','NASA'],
            flightNumber:lastFlightNumber,
        }));
};
function getAllLaunches() {
    return Array.from(launches.values())
}
  launches.set(launch.flightNumber, launch);
  module.exports = {
    getAllLaunches,
    addNewLaunch
  };

