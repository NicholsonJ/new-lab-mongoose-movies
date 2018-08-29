const express = require('express');
const router = express.Router();
const Movie = require('../models/Movie');

router.get('/', (req, res, next) => {
  Movie.find().then(movieFromDb => {
    res.render('Movie/movies', {
      movie: movieFromDb
    });
  });
});

router.get('/newMovie', (req, res, next) => {
  res.render('Movie/newMovie');
});

router.post('/newMovie', (req, res, next) => {
  const { title, genre, plot } = req.body;
  const newMovie = new Movie({ title, genre, plot });
  newMovie
    .save()
    .then(movie => {
      res.redirect('Movie/movies');
    })
    .catch(error => {
      console.log(error);
    });
});

router.get('/:id', (req, res, next) => {
  Movie.findById(req.params.id).then(movieFromDb => {
    res.render('Movie/movie-detail', movieFromDb);
  });
});

router.post('/:id/delete', (req, res, next) => {
  Movie.findByIdAndRemove(req.params.id).then(x => {
    res.redirect('back');
  });
});

router.get('/:id/edit', (req, res, next) => {
  Movie.findById(req.params.id).then(movieFromDb => {
    res.render('Movie/editMovie', movieFromDb);
  });
});

router.post('/:id/edit', (req, res, next) => {
  const movieID = req.params.id;
  const { title, genre, plot } = req.body;
  Movie.update({ _id: movieID }, { $set: { title, genre, plot } }, { new: true })
    .then(celebrity => {
      res.redirect('/movies');
    })
    .catch(error => {
      console.log(error);
    });
});

module.exports = router;
