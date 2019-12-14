<?php 

function db_connection() {
  global $db;

  $servername = "localhost";
  $username = "root";
  $password = "";
  $dbName = "todoList";

  // Connect to MySQL
  $conn = new mysqli($servername, $username, $password);
  if ($conn->connect_error) {
      die("Connection failed: " . $conn->connect_error);
  }

  // If database is not exist create one
  if (!mysqli_select_db($conn,$dbName)){
      $sql = "CREATE DATABASE ".$dbName;
      if ($conn->query($sql) === TRUE) {
          echo "Database created successfully";
      }else {
          echo "Error creating database: " . $conn->error;
      }
  }
  
  // If table does not exists create one
  mysqli_set_charset($db["connect"], 'utf8');

  $query = "SELECT ID FROM todo";
  $result = mysqli_query($conn, $query);

  if(empty($result)) {
    $query = "CREATE TABLE todo (
      id int(11) NOT NULL,
      todoTitle varchar(200) NOT NULL,
      todoDescription text NOT NULL,
      done tinyint(1) DEFAULT 0
    )";
    $result = mysqli_query($conn, $query);
  }

  $db = array(
    "connect" => $conn,
    "table" => "todo"
  );
  return $db;
}