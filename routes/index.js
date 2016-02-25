var express = require('express');
var router = express.Router();
var config = require('../config');
var superagent = require('superagent');

//======================================================================================================================

router.get('/', function(req, res) {
   res.render('index', {
      section : "home",
      hero_image : { filename : "white_speck_hero.jpg", css_class : "anchor_right" },
      hero_text : {
         css_class : "home_hero_text",
         text : '<span class="intro">Meet Speck.</span><br>The indoor air&nbsp;quality&nbsp;monitor<br>empowering you to breathe&nbsp;easier.'
      }
   });
});

//======================================================================================================================
// SETUP & SUPPORT
//----------------------------------------------------------------------------------------------------------------------

router.get('/support/getting-started', function(req, res) {
   res.render('support/getting-started', {
      title : "Support: Getting Started",
      parent_section : "support",
      section : "getting-started"
   });
});

router.get('/support/software', function(req, res) {
   res.render('support/software', {
      title : "Support: Software",
      parent_section : "support",
      section : "software"
   });
});

router.get('/support/legacy-software', function(req, res) {
   res.render('support/legacy-software', {
      title : "Support: Legacy Software",
      parent_section : "support",
      section : "software"
   });
});

router.get('/support/tech-specs', function(req, res) {
   res.render('support/tech-specs', {
      title : "Support: Technical Specifications",
      parent_section : "support",
      section : "tech-specs"
   });
});

router.get('/support/faq', function(req, res) {
   res.render('support/faq', {
      title : "Support: FAQs",
      parent_section : "support",
      section : "faq"
   });
});

router.get('/support/contact-us', function(req, res) {
   res.render('support/contact-us', {
      title : "Support: Contact Us",
      parent_section : "support",
      section : "contact-us"
   });
});

router.get('/support/feedback', function(req, res) {
   res.redirect('https://docs.google.com/forms/d/1YWloMINortsAr2p-E8w2YGHKLlo-_Y06D8O7JSsC8u8/viewform');
});

//======================================================================================================================
// LIBRARIES
//----------------------------------------------------------------------------------------------------------------------

router.get('/libraries/apply', function(req, res) {
   res.redirect('https://docs.google.com/forms/d/1UIvc81SwFCQZQzRK3XxwMOWujFogTeChj68ssNnNbIM/viewform');
});

//======================================================================================================================
// HEADER LINKS
//----------------------------------------------------------------------------------------------------------------------

router.get('/public-data', function(req, res) {
   res.render('public-data', {
      title : "Public Data",
      section : "public-data",
      googleMapsApiKey : config.get("maps:apiKey"),
      speckProductId : config.get("product:id")
   });
});

router.get('/signup', function(req, res) {
   res.render('signup', { title : "Sign Up", section : "login" });
});

//======================================================================================================================
// FOOTER LINKS
//----------------------------------------------------------------------------------------------------------------------

router.get('/about-us', function(req, res) {
   res.render('about-us', { title : "About Us", section : "about-us" });
});

