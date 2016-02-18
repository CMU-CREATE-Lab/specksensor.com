var express = require('express');
var router = express.Router();

router.get('/air-quality', function(req, res) {
   res.render('learn/air-quality', {
      title : "Learn: Air Quality",
      parent_section : "learn",
      section : "air-quality",
      hero_image : { filename : "white_speck_with_air_plant_hero_2.jpg", css_class : "anchor_left" }
   });
});

router.get('/particles', function(req, res) {
   res.render('learn/particles', {
      title : "Learn: Fine Particles",
      parent_section : "learn",
      section : "particles",
      hero_image : { filename : "white_speck_with_bamboo_pot_hero.jpg", css_class : "anchor_left" }
   });
});

router.get('/empowerment', function(req, res) {
   res.render('learn/empowerment', {
      title : "Learn: Speck and Empowerment",
      parent_section : "learn",
      section : "empowerment",
      hero_image : { filename : "white_speck_with_colorful_pot_hero.jpg", css_class : "anchor_right" }
   });
});

router.get('/curricula', function(req, res) {
   res.render('learn/curricula', {
      title : "Learn: Curricula",
      parent_section : "learn",
      section : "curricula",
      hero_image : { filename : "white_speck_with_crayons.jpg", css_class : "anchor_right" }
   });
});

router.get('/performance', function(req, res) {
   res.render('learn/performance', {
      title : "Learn: Indoor Performance Testing",
      parent_section : "learn",
      section : "performance"
   });
});

module.exports = router;
