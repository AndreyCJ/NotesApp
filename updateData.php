<?php
require_once 'db_conn.php';

class updateData {
  public function __construct()
  {
    $this->update_data();
  }

  public function update_data() {
    // Соединение с базой final_todo
    db_connection();
    global $db;
    $db["connect"];
    $table = $db["table"];


    // $title = $_POST['titleData'];
    $description = $_POST['newDescription'];
    $id = $_POST['id'];

    

    if(!empty($_POST['newTitle']) || $_POST['newTitle'] != '' || $_POST['newTitle'] != 0 || !empty($_POST['newDescription']) || $_POST['newDescription'] != '' ) {
      $title = $_POST['newTitle'];
      $query = "UPDATE $table SET todoTitle='$title', todoDescription='$description' WHERE id=$id";
      if (mysqli_query($db["connect"], $query)) {
        echo json_encode("Successfully Updated");
        mysqli_close($db["connect"]);
      } else {
        echo json_encode("Update Failed\n".$query);
        mysqli_close($db["connect"]);
      }
    } else {
      $query = "UPDATE $table SET todoTitle='', todoDescription='$description' WHERE id=$id";
      if (mysqli_query($db["connect"], $query)) {
        echo json_encode("Successfully Updated");
        mysqli_close($db["connect"]);
      } else {
        echo json_encode("Update Failed\n".$query);
        mysqli_close($db["connect"]);
      }
    }
    
  }
}

$updateTheData = new updateData();