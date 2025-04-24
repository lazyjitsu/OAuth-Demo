
const { planets } = require('../../models/planets.model');
// const planets = [];
console.log("PLAnets",planets);
function getAllPlanets(req, res) {
  console.log('Fetching all planets...');
  return res.status(200).json(planets);
  // return res.status(200).json(planets.getAllPlanets());
} 
module.exports = {
  getAllPlanets,
};