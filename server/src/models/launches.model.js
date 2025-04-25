const launches = new Map();


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

  launches.set(launch.flightNumber, launch);
  module.exports = {
    launches,
  };

