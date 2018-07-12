<?php

function redirect($url)
{
  ob_clean();
  header('Location: '.$url);
  exit();
}

function test_in($data){

  $data = trim($data);
  $data = stripslashes($data);
  $data = htmlspecialchars($data);
  return $data;
}

 ?>
