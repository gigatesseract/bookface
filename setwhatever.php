<?php

include 'sqlconnect.php';
$descri = $_GET['q'];
$id = $_GET['id'];
$title = $_GET['title'];
$timestamp = date('Y-m-d G:i:s');
global $conn;
if(!mysqli_query($conn, "INSERT INTO booksdb.activity VALUES ('".$_SESSION['user']."', '".$descri."', '".$id."', DEFAULT, '".$title."')"))
	if($stmt = mysqli_prepare($conn, "INSERT INTO booksdb.activity VALUES (?,?,?,?,?)"))
	{
		mysqli_stmt_bind_param($stmt, 'sssss', $_SESSION['user'], $descri, $id,$timestamp, $title);
		mysqli_stmt_execute($stmt);
		
	}

echo 'added successfully';


 ?>
