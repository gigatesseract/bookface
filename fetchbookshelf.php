<?php

include 'sqlconnect.php';

global $conn;
$id = array();
$query = "SELECT bookid FROM booksdb.activity WHERE name = '".$_SESSION['user']."' AND descri = 'bookshelf'";
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
else echo 'there are no books in the bookshelf';


 ?>
