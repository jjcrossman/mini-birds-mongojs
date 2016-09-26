// Server REQUIRES
const express = require( 'express' );
const { json } = require( 'body-parser' );

const app = express();
const mongojs = require( 'mongojs' );

const port = 3000;
const db = mongojs( 'birds', ['birds'] );
const cors = require( 'cors' );

const sightings = db.collection("sightings");

// Server Middleware
app.use( cors() );
app.use( json() );



// CRUD / REST
app.post( '/api/sighting', function( req, res ) {
  console.log( 'POST sighting' );
  db.sightings.insert( req.body, ( err, response ) => {
      if ( err ) {
        return res.status( 500 ).json( err );
      } else {
        res.json( response );
      }
  } );
} );

app.get( '/api/sighting', function( req, res ) {
  console.log( 'GET sighting' );

  let query = {};

  if ( req.query.status ) {
    query = { status: req.query.status };
  }
  db.sightings.find( query, ( err, response ) => {
    if ( err ) {
      return res.status( 500 ).json( err );
    } else {
      res.json( response );
    }
  } );
} );

app.delete( '/api/sighting', function( req, res ) {
  console.log( 'DELETE sighting' );
  db.sightings.remove( { _id: mongojs.ObjectId( req.query._id ) }, ( err, response ) => {
    if ( err ) return res.status( 500 ).json( err );
    else res.json( response );
  } );
} );

app.put( '/api/sighting', function( req, res ) {
  console.log( 'PUT sighting' );
  db.sightings.findAndModify( { query: { _id: mongojs.ObjectId( req.query._id ) }, update: { $set: { order: req.body.order } } }, ( err, response ) => {
    if ( err ) return res.status( 500 ).json( err );
    else res.json( response );
  } );
} );


// LISTEN
app.listen( port, function() {
  console.log( "Birds DB started listening on port: " + port );
});



// {
//   query: { _id: req.query._id }
//   , update: { $set:
//     { order: req.body.order }
//   } }
