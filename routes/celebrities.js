const express = require('express');
const router = express.Router();
const Celebrity = require('../models/Celebrity');

router.get('/', (req, res, next) => {
  Celebrity.find().then(celebrityFromDb => {
    res.render('celebrities', {
      celebrity: celebrityFromDb
    });
  });
});

router.get('/new', (req, res, next) => {
  res.render('new');
});

router.post('/new', (req, res, next) => {
  const { name, occupation, catchPhrase } = req.body;
  const newCeleb = new Celebrity({ name, occupation, catchPhrase });
  newCeleb
    .save()
    .then(celebrity => {
      res.redirect('/celebrities');
    })
    .catch(error => {
      console.log(error);
    });
});

router.get('/:id', (req, res, next) => {
  Celebrity.findById(req.params.id).then(celebrityFromDb => {
    res.render('show', celebrityFromDb);
  });
});

module.exports = router;
