<?php
require_once 'db_conn.php';

class insertData {
  public function __construct()
  {
    $this->insert_data();
  }

  public function insert_data() {
    // Соединение с базой данных
    db_connection();
    global $db;
    $db["connect"];
    $table = $db["table"];
    $title = $_POST['titleData'];

    if ($title == "") {
      $description = mysqli_real_escape_string($db["connect"], $_POST['descriptionData']);
      $query = "INSERT INTO $table (todoTitle, todoDescription) values ('', '$description')";
      if (mysqli_query($db["connect"], $query)) {
        echo json_encode("Запись добавлена", JSON_UNESCAPED_UNICODE);
        mysqli_close($db["connect"]);
      } else {
        echo json_encode("Ошибка при добавлении записи\n ".$query, JSON_UNESCAPED_UNICODE);
        mysqli_close($db["connect"]);
      }
    } else {
      $description = mysqli_real_escape_string($db["connect"], $_POST['descriptionData']);
      $query = "INSERT INTO $table (todoTitle, todoDescription) values ('$title', '$description')";
      if (mysqli_query($db["connect"], $query)) {
        echo json_encode("Запись добавлена", JSON_UNESCAPED_UNICODE);
        mysqli_close($db["connect"]);
      } else {
        echo json_encode("Ошибка при добавлении записи\n ".$query, JSON_UNESCAPED_UNICODE);
        mysqli_close($db["connect"]);
      }
    }
    
  }
}

$insertTheData = new insertData();