<?php

include 'sqlconnect.php';

global $conn;

$string = $_GET['q'];
$name = $_GET['name'];
$queryname;
if($name == "undefined"){
$queryname = $_SESSION['user'];
}
else $queryname =$name;
$id = array();
$descriarray = array();
$query = "SELECT bookid FROM booksdb.activity WHERE name = '".$queryname."' AND descri = '".$string."'";
mysqli_prepare($conn, $query);
if($stmt = mysqli_prepare($conn, $query))
{
  mysqli_stmt_execute($stmt);
  mysqli_stmt_bind_result($stmt, $bookid);
  while(mysqli_stmt_fetch($stmt)){
    array_push($id, $bookid);
    
  }


}
$idstring = implode(',',$id);
if(isset($id[0])) echo $idstring;

 ?>
