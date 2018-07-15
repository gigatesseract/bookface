<?php

include 'sqlconnect.php';
global $conn;
$title = array();
$descri = array();
$idstring = "";
$queryname;
$name = $_GET['name'];
if($name == "undefined"){
$queryname = $_SESSION['user'];
}
else $queryname =$name;

if($stmt = mysqli_prepare($conn, "SELECT descri, titleandby FROM booksdb.activity where name = '".$queryname."' ORDER BY ts DESC")){
  mysqli_stmt_execute($stmt);
  mysqli_stmt_bind_result($stmt, $description, $titleandby);
  while(mysqli_stmt_fetch($stmt)){

array_push($title, $titleandby);
array_push($descri, $description);

  }
}
// if(!mysqli_query($conn, "SELECT descri, titleandby FROM booksdb.activity where name = '".$queryname."' ORDER BY ts DESC"))
// echo mysqli_error($conn);


 $idstring .= implode(',,,,,', $title);
 $idstring.='.....';
 $idstring.= implode(',,,,,', $descri);
echo $idstring;


 ?>
