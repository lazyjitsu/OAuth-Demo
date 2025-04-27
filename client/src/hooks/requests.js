const API_URL = 'http://localhost:8100';

async function httpGetPlanets() {
  // Load planets and return as JSON.
  console.log('cor response');

  const response = await fetch(`${API_URL}/planets`);
  return await response.json()

}
// async function httpGetPlanets() {   
//   return fetch(`${API_URL}/planets`)     
// .then(async (response) => {       return await response.json();     })
// .then(data => {            return data;     })  
// }

async function httpGetLaunches() {
  // Load launches, sort by flight number, and return as JSON.
  const response = await fetch(`${API_URL}/launches`);
  const fetchedLaunches = await response.json();
  return fetchedLaunches.sort((a, b) => {
    return a.flightNumber - b.flightNumber;
  });

}

async function httpSubmitLaunch(launch) {
  // Submit given launch data to launch system.
  // If there is a network failure or similar where are api doesn't even get a chance
  // to set response.ok, we need this try/catch block!
  try {
    const response = await fetch(`${API_URL}/launches`,
      {
        method: "post",
        headers: {
          "Content-Type": "application/json" 
        },
        body: JSON.stringify(launch),
      })
    console.log(`Request resp received: ${response}`)
    return response;
  } catch(err) {
    //response
    return {
      ok: false,
    }
  }
}

async function httpAbortLaunch(id) {
  // Delete launch with given ID.
  try {
    return await fetch(`${API_URL}/launches/${id}`,{
      method: "delete",
    });
  } catch(err) {
    console.log('Errrror',err);
    return {
      ok:false,
    }
  }
} 

export {
  httpGetPlanets,
  httpGetLaunches,
  httpSubmitLaunch,
  httpAbortLaunch,
};