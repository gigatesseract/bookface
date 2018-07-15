<?php

include 'sqlconnect.php';
global $conn;

$value = $_GET['q'];
if(!mysqli_query($conn,  "UPDATE booksdb.login SET accesslevel = '".$_GET['q']."' WHERE name = '".$_SESSION['user']."'"))
echo mysqli_error($conn);
else echo 'Access level set successfully';ll