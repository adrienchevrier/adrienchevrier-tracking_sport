const express = require('express');
const bodyParser = require('body-parser');

// IMPORT MODELS
require('./models/Garmin');
require('./models/Metadata');

const db = require('./db');
const app = express();



app.use(bodyParser.json());

app.use(bodyParser.urlencoded({
	extended: true
}));

//IMPORT ROUTES
garmins = require('./routes/garminRoutes')(app);
metadatas = require('./routes/metadataRoutes')(app);
//const movieRouter = require('./routes/movie-router');

if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));

  const path = require('path');
  app.get('*', (req,res) => {
      res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
  })

}

//app.use(express.json());
//app.use('/api/garmin', garmins);
//app.use('/api/getmetadata', metadatas);


db.on('error', console.error.bind(console, 'Mongo connection error'));
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`app running on port ${PORT}`)
});