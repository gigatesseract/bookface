<?php
session_start();
$conn = mysqli_connect("localhost", "pc", "pc");
mysqli_query($conn, "CREATE DATABASE booksdb");
$query = "CREATE TABLE booksdb.login (name char(100), email char(100), password char(255))";
mysqli_query($conn, $query);
mysqli_query($conn, "CREATE TABLE booksdb.activity (name char(100), descri char(100), bookid char(100), ts datetime  NOT NULL DEFAULT CURRENT_TIMESTAMP)");


 ?>
