<?php
require_once 'db_conn.php';

class insertData {
  public function __construct()
  {
    $this->insert_data();
  }

  public function insert_data() {
    // Соединение с базой final_todo
    db_connection();
    global $db;
    $db["connect"];
    $table = $db["table"];

    
    $description = $_POST['descriptionData'];

    // $descripArr = explode("\n", $description);

    // echo json_encode($description."<- this is description");

    if (empty($_POST['titleData'])) {
      $query = "INSERT INTO $table (todoDescription) values ('$description')";
      if (mysqli_query($db["connect"], $query)) {
        echo json_encode("Successfully Inserted");
        mysqli_close($db["connect"]);
      } else {
        echo json_encode("Insertion Failed\n".$query);
        mysqli_close($db["connect"]);
      }
    } else {
      $title = $_POST['titleData'];
      $query = "INSERT INTO $table (todoTitle, todoDescription) values ('$title', '$description')";
      // foreach($descripArr as $line) {
      //   $query = "INSERT INTO $table (todoDescription) values ('".$line."')";
      // }
      if (mysqli_query($db["connect"], $query)) {
        echo json_encode("Successfully Inserted");
        mysqli_close($db["connect"]);
      } else {
        echo json_encode("Insertion Failed\n".$query);
        mysqli_close($db["connect"]);
      }
    }
    
  }
}

$insertTheData = new insertData();