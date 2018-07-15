<?php
include 'sqlconnect.php';
include 'functions.php';

 ?>
<html lang="en" dir="ltr">
  <head>
    <link rel="stylesheet" type="text/css" href="megastyles.css">
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>

    </script>
    <script src = "https://cdn.jsdelivr.net/jquery.validation/1.15.1/jquery.validate.min.js">

    </script>
    <meta charset="utf-8">
    <title>Signup</title>
  </head>
  <body>
    <h1 class = "signup-heading">The social network for readers, welcome to BookFace</h1>
    <div class = "signup-form">
     <form class="form" action= <?php echo htmlspecialchars($_SERVER['PHP_SELF']);?> method="post">


     <label for="newuser"> Specify your username:- </label>
     <input type="text" name="newuser" value=""> <br><br>
     <label for="Email"> Enter your email:- </label> <span class = "white-space"></span>
     <input type="text" name="email" value=""> <br><br>
     <label for="pwd"> Password:- </label><span class = "whitespace2"></span>
     <input type="password" name="pwd" value=""><br><br>
     <input type="submit" name="submit" value="Create Account">
     <input type="hidden" name="newset" value="newset">
   </form>
 </div>
<p class = "login-prompt"> Already have an account? Clike <a href="login.php"> here </a> to login</p>


   <?php



 if(isset($_POST['newset']))
 {
   process_form();
   unset($_POST['newset']);
 }

function process_form(){
  global $conn;
$username = test_in($_POST['newuser']);
$pwd = password_hash(test_in($_POST['pwd']), PASSWORD_DEFAULT);
$email = test_in($_POST['email']);
$query = "INSERT INTO booksdb.login VALUES (?,?,?,?)";
if($stmt = mysqli_prepare($conn, $query))
{
$al = "public";
mysqli_stmt_bind_param($stmt, 'ssss', $username, $email, $pwd, $al);
mysqli_stmt_execute($stmt);
}
if(!mysqli_query($conn, "INSERT INTO booksdb.activity VALUES ('".$username."', 'Account created', 'NULL', DEFAULT)"))
echo mysqli_error($conn);

redirect("login");


}


    ?>
  </body>
  <script type="text/javascript" src = "form-validate.js">

  </script>
  <script type="text/javascript">


  </script>
</html>
