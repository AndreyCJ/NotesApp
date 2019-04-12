class NoteForm {
  constructor() {
    this.addNotesForm = document.querySelector('section.add-notes');
    this.addNoteButton = document.querySelector('button.addNoteButton');
    this.closeAddNoteButton = document.querySelector('button#closeAddNoteBtn');
    this.bg = document.querySelector('.add-notes-bg');
    this.submitBtn = document.querySelector('button#submitNoteBtn');
    this.updateBtn = document.querySelector('button#updateNoteBtn');
    this.description = document.querySelector('#addNoteDescription');
    this.title = document.getElementById('addNoteTitle');
    this.arrayOfInputs = document.querySelectorAll('#addNoteTitle, #addNoteDescription');
    this.openMenu = document.querySelector('#openMenuBtn');

    // Переменные для обновления данных
    this.updateNotesForm = document.querySelector('section.update-notes');
    this.updateBtn = document.querySelector('button#updateNoteBtn');
    this.closeUpdateNoteBtn = document.querySelector('#closeUpdateNoteBtn');

    if(window.innerWidth <= 790) {
      this.addNoteButton.innerHTML = '<i class="fas fa-plus"></i>';
      this.addNoteButton.querySelector('i').style.marginRight = '0px';
    } else {
      this.addNoteButton.innerHTML = '<i class="fas fa-plus"></i>Добавить заметку';
    }

    // let timer = setTimeout(() => this.openMoreInfo(), 1000);
    this.events();
  }

  events() {
    this.addNoteButton.addEventListener('click', this.showAddNoteForm.bind(this));
    this.closeAddNoteButton.addEventListener('click', this.closeAddNoteForm.bind(this));
    this.closeUpdateNoteBtn.addEventListener('click', this.closeUpdateNoteForm.bind(this));
    window.addEventListener('resize', () => {
      if(window.innerWidth <= 790) {
        this.addNoteButton.innerHTML = '<i class="fas fa-plus"></i>';
      } else {
        this.addNoteButton.innerHTML = '<i class="fas fa-plus"></i>Добавить заметку';
      }
    });
  }


  showAddNoteForm() {
    this.updateBtn.style.display = "none";
    this.submitBtn.style.display = "none";
    this.addNotesForm.style.display = "block";
    this.description.focus();
    // Проверка заполнения при открытии
    if (this.description.value != "") {
      this.submitBtn.style.display = "block";
    } else {
      this.submitBtn.style.display = "none";
    }

    // Проверка заполнения при вводе (this.title.value != "" && this.description.value != "")
    if (this.updateBtn.style.display == "none"){
      this.arrayOfInputs.forEach((e) => e.addEventListener("input", this.showAddNoteListener = () => {
        if (this.description.value != "") {
          this.submitBtn.style.display = "block";
        } else {
          this.submitBtn.style.display = "none";
        }
      }));
    }

  }

  closeAddNoteForm() {
    this.addNotesForm.style.display = "none";
    // this.arrayOfInputs.forEach((e) => e.removeEventListener("input", this.showAddNoteListener));
  }

  closeUpdateNoteForm() {
    this.updateNotesForm.style.display = "none";
  }
}


const noteForm = new NoteForm();