<?php
include 'sqlconnect.php';
include 'functions.php';

 ?>
<html lang="en" dir="ltr">
  <head>
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>

    </script>
    <script src = "https://cdn.jsdelivr.net/jquery.validation/1.15.1/jquery.validate.min.js">

    </script>
    <meta charset="utf-8">
    <title>Signup</title>
  </head>
  <body>
     <form class="form" action= <?php echo htmlspecialchars($_SERVER['PHP_SELF']);?> method="post">


     <label for="newuser"> Specify your username:- </label>
     <input type="text" name="newuser" value=""> <br><br>
     <label for="Email"> Enter your email</label>
     <input type="text" name="email" value=""> <br><br>
     <label for="pwd"> Password </label>
     <input type="password" name="pwd" value=""><br><br>
     <input type="submit" name="submit" value="Create Account">
     <input type="hidden" name="newset" value="newset">
   </form>



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
$query = "INSERT INTO booksdb.login VALUES (?,?,?)";
if($stmt = mysqli_prepare($conn, $query))
{
mysqli_stmt_bind_param($stmt, 'sss', $username, $email, $pwd);
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
