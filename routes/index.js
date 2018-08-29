const express = require('express');
const router  = express.Router();
const Celebrity = require('../models/Celebrity')

/* GET home page */
router.get('/', (req, res, next) => {
  res.render('index');
});

router.get('/search', (req,res,next)=> {
  const { search } = req.query;
  if (!search)
    res.render('search')
  else {
    Celebrity.find( {"$or":[
      { name: new RegExp(search,"i")},
      // { occupation: new RegExp(search,"i")},
    ] })
    .then(celebrities => {

      res.render('search', {
        "celebrities": celebrities
          .map(c => ({
            name: c.name,
            occupation: c.occupation,
            catchPhrase: c.catchPhrase,
            score: 100 / (1 + (c.name.toUpperCase().indexOf(search.toUpperCase())))
          }))
          .sort((a,b) => b.score - a.score)
        ,
        "isNoResult": celebrities.length === 0
      });
    })
    .catch(error => {
      console.log(error);
    });
  }
})

module.exports = router;
