<?php

include 'sqlconnect.php';
global $conn;
$id = array();
$descri = array();
$idstring = "";
// if(!mysqli_query($conn, "SELECT descri, bookid FROM booksdb.activity where name = '".$_SESSION['user']."' ORDER BY ts DESC" )) echo mysqli_error($conn);
// else echo "no error";
if($stmt = mysqli_prepare($conn, "SELECT descri, bookid FROM booksdb.activity where name = '".$_SESSION['user']."' ORDER BY ts DESC")){
  mysqli_stmt_execute($stmt);
  mysqli_stmt_bind_result($stmt, $description, $bookid);
  while(mysqli_stmt_fetch($stmt)){

array_push($id, $bookid);
array_push($descri, $description);

  }
}


 $idstring .= implode(',', $id);
 $idstring.='.';
 $idstring.= implode(',', $descri);
echo $idstring;


 ?>
