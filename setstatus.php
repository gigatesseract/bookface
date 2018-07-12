<?php

include 'sqlconnect.php';
$id  =$_GET['id'];
$value = $_GET['value'];
global $conn;
if(!mysqli_query($conn, "INSERT INTO booksdb.activity VALUES ('".$_SESSION['user']."', '".$value."', '".$id."', DEFAULT)"))
echo 'Already added';
else echo 'added successfully';

 ?>
