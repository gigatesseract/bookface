<?php

include 'sqlconnect.php';
global $conn;
$name = $_GET['name'];
if($name == "undefined"){
	$queryname = $_SESSION['user'];

}
else $queryname = $name;

if($stmt = mysqli_prepare($conn, "SELECT accesslevel from booksdb.login WHERE name = ?"))
{
	mysqli_stmt_bind_param($stmt, 's', $queryname);
	mysqli_stmt_execute($stmt);
	mysqli_stmt_bind_result($stmt, $al);
	mysqli_stmt_fetch($stmt);
	echo $al;
}



?>