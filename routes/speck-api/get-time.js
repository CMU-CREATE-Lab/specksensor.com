var express = require('express');
var router = express.Router();
var log = require('log4js').getLogger('specksensor:routes:speckapi:gettime');

router.get('/', function(req, res) {
   res.set('Content-Type', 'text/plain').send("get_time=" + parseInt(Date.now() / 1000) + "\r\n");
});

module.exports = router;
