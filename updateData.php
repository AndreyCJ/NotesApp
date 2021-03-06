<?php
require_once 'db_conn.php';

class updateData {
  public function __construct()
  {
    $this->update_data();
  }

  public function update_data() {
    // Соединение с базой данных
    db_connection();
    global $db;
    $db["connect"];
    $table = $db["table"];

    if ($_POST['newTitle'] != "") {
      $title = $_POST['newTitle'];
      $description = mysqli_real_escape_string($db["connect"], $_POST['newDescription']);
      $id = $_POST['id'];
      // echo json_encode($title);
      $query = "UPDATE $table SET todoTitle='$title', todoDescription='$description' WHERE id=$id";
      if (mysqli_query($db["connect"], $query)) {
        echo json_encode("Изменения сохранены", JSON_UNESCAPED_UNICODE);
        mysqli_close($db["connect"]);
      } else {
        echo json_encode("Ошибка при сохранении изменений\n".$query, JSON_UNESCAPED_UNICODE);
        mysqli_close($db["connect"]);
      }
    } else {
      $description = mysqli_real_escape_string($db["connect"], $_POST['newDescription']);
      $id = $_POST['id'];
      $query = "UPDATE $table SET todoTitle='', todoDescription='$description' WHERE id=$id";
      if (mysqli_query($db["connect"], $query)) {
        echo json_encode("Изменения сохранены", JSON_UNESCAPED_UNICODE);
        mysqli_close($db["connect"]);
      } else {
        echo json_encode("Ошибка при сохранении изменений\n".$query, JSON_UNESCAPED_UNICODE);
        mysqli_close($db["connect"]);
      }
    }
  }
}

$updateTheData = new updateData();