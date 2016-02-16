var express = require('express');
var router = express.Router();
var config = require('../../config');
var log = require('log4js').getLogger('specksensor:routes:speckapi:getscalar');

router.get('/', function(req, res) {
   res.set('Content-Type', 'text/plain').send("get_scalar=" + config.get("firmware:scalar") + "\r\n");
});

module.exports = router;
