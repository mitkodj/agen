var express = require('express');
var router = express.Router();
var automata = require('../server/automata_definition');

automata.addWord('mitko');

 // automata.getAutomata();

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Express' });
});

module.exports = router;
