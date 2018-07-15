<?php
include 'sqlconnect.php';
include 'functions.php';

 ?>


<html lang="en" dir="ltr">
  <head>
    <meta charset="utf-8">
    <title>Log in</title>
    <link rel="stylesheet" type="text/css" href="megastyles.css">
  </head>
  <body>
    <h1>Log in!</h1>
    <div class = "login-form">
  <form class="login" action= <?php echo htmlspecialchars($_SERVER['PHP_SELF']); ?> method="post">


    <label for="username"> Username</label>
    <input type="text" name="username" value=""><br><br>
    <label for="password"> Password </label>
    <input type="password" name="password" value=""><br><br>
    <input type="submit" name="submit" value="Log In">
    <input type="hidden" name="userset" value="userset">


  </form>
  <p class ="sign-prompt"> Don't have an account? Click <a href="index.php"> here </a> to sign up</p>
</div>
  <?php
// if(isset($_SESSION))
// echo $_SESSION['passincorrect'];
// if(isset($_SESSION))
// {
//   echo '123';
//   session_destroy();
//
// }
// session_start();
  if(isset($_SESSION['loginerror'])){
    echo "You have to login again to proceed";
    unset($_SESSION['loginerror']);
  }
  if(isset($_POST['userset']))
  {
    process_username();
    unset($_POST['userset']);
  }

  function process_username(){
    global $conn;
    $name = test_in($_POST['username']);
    $pwd = test_in($_POST['password']);

    $query = "SELECT password FROM booksdb.login WHERE name = ?";
    if($stmt = mysqli_prepare($conn, $query))
    {
      mysqli_stmt_bind_param($stmt, 's', $name);
      mysqli_stmt_execute($stmt);
      mysqli_stmt_bind_result($stmt, $hash);
      mysqli_stmt_fetch($stmt);
      mysqli_stmt_store_result($stmt);

    }

    if(password_verify($pwd, $hash))
    {  $_SESSION['user'] = $name;
 redirect('welcome');
  


    }
    else {
      // $_SESSION['passincorrect'] = "123Invalid Username or Password";
      echo "Invalid Username or Password or type mismatch";
      //redirect("login.php");
    }

  }

   ?>
  </body>
</html>
