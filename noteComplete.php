<?php
require_once 'db_conn.php';

class noteComplete {
  public function __construct()
  {
    $this->note_complete();
  }

  public function note_complete() {
    // Соединение с базой final_todo
    db_connection();
    global $db;
    $db["connect"];
    $table = $db["table"];

    // $title = $_POST['titleData'];
    $done = $_POST['done'];
    $id = $_POST['id'];

    if($done == 1) {
      $query = "UPDATE $table SET done='1' WHERE id=$id";
      if (mysqli_query($db["connect"], $query)) {
        echo json_encode("Помечено как выполненное", JSON_UNESCAPED_UNICODE);
        mysqli_close($db["connect"]);
      } else {
        echo json_encode("Ошибка при выполнении\n".$query, JSON_UNESCAPED_UNICODE);
        mysqli_close($db["connect"]);
      }
    } else {
      $query = "UPDATE $table SET done='0' WHERE id=$id";
      if (mysqli_query($db["connect"], $query)) {
        echo json_encode("Помечено как не выполненное", JSON_UNESCAPED_UNICODE);
        mysqli_close($db["connect"]);
      } else {
        echo json_encode("Ошибка при выполнении\n".$query, JSON_UNESCAPED_UNICODE);
        mysqli_close($db["connect"]);
      }
    }
    
  }
}

$noteComplition = new noteComplete();