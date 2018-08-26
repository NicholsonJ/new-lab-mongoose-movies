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

router.get('/:id', (req, res, next) => {
  Celebrity.findById(req.params.id).then(celebrityFromDb => {
    res.render('show', celebrityFromDb);
  });
});

module.exports = router;
