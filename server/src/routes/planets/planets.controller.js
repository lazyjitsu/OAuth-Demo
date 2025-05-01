
const { getAllPlanets } = require('../../models/planets.model');
// const planets = [];
// console.log("PLAnets",planets);
async function  httpGetAllPlanets(req, res) {
  console.log('Fetching all planets...');
  return res.status(200).json(await getAllPlanets());
  // return res.status(200).json(planets.getAllPlanets());
} 
module.exports = {
  httpGetAllPlanets,
};