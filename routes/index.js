const express = require('express');
const router = express.Router();
const Celebrity = require('../models/Celebrity');

/* GET home page */
router.get('/', (req, res, next) => {
  res.render('index');
});

router.get('/search', (req, res, next) => {
  const search = req.query;
  if (!search) res.render('search');
  else {
    console.log('DEBUG search', search);
    Celebrity.find({ name: new RegExp(search, 'ig') })
      .then(celebrities => {
        res.render('search', {
          celebrities: celebrities,
          isNoResult: celebrities.length === 0
        });
      })
      .catch(error => {
        console.log(error);
      });
  }
});

module.exports = router;
