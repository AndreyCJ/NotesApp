<?php

require_once 'db_conn.php';

class deleteData {
  public function __construct()
  {
    $this->delte_data();
  }

  public function delte_data() {
    // Соединение с базой final_todo
    db_connection();
    global $db;
    $db["connect"];
    $table = $db["table"];
  
    // Взятие переменной с JavaScript
    $itemId = $_POST['targetId'];

    // Удаление эелемента с подходящим id
    $query = "DELETE FROM $table WHERE id=$itemId";

    if (mysqli_query($db["connect"], $query)) {
      echo json_encode("Note was successfully deleted");
      mysqli_close($db["connect"]);
    } else {
      echo json_encode("Delete failed\n".$query);
      mysqli_close($db["connect"]);
    }
  }
}

$deleteTheData = new deleteData();