const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var playerSchema = new Schema({
  playerId: {
    type: String
  },
  password: {
    type: String
  }
}, 
{
    collection: 'player'
})
  
module.exports = mongoose.model('player', playerSchema);