router.get('/press', function(req, res) {
   res.render('press', {
      title : "Press",
      section : "press",
      articles : [
         {
            title : "CMU Creates Device, App to Monitor Home Air Pollution",
            author : "David Templeton",
            source : "Pittsburgh Post Gazette",
            date : new Date("2016-01-10 00:00:00"),
            url : "http://www.post-gazette.com/news/health/2016/01/10/CMU-creates-device-app-Speck-to-monitor-home-air-pollution/stories/201601050002"
         },
         {
            title : "Air Measures",
            author : "Megha Satyanarayana",
            source : "h Magazine - The Magazine of the Heinz Endowments",
            date : new Date("2015-12-12 00:00:00"),
            url : "http://www.heinz.org/UserFiles/Library/2015_Issue3_complete.pdf"
         },
         {
            title : "Air Pollution in the Mon Valley and the New Speck Sensor",
            author : "Jason Togyer",
            source : "Tube City Online Podcast",
            date : new Date("2015-12-11 00:00:00"),
            url : "https://itun.es/i6Y96Gs"
         },
         {
            title : "How to Measure Indoor Air Pollution",
            author : "Jessica Cohen",
            source : "Utne",
            date : new Date("2015-12-11 00:00:00"),
            file : {
               name : "20151211_Utne.pdf",
               type : "pdf"
            },
            url : "http://www.utne.com/environment/indoor-air-pollution-ze0z1512zbay.aspx"
         },
         {
            title : "SpeckSensor app lets users monitor region's air pollution on the go",
            author : "Mia Bencivenga",
            source : "Next Pittsburgh",
            date : new Date("2015-11-10 00:00:00"),
            url : "http://www.nextpittsburgh.com/city-design/creators-of-the-specksensor-app-want-pittsburgh-to-breathe-easier/"
         },
         {
            title : "New App Helps Pittsburghers Breathe Easier About Local Air Quality",
            author : "Anthony Priore",
            source : "WESA",
            date : new Date("2015-11-05 00:00:00"),
            url : "http://wesa.fm/post/new-app-helps-pittsburghers-breathe-easier-about-local-air-quality"
         },
         {
            title : "SpeckSensor App Compares Air Quality Locally and Across the Nation",
            author : "Byron Spice",
            source : "CMU",
            date : new Date("2015-11-02 00:00:00"),
            url : "http://www.cmu.edu/news/stories/archives/2015/november/air-quality-app.html"
         },
         {
            title : "Pike library to lend air-pollution monitors",
            author : "Jessica Cohen",
            source : "Times Herald-Record",
            date : new Date("2015-10-05 00:00:00"),
            file : {
               name : "20151005_Times_Herald_Record.pdf",
               type : "pdf"
            },
            url : "http://www.recordonline.com/article/20151005/NEWS/151009639"
         },
         {
            title : "Are cheap sensors, concerned citizens leading to a shift in air monitoring?",
            author : "Natasha Khan",
            source : "PublicSource",
            date : new Date("2015-09-06 00:00:00"),
            url : "https://timesleader.com/news/380660/are-cheap-sensors-concerned-citizens-leading-to-a-shift-in-air-monitoring"
         },
         {
            title : "Clean Up the Shenango Coke Works",
            author : "Thaddeus Popovich",
            source : "Pittsburgh Post Gazette",
            date : new Date("2015-09-03 00:00:00"),
            file : {
               name : "20150903_Pittsburgh_Post_Gazette.pdf",
               type : "pdf"
            },
            url : "http://www.post-gazette.com/opinion/2015/09/03/Clean-up-the-Shenango-coke-works/stories/201509030037"
         },
         {
            title : "What Are We Breathing?",
            author : "",
            source : "Heinz Endowments",
            date : new Date("2015-08-20 00:00:00"),
            url : "https://www.youtube.com/watch?v=Qgh5Bz57lt0"
         },
         {
            title : "How to Breathe Easy in Polluted Cities",
            author : "Sarah O'Meara",
            source : "CityLab",
            date : new Date("2015-07-14 00:00:00"),
            file : {
               name : "20150714_CityLab.pdf",
               type : "pdf"
            },
            url : "http://www.citylab.com/navigator/2015/07/how-to-breathe-easy-in-polluted-cities/398414/"
         },
         {
            title : "A Home Air Quality Monitor That Can Be Checked Out From The Library",
            author : "Larkin Page-Jacobs",
            source : "NPR",
            date : new Date("2015-05-24 00:00:00"),
            file : {
               name : "20150524_NPR.mp3",
               type : "audio"
            },
            url : "http://www.npr.org/2015/05/24/408786881/a-home-air-quality-monitor-that-can-be-checked-out-from-the-library"
         },
         {
            title : "Q&amp;A: Laying foundation for cleaner air",
            author : "Patty Tascarella",
            source : "Pittsburgh Business Times",
            date : new Date("2015-05-15 00:00:00"),
            file : {
               name : "20150515_PBT.pdf",
               type : "pdf"
            },
            url : "http://www.bizjournals.com/pittsburgh/print-edition/2015/05/15/laying-foundation-for-cleaner-air.html"
         },
         {
            title : "New device from CMU group monitors air quality in homes: Speck measures particulates with air intake",
            author : "Michelle Wright",
            source : "Pittsburgh's Channel 4 Action News",
            date : new Date("2015-05-08 00:00:00"),
            file : {
               name : "20150508_Channel4ActionNews.pdf",
               type : "pdf"
            },
            url : "http://www.wtae.com/news/new-device-speck-from-cmu-create-lab-monitors-air-quality-in-homes/32897792"
         },
         {
            title : "GreenSpace: Park bench will monitor air pollution",
            author : "Sandy Bauers",
            source : "Philly.Com",
            date : new Date("2015-04-26 00:00:00"),
            url : "http://www.philly.com/philly/health/20150426_GreenSpace__Park_bench_will_monitor_air_pollution.html"
         },
         {
            title : "Infosys Innovation Fund Invests in Air Quality Monitoring Pioneer, Airviz",
            author : "",
            source : "Infosys Press Release",
            date : new Date("2015-04-24 00:00:00"),
            file : {
               name : "20150424_Infosys.pdf",
               type : "pdf"
            },
            url : "http://www.infosys.com/newsroom/press-releases/Pages/air-quality-monitoring-pioneer.aspx"
         },
         {
            title : "KOMO4 News: Happy Earth Day 2015",
            author : "",
            source : "KOMO4 News",
            date : new Date("2015-04-22 00:00:00"),
            url : "https://www.youtube.com/watch?v=o6oCa9LiX1I&t=164"
         },
         {
            title : "Essential Pittsburgh: Testing Indoor Air Quality",
            author : "",
            source : "WESA",
            date : new Date("2015-04-21 00:00:00"),
            file : {
               name : "20150421_WESA.pdf",
               type : "pdf"
            },
            url : "http://wesa.fm/post/essential-pittsburgh-rising-amount-radon-pennsylvania-air"
         },
         {
            title : "Experimenting at Home With Air Quality Monitors",
            author : "Kate Galbraith",
            source : "The New York Times",
            date : new Date("2015-04-15 00:00:00"),
            file : {
               name : "20150415_New_York_Times.pdf",
               type : "pdf"
            },
            url : "http://www.nytimes.com/2015/04/16/business/experimenting-at-home-with-air-quality-monitors.html"
         },
         {
            title : "Urban Defence: Tracking Tools",
            author : "Madeleine Cuff and Sam Gaskin",
            source : "Stylus",
            date : new Date("2015-04-13 00:00:00"),
            file : {
               name : "20150413_Stylus.pdf",
               type : "pdf"
            },
            url : ""
         },
         {
            title : "Carnegie Library's take-out air-quality monitors are a hit with patrons",
            author : "Ashley Murray",
            source : "Pittsburgh City Paper",
            date : new Date("2015-04-08 00:00:00"),
            file : {
               name : "20150408_CityPaper.pdf",
               type : "pdf"
            },
            url : "http://www.pghcitypaper.com/pittsburgh/carnegie-librarys-take-out-air-quality-monitors-are-a-hit-with-patrons/Content?oid=1817043"
         },
         {
            title : "Speck, an in-home air monitor that assesses air quality and counts fugitive dust",
            author : "Deb Smit",
            source : "Next Pittsburgh",
            date : new Date("2015-03-30 00:00:00"),
            file : {
               name : "20150330_Next_Pittsburgh.pdf",
               type : "pdf"
            },
            url : "http://www.nextpittsburgh.com/business-tech-news/speck-home-air-monitor-assesses-air-quality-counts-fugitive-dust/"
         },
         {
            title : "CMU Tech Company Aims to Empower Pittsburgh with Cleaner Air",
            author : "Jessica Nath",
            source : "WESA",
            date : new Date("2015-03-30 00:00:00"),
            file : {
               name : "20150330_WESA.pdf",
               type : "pdf"
            },
            url : "http://wesa.fm/post/cmu-tech-company-aims-empower-pittsburgh-cleaner-air"
         },
         {
            title : "Carnegie Mellon University's Speck device monitors indoor pollution",
            author : "Aaron Aupperlee",
            source : "Pittsburgh Tribune Review",
            date : new Date("2015-03-29 00:00:00"),
            file : {
               name : "20150329_Pittsburgh_Tribune_Review.pdf",
               type : "pdf"
            },
            url : "http://triblive.com/news/allegheny/8008660-74/speck-particles-quality#axzz3aSa7EzTz"
         },
         {
            title : "Introducing Speck. The New Home Air Quality Monitor",
            author : "",
            source : "Environmental Technology Online",
            date : new Date("2015-03-25 00:00:00"),
            file : {
               name : "20150325_Environmental_Technology_Online.pdf",
               type : "pdf"
            },
            url : "http://www.envirotech-online.com/news/air-monitoring/6/breaking_news/introducing_speck.the_new_home_air_quality_monitor/33949/"
         },
         {
            title : "Speck monitors your home's air quality",
            author : "Antonio Pasolini",
            source : "gizmag",
            date : new Date("2015-03-18 00:00:00"),
            url : "http://www.gizmag.com/speck-indoor-air-monitor/36575/"
         },
         {
            title : "Carnegie Mellon Spinoff Introduces Speck, a Personal, Wi-Fi-connected Air Quality Monitor",
            author : "Byron Spice",
            source : "CMU",
            date : new Date("2015-03-16 00:00:00"),
            file : {
               name : "20150316_CMU_News.pdf",
               type : "pdf"
            },
            url : "http://www.cmu.edu/news/stories/archives/2015/march/speck-air-quality-monitor.html"
         },
         {
            title : "Air monitors provided to residents near Marcellus sites",
            author : "Emily Petsko",
            source : "Observer-Reporter",
            date : new Date("2014-07-19 00:00:00"),
            file : {
               name : "20140719_Observer_Reporter.pdf",
               type : "pdf"
            },
            url : "http://www.observer-reporter.com/article/20140719/NEWS080101/140719418"
         }
      ]
   });
});

