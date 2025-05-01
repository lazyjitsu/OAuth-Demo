const { parse } = require('csv-parse');
const fs = require('fs');
const path = require('path')

const planets = require('./planets.mongo');

const habitablePlanets = [];

function isHabitablePlanet(planet) {
  return planet['koi_disposition'] === 'CONFIRMED'
    && planet['koi_insol'] > 0.36 && planet['koi_insol'] < 1.11
    && planet['koi_prad'] < 1.6;
}
/* 
    const promise = new Promise((resolve, reject) => {
        resolve(42)
    }
    promise.then((result) => {
        console.log(result); // 42
    });
    const result = await promise;
    console.log(result); // 42
*/

function loadPlanetsData() {
    return new Promise((resolve,reject) => {
        fs.createReadStream(path.join(__dirname,'..','..','data','kepler_data.csv'))
        .pipe(parse({
        comment: '#',
        columns: true,
        }))
        .on('data', async (data) => {
        if (isHabitablePlanet(data)) {
            savePlanet(data);
        }
        })
        .on('error', (err) => {
            console.log(err);
            reject(err);
        })
        .on('end', async () => {
            const countPlanetsFound = (await getAllPlanets()).length;
            console.log(`Planets found: ${countPlanetsFound}`)
            resolve();
        });
    });
}

async function savePlanet(planet) {
                // habitablePlanets.push(data);
            // we need to pass in the data in way that matches the schema
        try {
            await planets.updateOne(
                {
                    // First object/query: makes sure planet doesn't already exist
                    // find all documents matching the keplerName that matches kepler_name
                    keplerName: planet.kepler_name 
                },
                {
                    // Second object/query: if it does NOT already exist, insert w/this object
                    keplerName: planet.kepler_name
                },
                {
                    upsert: true,
                });
        } catch(err) {
            console.error(` Could not save planet ${err}`)
        }

}
async function getAllPlanets() {
    // return habitablePlanets;
    // our planets.* are async operations
    // all documents will be returned if the object is empty
    //  return await planets.find({},'-_id -__v') or better yet (more clean IMO)
    return await planets.find({},{
        '_id': 0,
        '__v': 0
    })
}

  module.exports = {
    loadPlanetsData,
    getAllPlanets,
  }