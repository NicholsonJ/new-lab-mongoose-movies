const express = require('express');
const router  = express.Router();

/* GET home page */
router.get('/', (req, res, next) => {
  res.render('index');
});

router.get('/search', (req,res,next)=> {
  res.render('search')
})

router.post('/search', (req, res, next) => {
  const search = req.body;
  Celebrity.find( { name: new RegExp(search,“ig”)} )
    .then(celebrity => {
      res.redirect('/celebrities');
    })
    .catch(error => {
      console.log(error);
    });
});




module.exports = router;
