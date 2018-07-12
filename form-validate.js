$(function(){

$("form[class ='form']").validate({
 rules: {
   newuser: {
     required: true
   },
  email: {
     required: true,
     email: true
   },
   pwd: {
     required: true,
     minlength: 6
   },
 },
 messages: {
   newuser: {
     required: "Please enter an username"
   },
   email: {
     required: "Please provide an email iD",
     email: "The email iD must be valid. (abc@abc.abc)"
   },
   password: {
     required: "Please provide a password",
     minlength: "Password must be atleast 6 characters long",
   }
 },
   submitHandler: function(form){
     form.submit();
   }

});


});
