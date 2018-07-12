<?php

include 'sqlconnect.php';
$id = $_GET['id'];
global $conn;
if(!mysqli_query($conn, "INSERT INTO booksdb.activity VALUES ('".$_SESSION['user']."', 'bookshelf', '".$id."', DEFAULT)"))
echo 'Already added';
else echo 'added successfully';


 ?>
