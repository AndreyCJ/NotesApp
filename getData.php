<?php

require_once 'db_conn.php';

class getData {
  public function __construct()
  {
    $this->receive_data();
  }

  public function receive_data() {
    // Соединение с базой final_todo
    db_connection();
    global $db;
    $db["connect"];
    $table = $db["table"];
  
    // Выбор всех элементов в таблице todo
    $result = mysqli_query($db["connect"], "SELECT * FROM $table");
  
    // Помещение в массив
    $data = array();
    while($row = mysqli_fetch_assoc($result)){
      $data[] = $row;
    }
  
    // Возвращает ответ в JSON формате
    echo json_encode($data);
    // Закрытие соединения с БД
    mysqli_close($db["connect"]);
  }

  
}

$getTheData = new getData();