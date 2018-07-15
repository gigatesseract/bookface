<?php
include 'sqlconnect.php';
include 'functions.php';
 ?>


<html lang="" dir="ltr">
  <head>
    <meta charset="utf-8">
    <title>welcome</title>
    <link rel="stylesheet" type="text/css" href="megastyles.css">
  </head>
  <body>
    <div id = "popup">
      <div id = "review"></div>
    </div>
    <div id = 'blanket'>
    welcome, <?php echo $_SESSION['user']; ?>
<br><br>
 <a class = "logout" href="login.php">Log out</a> <a class = "my-profile" href="profile.html">My Profile</a>
 <h1> Welcome to Book-face, the social network for readers </h1>


  <div class = "titlesearch">
  <select class="chooseby" name="chooseby" id = "chooseby">
    <option value="title">Title</option>
    <option value="author">Author</option>
    <option value="publisher">Publisher</option>
    <option value="isbn">ISBN number</option>
    <option value="genre">Genre</option>

  </select>
<input type="text" class = "searchbar" name="search" value="" placeholder = "Search here" required id ="search" list="searchlist">
 <datalist id = "searchlist" class = "searchlist"></datalist>
  <input type="button" name="submit" value="Go" id = "submit" class = "submit"></div>

    <div class="mylibrary">
      <p id = "mylibrary-heading">Search a book to get started</p>
    </div>
    <div class="recommendations" id = "recommendations">

</div>
    </div>
  </body>
  <script type="text/javascript" src = "profilefunc.js">
  </script>
</html>
