<?php

include 'sqlconnect.php';

global $conn;


$id = $_GET['id'];

$namelist = array();
$descriarray = array();
$query = "SELECT name, descri FROM booksdb.activity WHERE bookid = '".$id."'";
if(!mysqli_query($conn, $query)) echo mysqli_error($conn);
if($stmt = mysqli_prepare($conn, $query))
{
  mysqli_stmt_execute($stmt);
  mysqli_stmt_bind_result($stmt, $name, $descri);
  while(mysqli_stmt_fetch($stmt)){
  	if(preg_match('/review/', $descri))
    {array_push($namelist, $name);
    array_push($descriarray, $descri);
}
  }


}
$idstring = implode(',',$namelist);
$idstring.='.';
$idstring .= implode(',', $descriarray);
if(isset($namelist[0]))
 echo $idstring;
else echo 'No reviews available for this book';

 ?>
