var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  let n = req.query.n;
  console.log(n)
  // n^2 iterations before giving someone else a turn
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
      console.log(`Iter ${i}.${j}`);
    }
  }

  res.render('index', { title: 'Express' });
});

module.exports = router;
