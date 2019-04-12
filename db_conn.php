<?php 

function db_connection() {
  global $db;
  
  $conn = mysqli_connect('localhost', 'root', '', 'todolist') or die("Couldn't connect to database.");
  

  $db = array(
    "connect" => $conn,
    "table" => "todo"
  );

  mysqli_set_charset($db["connect"], 'utf8');
  return $db;
}