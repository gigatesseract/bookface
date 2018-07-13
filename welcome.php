<?php
include 'sqlconnect.php';
include 'functions.php';
 ?>


<html lang="" dir="ltr">
  <head>
    <meta charset="utf-8">
    <title>welcome</title>
  </head>
  <body>
    welcome, <?php echo $_SESSION['user']; ?>
<br><br>
<a href="login.php">Log out</a>
<br><br>
<a href="profile.html">Click here to view your profile</a>
<br><br>
<p>Search by?</p>
  <select class="chooseby" name="chooseby" id = "chooseby">
    <option value="title">Title</option>
    <option value="author">Author</option>
    <option value="publisher">Publisher</option>
    <option value="isbn">ISBN number</option>
    <option value="genre">Genre</option>

  </select>
<input type="text" name="search" value="" placeholder = "search here" required id ="search" list="searchlist">
 <datalist id = "searchlist"></datalist>
  <input type="button" name="submit" value="Go" id = "submit">
    <div class="bookshelf" id = "bookshelf">
      <input type="button" name="fetch" value="Fetch my bookshelf" id = "fetch">
    </div>
    <div class="mylibrary">
      <p id = "mylibrary-heading">Search a book to get started</p>
    </div>
    <div class="recommendations" id = "recommendations">


    </div>
  </body>
  <script type="text/javascript" src = "bookfunctions.js">
  </script>
</html>
