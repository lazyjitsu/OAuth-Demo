const mongoose = require('mongoose');

const planetSchema = new mongoose.Schema({
    // ideally, we want this to match the frontend (Launch.js). Find the reference <option value={planet.keplerName}
    keplerName: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('Planet',planetSchema);
