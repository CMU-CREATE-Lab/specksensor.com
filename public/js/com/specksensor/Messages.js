//======================================================================================================================
// VERIFY NAMESPACE
//======================================================================================================================
// Create the global symbol "com" if it doesn't exist.  Throw an error if it does exist but is not an object.
var com;
if (!com) {
   com = {};
}
else {
   if (typeof com != "object") {
      var comExistsMessage = "Error: failed to create com namespace: com already exists and is not an object";
      alert(comExistsMessage);
      throw new Error(comExistsMessage);
   }
}

// Repeat the creation and type-checking for the next level
if (!com.specksensor) {
   com.specksensor = {};
}
else {
   if (typeof com.specksensor != "object") {
      var comSpecksensorExistsMessage = "Error: failed to create com.specksensor namespace: com.specksensor already exists and is not an object";
      alert(comSpecksensorExistsMessage);
      throw new Error(comSpecksensorExistsMessage);
   }
}
//======================================================================================================================
// DEPENDECIES
//======================================================================================================================
if (!window['$']) {
   var nojQueryMsg = "The jQuery library is required by com.specksensor.Messages.js";
   alert(nojQueryMsg);
   throw new Error(nojQueryMsg);
}
//======================================================================================================================

(function() {

   com.specksensor.Messages = function() {
      var messages = [];

      this.render = function(containerElement) {
         if (messages.length > 0) {
            containerElement.empty();
            messages.forEach(function(message) {
               containerElement.append('<div>' + message + '</div>');
            });
            containerElement.show();
         }
      };

      this.add = function(message) {
         if (message) {
            messages.push(message);
         }
      };

      this.isEmpty = function() {
         return messages.length == 0;
      };
   };

})();