router.get('/jobs', function(req, res) {
   res.render('jobs', { title : "Jobs", section : "jobs" });
});

router.get('/policies-and-terms', function(req, res) {
   res.render('policies-and-terms', {
      title : "Policies and Terms",
      section : "policies-and-terms"
   });
});

//======================================================================================================================
// USER VERIFICATION
//----------------------------------------------------------------------------------------------------------------------

router.get('/verification/:verificationToken', function(req, res) {
   // since we'll be injecting the verification token into JavaScript,
   // be paranoid and remove anything that's not a valid hex character
   var cleanedVerificationToken = (req.params.verificationToken) ? req.params.verificationToken.replace(/([^a-f0-9]+)/gi, '') : "";
   res.render('verification', { title : "Verify Your Account", verificationToken : cleanedVerificationToken });
});

router.get('/verification', function(req, res) {
   res.render('verification', { title : "Resend Account Verification Email" });
});

//======================================================================================================================
// DEPRECATED
//----------------------------------------------------------------------------------------------------------------------

router.get('/what-is-speck', function(req, res) {
   res.redirect('/');
});

router.get('/particles', function(req, res) {
   res.redirect('/learn/particles');
});

router.get('/faq', function(req, res) {
   res.redirect('/support/faq');
});

router.get('/contact', function(req, res) {
   res.redirect('/support/contact-us');
});

router.get('/buy', function(req, res) {
   res.redirect('http://store.specksensor.com/');
});

router.get('/software', function(req, res) {
   res.redirect('/support/software');
});

router.get('/legacy-software', function(req, res) {
   res.redirect('/support/legacy-software');
});

router.get('/data', function(req, res) {
   res.redirect('/public-data');
});

router.get('/terms', function(req, res) {
   res.redirect('/policies-and-terms');
});

router.get('/air-quality-by-zip-code', function(req, res) {
   res.redirect('/public-data');
});

//======================================================================================================================

module.exports = router;
