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

    if ($_POST['titleData'] == "") {
      $description = $_POST['descriptionData'];
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
      $description = $_POST['descriptionData'];
      $query = "INSERT INTO $table (todoTitle, todoDescription) values ('$title', '$description')";
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