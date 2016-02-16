var express = require('express');
var router = express.Router();
var config = require('../../config');
var log = require('log4js').getLogger('specksensor:routes:speckapi:getversion');

router.get('/', function(req, res) {
   res.set('Content-Type', 'text/plain').send("get_version=" + config.get("firmware:version") + "\r\n");
});

module.exports = router;
