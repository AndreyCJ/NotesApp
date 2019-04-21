<!DOCTYPE html>
<html lang="ru">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <link rel="stylesheet" href="css/main.css">
  <link href="https://fonts.googleapis.com/css?family=Roboto" rel="stylesheet">
  <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.7.2/css/all.css"
    integrity="sha384-fnmOCqbTlWIlj8LyTjo7mOUStjsKC4pOpQbqyi7RrhN7udi9RwhKkMHpvLbHG9Sr" crossorigin="anonymous">
  <title>TodoApp</title>
</head>

<body>
  <section class="add-notes">
    <div class="add-notes-bg">
      <div class="add-notes-container">
        <div class="addNoteTitle">
          <input id="addNoteTitle" type="text" req placeholder="Заголовок (не обязательно)">
        </div>
        <div class="addNoteDescription">
          <textarea name="addNoteDescription" cols="30" rows="10" id="addNoteDescription" placeholder="Заметка..."
            required></textarea>
        </div>
        <div class="addNoteFunctions">
          <div class="leftButtons">
            <button class="btn_big" id="submitNoteBtn">
              Добавить
            </button>
          </div>
          <div class="rightButtons">
            <button class="btn_big" id="closeAddNoteBtn">
              Закрыть
            </button>
          </div>
        </div>
      </div>
  </section>

  <section class="update-notes">
    <div class="add-notes-bg">
      <div class="add-notes-container">
        <div class="addNoteTitle">
          <input id="updateNoteTitle" type="text" req placeholder="Заголовок">
        </div>
        <div class="addNoteDescription">
          <textarea name="updateNoteDescription" cols="30" rows="10" id="updateNoteDescription" placeholder="Заметка..."
            required></textarea>
        </div>
        <div class="addNoteFunctions">
          <div class="leftButtons">
            <button class="btn_big" id="updateNoteBtn">
              Обновить
            </button>
          </div>
          <div class="rightButtons">
            <button class="btn_big" id="closeUpdateNoteBtn">
              Закрыть
            </button>
          </div>
        </div>
      </div>
  </section>

  <header>
    <div class="container">
      <div class="left-side">
        <!-- <div class="header-item">
          <div class="open-menu-button">
            <i class="fas fa-bars" id="openMenuBtn"></i>
          </div>
        </div> -->

        <div class="header-item">
          <div class="logo">
            <h2>
              <a href="#">Заметки</a>
            </h2>
          </div>
        </div>

        <!-- <div class="header-item">
          <div class="search">
            <div class="search-left">
              <div class="btn">
                <i class="fas fa-search"></i>
              </div>
            </div>
            <div class="search-center">
              <input type="text" placeholder="Поиск">
            </div>
            <div class="search-right">
              <div class="btn">
                <i class="fas fa-times"></i>
              </div>
            </div>
          </div> 
        </div>-->
      </div>

      <div class="right-side">
        <div class="header-item ">
          <button class="btn_big addNoteButton">
            <i class="fas fa-plus"></i>
            Добавить заметку
          </button>
        </div>

        <!-- <div class="header-item profile_div">
          <div class="profile">
            <a href="#">
              <img src="img/profile-photo.png">
            </a>
          </div>
        </div> -->
      </div>

    </div>
  </header>

  <section class="main">

    <section class="notes">
      <ul class="list-notes"></ul>
    </section>
  </section>

</body>

<script src="scripts/imagesloaded.pkgd.min.js"></script>
<script src="scripts/ajax.js"></script>
<script src="scripts/ui.js"></script>

</html>