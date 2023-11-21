var express = require('express');
var router = express.Router();

/* GET home page. */

router.use('/signin', require('./signin.route'));
router.use('/event', require('./event.route'));
router.use('/eventHub', require('./eventHub.route'));
router.use('/poll', require('./poll.route'));
router.use('/user', require('./user.route'));
router.use('/eventPoll', require('./poll.route'));

router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});



module.exports = router;
