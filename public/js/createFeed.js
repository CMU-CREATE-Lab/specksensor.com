function submitCreateFeedForm(formElementId, deviceId, locationNameElementId, locationLatLong, isPublic, errorMessagesElementId, esdr, successCallback) {
   var messages = new com.specksensor.Messages();
   var form = $("#" + formElementId);
   var errorMessagesElement = $("#" + errorMessagesElementId);
   errorMessagesElement.empty().hide();

   var locationNameElement = $("#" + locationNameElementId);
   var locationName = locationNameElement.val().trim();

   var feed = {
      name : locationName,
      exposure : "indoor",
      latitude : locationLatLong.latitude,
      longitude : locationLatLong.longitude,
      isPublic : !!isPublic,
      isMobile : false
   };

   // perform simple validation
   if (feed.name.length <= 0) {
      messages.add("Location name is required.");
      locationNameElement.focus();
   }

   if (messages.isEmpty()) {
      setFormEnabled(form, false);
      esdr.feeds.create(deviceId,
                        feed,
                        {
                           complete : function() {
                              setFormEnabled(form, true);
                           },
                           created : function(result) {
                              successCallback(result);
                           },
                           unauthorized : function() {
                              messages.add("Sorry, you must log in to create this device feed.");
                              messages.render(errorMessagesElement);
                           },
                           forbidden : function() {
                              messages.add("Sorry, you do not have permission to create this device feed.");
                              messages.render(errorMessagesElement);
                           },
                           notFound : function() {
                              messages.add("Unknown device.");
                              messages.render(errorMessagesElement);
                           },
                           validationError : function(validationErrors) {
                              console.log(JSON.stringify(validationErrors, null, 3));
                              if (validationErrors && validationErrors.length > 0) {
                                 validationErrors.forEach(function(item) {
                                    var field = item.instanceContext;
                                    var constraintName = item.constraintName;
                                    switch (field) {
                                       case '#/name' :
                                          if (constraintName == 'minLength') {
                                             messages.add("The location name must be at least " + item.constraintValue + " characters.");
                                          }
                                          else if (constraintName == 'maxLength') {
                                             messages.add("The location name cannot be more than " + item.constraintValue + " characters.");
                                          }
                                          else {
                                             messages.add("Invalid location name.");
                                          }
                                          break;
                                       case '#/latitude' :
                                          messages.add("Invalid location latitude.");
                                          break;
                                       case '#/longitude' :
                                          messages.add("Invalid location longitude.");
                                          break;
                                       default:

                                    }
                                 });
                                 if (!messages.isEmpty()) {
                                    locationNameElement.focus();
                                    messages.render(errorMessagesElement);
                                 }
                              }
                           },
                           error : function() {
                              messages.add("Sorry, an unexpected error occurred while trying create the feed.  Please try again or contact us for help.");
                              messages.render(errorMessagesElement);
                           },
                           failure : function() {
                              messages.add("Sorry, an unexpected failure occurred while trying create the feed.  Please try again or contact us for help.");
                              messages.render(errorMessagesElement);
                           }
                        });
   }
   else {
      messages.render(errorMessagesElement);
   }

   return false;
}
