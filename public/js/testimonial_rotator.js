// Put long testimonials (> 180 chars) at the end
var testimonials = [
  "My husband and son have asthma and the Speck has been very informative about why their symptoms are worse at night.",
  "I absolutely love being able to measure the air quality of what I'm breathing in - the Speck is a very empowering tool.",
  "I have learned a surprising amount about my home and work environment and have found solutions to problems. I'm breathing easier!",
  "I found myself checking the display each time I walked past. It was a useful and interesting data point about our lives that had not been revealed before.",
  "The Speck gave me a sense of relief to know that the air in my home was basically good, since I live near a coke plant that exceeds particulate emission standards many days a year!",
  "The biggest surprises were how different household activities affected the readings. I had thought opening the windows would freshen the air - not so!",
  "The Speck opened our eyes to all of the ways that we could improve and control the air quality in our home. Fantastic information!",
  "It's been fun watching the reading on the Speck go up and down in response to predictable stimuli.",
  "The Speck is great. I've found it very beneficial as someone who is very concerned about my health.",
  "I think Specks will be super useful to many, many people in the future, including asthmatics like myself.",
  "I never thought about the invisible particles floating around before. It was interesting to watch the monitor spike and then drop. After the first time, I was more confident that the spike would drop again. I totally knew the cause.",
  "Mostly the Speck has been fun to have and has certainly been the topic of conversation whenever someone sees it for the first time - so it has been good at initiating conversations about air quality - which is a good thing in my opinion."
];

var testimonialContainers;
var testimonialsToCycle;
var testimonialInterval;
var timeoutMillis = [3000, 5000, 7000, 10000];

function initialize() {
  testimonialContainers = $(".testimonals > p").toArray();
  testimonialsToCycle = testimonials.slice(0);
  for (var i = 0; i < testimonialContainers.length; i++) {
    setTestimonials(true);
  }
}

function setTestimonials(changeInstantly) {
  var testimonialContainer;
  var fadeTimeout = changeInstantly ? 0 : 4000;
  var changeTimeout = changeInstantly ? 10000 : Math.floor(Math.random() * timeoutMillis.length);
  if (testimonialsToCycle.length === 0)
    testimonialsToCycle = testimonials.slice(0);
  var testimonial = testimonialsToCycle.splice(Math.floor(Math.random() * (testimonialsToCycle.length - (2 * !!changeInstantly))), 1)[0];
  // Long testimonials go to the second container
  if (testimonial.length > 180)
    testimonialContainer = testimonialContainers.splice(testimonialContainers.indexOf($(".ts2")[0]), 1)[0];
  else
    testimonialContainer = testimonialContainers.shift();
  testimonialContainers.push(testimonialContainer);
  testimonialContainer = $(testimonialContainer);
  testimonialContainer.fadeOut(fadeTimeout, function(){
    testimonialContainer.html('<span class="big_quote">"</span>' + testimonial + '<span class="big_quote">"</span>');
    testimonialContainer.fadeIn(fadeTimeout, function() {
      // Set the timeout to trigger again in 3, 5, 7, or 10 seconds
      window.clearInterval(testimonialInterval);
      testimonialInterval = setTimeout(setTestimonials, changeTimeout);
    });
  });}

$(function() {
  initialize();
});
