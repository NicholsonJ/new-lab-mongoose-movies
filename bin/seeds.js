const mongoose = require('mongoose');
const Celebrity = require('../models/Celebrity');
const celebrities = require('../data/celebrities');
const Movie = require('../models/Movie');
const movies = require('../data/movies');

mongoose.Promise = Promise;
mongoose
  .connect(
    'mongodb://localhost/lab-mongoose-movies',
    { useMongoClient: true }
  )
  .then(() => {
    console.log('Connected to Mongo!');
  })
  .catch(err => {
    console.error('Error connecting to mongo', err);
  });

let celebritiesToCreate = celebrities.map(celebrity => {
  return {
    name: celebrity.name,
    occupation: celebrity.occupation,
    catchPhrase: celebrity.catchPhrase
  };
});

console.log(celebritiesToCreate);

Celebrity.create(celebritiesToCreate).then(celebsFromDb => {
  console.log(celebsFromDb.length + ' celebrities were created');
});

let moviesToCreate = movies.map(movie => {
  return {
    title: movie.title,
    genre: movie.genre,
    plot: movie.plot
  };
});

console.log(moviesToCreate);

Movie.create(moviesToCreate).then(moviesFromDb => {
  console.log(moviesFromDb.length + ' movies were created');
});
