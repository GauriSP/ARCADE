const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let playerSchema = new Schema({
  name: {
    type: String
  },
  email: {
    type: String
  },
  scores: [ Number ]
}, 
{
    collection: 'score'
})
  
module.exports = mongoose.model('score', playerSchema);

