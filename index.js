let express = require('express');
let mongoose = require('mongoose');
let bodyParser = require('body-parser');
let dbConfig = require('./database/db');
var cors = require('cors');
  
// Express Route
const playerLogin = require('./routes/playerLogin.route');
const corsOpts = {
  origin: '*',

  methods: [
    'GET',
    'POST',
  ],

  allowedHeaders: [
    'Content-Type',
  ],
};
  
// connecting to db
mongoose.connect(dbConfig.url)
.then(() => {
  console.log('Database successfully connected!')
})
.catch((error) => {
    console.log('Could not connect to database : ' + error)
});
  
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(cors(corsOpts));
app.use('/players', playerLogin);
  
// PORT
const port = process.env.PORT || 4000;
const server = app.listen(port, () => {
  console.log('Connected to port ' + port)
})