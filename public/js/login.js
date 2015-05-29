function submitLoginForm(formElementId, emailElementId, passwordElementId, messagesElementId, redirectToAfterLogin, successHandler, unauthorizedHandler) {
   var messages = new com.specksensor.Messages();
   var messagesElement = $("#" + messagesElementId);
   var form = $("#" + formElementId);
   var emailElement = $("#" + emailElementId);
   var passwordElement = $("#" + passwordElementId);
   var email = emailElement.val().trim();
   var password = passwordElement.val();

   messagesElement.empty().hide();

   var user = {
      email : email,
      password : password
   };

   // perform simple validation
   if (user.password.length <= 0) {
      messages.add("Password is required.");
      passwordElement.focus();
   }
   if (user.email.length <= 0) {
      messages.add("Email address is required.");
      emailElement.focus();
   }

   var defaultSuccessHandler = function() {
      if (redirectToAfterLogin && redirectToAfterLogin.length > 0) {
         window.location.href = redirectToAfterLogin;
      }
      else {
         window.location.href = '/dashboard';
      }
   };

   var defaultUnauthorizedHandler = function(messages) {
      messages.add('Login failed. Please double-check your login below and make sure you have ' +
                   'activated your account by clicking the link in the verification email we sent ' +
                   'when you signed up. If you don\'t have the email, you can <a href="/verification">request a new one</a>.');
   };

   successHandler = successHandler || defaultSuccessHandler;
   unauthorizedHandler = unauthorizedHandler || defaultUnauthorizedHandler;

   if (messages.isEmpty()) {
      setFormEnabled(form, false);
      superagent
            .post("/login")
            .send(user)
            .end(function(err, res) {
                    setFormEnabled(form, true);
                    console.log(JSON.stringify(res.body, null, 3));
                    if (res.status == 200) {
                       successHandler(res.body.data);
                    }
                    else if (res.status == 401) {
                       unauthorizedHandler(messages);
                    }
                    else {
                       messages.add("Login failed due to an unexpected error.  Please try again later.");
                    }
                    emailElement.focus();
                    messages.render(messagesElement);
                 });
   }
   else {
      messages.render(messagesElement);
   }

   return false;
}
