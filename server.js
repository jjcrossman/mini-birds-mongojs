// Server REQUIRES
const express = require( 'express' );
const { json } = require( 'body-parser' );
const cors = require( 'cors' );
const mongoDb = require( 'mongojs' );
const app = express();

// Server Middleware
app.use( json() );

const port = 3000;


// CRUD / REST
app.post('/api/sighting', function(req, res) {
  console.log('POST sighting');
  res.end();
});

app.get('/api/sighting', function(req, res) {
  console.log('GET sighting');
  res.end();
});

app.delete('/api/sighting', function(req, res) {
  console.log('DELETE sighting');
  res.end();
});

app.put('/api/sighting', function(req, res) {
  console.log('PUT sighting');
  res.end();
});


// LISTEN 
app.listen(port, function() {
  console.log( "Birds DB started listening on port: " + port );
});
