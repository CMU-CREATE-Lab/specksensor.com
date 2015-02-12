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
if (!window['superagent']) {
   var noSuperagentMsg = "The superagent library is required by com.specksensor.AccessToken.js";
   alert(noSuperagentMsg);
   throw new Error(noSuperagentMsg);
}
//======================================================================================================================

(function() {

   com.specksensor.AccessToken = function() {

      var accessToken = null;

      this.load = function(callback) {
         if (accessToken != null) {
            return callback(null, accessToken);
         }
         superagent
               .get("/access-token?no-cache=" + new Date().getTime())
               .end(function(err, res) {
                       if (err) {
                          return callback(new Error("Failed to get the access token due to an unexpected error."));
                       }
                       // remember the accessToken for later, then return to the caller
                       accessToken = res.body.data ? res.body.data.token : null;
                       return callback(null, accessToken);
                    });
      };

      this.get = function() {
         return accessToken;
      };

      this.set = function(newAccessToken) {
         accessToken = newAccessToken;
      };
   };

})();
