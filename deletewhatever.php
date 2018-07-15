

<?php

include 'sqlconnect.php';

global $conn;

$string = $_GET['q'];
$id = $_GET['id'];
$queryname = $_SESSION['user'];
$descriarray = array();
$query = "DELETE FROM booksdb.activity WHERE name = '".$queryname."' AND descri = '".$string."' and bookid = '".$id."'";
mysqli_prepare($conn, $query);
if($stmt = mysqli_prepare($conn, $query))
{
  mysqli_stmt_execute($stmt);
  mysqli_stmt_bind_result($stmt, $bookid);
  while(mysqli_stmt_fetch($stmt)){
    array_push($id, $bookid);
    
  }


}
echo 'done successfully';

 ?>

