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

router.get('/newCelebrity', (req, res, next) => {
  res.render('newCelebrity');
});

router.post('/newCelebrity', (req, res, next) => {
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

router.post('/:id/delete', (req, res, next) => {
  Celebrity.findByIdAndRemove(req.params.id).then(x => {
    res.redirect('back');
  });
});

router.get('/:id/edit', (req, res, next) => {
  Celebrity.findById(req.params.id).then(celebrityFromDb => {
    res.render('editCelebrity', celebrityFromDb);
  });
});

router.post('/:id/edit', (req, res, next) => {
  const celebID = req.params.id;
  const { name, occupation, catchPhrase } = req.body;
  Celebrity.update({ _id: celebID }, { $set: { name, occupation, catchPhrase } }, { new: true })
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
