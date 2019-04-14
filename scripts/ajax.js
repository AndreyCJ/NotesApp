class Notes {
  constructor() {
    this.request = new XMLHttpRequest();
    
    // UI для вставки данных
    this.description = document.getElementById('addNoteDescription');
    this.title = document.getElementById('addNoteTitle');
    this.submitBtn = document.querySelector('button#submitNoteBtn');
    this.notesContainer = document.querySelector('ul.list-notes');    
    this.addNotesForm = document.querySelector('section.add-notes');
    this.blank = document.querySelector('.blank');
    this.mockData;

    // UI для обновления данных
    this.updateNotesForm = document.querySelector('section.update-notes');
    this.updateBtn = document.querySelector('button#updateNoteBtn');
    this.closeUpdateNoteBtn = document.querySelector('#closeUpdateNoteBtn');
    this.updateDescription = document.getElementById('updateNoteDescription');
    this.updateTitle = document.getElementById('updateNoteTitle');

    // UI для формы заметок
    this.addNoteButton = document.querySelector('button.addNoteButton');
    this.closeAddNoteButton = document.querySelector('button#closeAddNoteBtn');
    this.bg = document.querySelector('.add-notes-bg');
    this.arrayOfInputs = document.querySelectorAll('#addNoteTitle, #addNoteDescription');
    this.openMenu = document.querySelector('#openMenuBtn');

    // UI для готовых заметок
    this.completeBtn = document.querySelector('#completeBtn');
    this.action = 1;

    this.getData('getData.php', this.request);
    this.events();

    // Кнопки на заметках 
    document.addEventListener('click', event => {
      console.log(event.target);
      if (event.target.classList.contains('fa-ellipsis-v')){
        this.openMoreInfo(event);
      } else {
        this.closeMoreInfo();
      }
      
      if(event.target.classList.contains('deleteBtn')){
        this.remove(event, 'deleteData.php', this.request);
      }else if(event.target.parentElement.classList.contains('note') || event.target.parentElement.classList.contains('content')){ //event.target.classList.contains('editBtn')
        this.showUpdateNoteForm(event);
      } else if(event.target.classList.contains('add-notes-bg')) {
        this.closeUpdateNoteForm();
      }


      if(event.target.id == 'completeBtn') {
        this.noteComplete(event);
      }
    })
  }

  events() {
    this.submitBtn.addEventListener('click',() => this.insertData('insertData.php', this.request));
    this.closeAddNoteButton.addEventListener('click', () => {
      this.title.value = '';
      this.description.value = '';
    });
  }

  // MASONRY FUNCTIONS
  resizeGridItem(item){
    let grid = document.getElementsByClassName("list-notes")[0];
    let rowHeight = parseInt(window.getComputedStyle(grid).getPropertyValue('grid-auto-rows'));
    let rowGap = parseInt(window.getComputedStyle(grid).getPropertyValue('grid-row-gap'));
    let rowSpan = Math.ceil((item.querySelector('.content').getBoundingClientRect().height+rowGap)/(rowHeight+rowGap));
    item.style.gridRowEnd = "span "+rowSpan;
  }
  
  resizeAllGridItems(){
    let allItems = document.getElementsByClassName("note");
    for(let x = 0; x < allItems.length; x++){
      this.resizeGridItem(allItems[x]);
    }
  }
  
  resizeInstance(instance){
    let item = instance.elements[0];
    this.resizeGridItem(item);
  }
        
  getData(url, request, inserted) {
    let isInserted = inserted;
    
    request.onreadystatechange = () => {
      if(request.readyState == 4 && request.status == 200) {

        this.mockData = JSON.parse(request.responseText);

        console.log(this.mockData);

        if(this.mockData.length > 0) {
          if (isInserted == 'Successfully Inserted') { // Прорисовка заметок при добавлении заметки
            if (document.querySelector('section.notes').querySelector('.blank') !== null){
              document.querySelector('section.notes').querySelector('.blank').remove();
            }

            let lastNote = this.mockData[this.mockData.length - 1];
            this.createDomElements(lastNote.id, lastNote.done);

            if (lastNote.todoTitle != '') {
              // this.edit.setAttribute('has-title', 'hasTitle');
              this.content.insertBefore(this.noteHeader, this.content.children[0]);
              this.noteHeader.insertAdjacentText('afterbegin', lastNote.todoTitle);
              this.noteDescription.insertAdjacentText('afterbegin', lastNote.todoDescription);
              this.notesContainer.appendChild(this.li);
              isInserted = '';
            } else {
              this.noteDescription.insertAdjacentText('afterbegin', lastNote.todoDescription);
              this.notesContainer.appendChild(this.li);
              isInserted = '';
            }

            if (lastNote.done == 1) {
              this.noteDescription.classList.add('crossed');
              this.li.querySelector('#completeBtn').style.background = 'rgb(240, 243, 245)';
            } else {
              this.noteDescription.classList.remove('crossed');
              this.li.querySelector('#completeBtn').style.background = 'transperent';
            }

            this.allItems = document.getElementsByClassName("note");
            this.resizeAllGridItems();
          } else { // Прорисовка заметок при обновлении страници
            if (document.querySelector('section.notes').querySelector('.blank') !== null){
              document.querySelector('section.notes').querySelector('.blank').remove();
            }
            
            this.mockData.forEach((item) => {
              this.createDomElements(item.id, item.done);

              if (item.todoTitle != '') {
                // this.edit.setAttribute('has-title', 'hasTitle');
                this.content.insertBefore(this.noteHeader, this.content.children[0]);
                this.noteHeader.insertAdjacentText('afterbegin', item.todoTitle);
                this.noteDescription.insertAdjacentText('afterbegin', item.todoDescription);
                this.notesContainer.appendChild(this.li);
              } else {
                this.noteDescription.insertAdjacentText('afterbegin', item.todoDescription);
                this.notesContainer.appendChild(this.li);
              }

              if (item.done == 1) {
                this.noteDescription.classList.add('crossed');
                this.li.querySelector('#completeBtn').style.background = 'rgb(240, 243, 245)';
              } else {
                this.noteDescription.classList.remove('crossed');
                this.li.querySelector('#completeBtn').style.background = 'transperent';
              }
              
            });

            this.resizeAllGridItems();
            window.addEventListener("resize", this.resizeAllGridItems.bind(this));
            
            let allItems = document.getElementsByClassName("note");
            for(let x = 0; x < allItems.length; x++){
              imagesLoaded( allItems[x], this.resizeInstance.bind(this));
            }
            
          } 
        } else { // Если заметок нет
          let blank = document.createElement('div');
          blank.classList.add('blank');
          blank.innerHTML = 'У вас нету заметок...';
          document.querySelector('section.notes').appendChild(blank);
        }              
      }
    }

    request.open('POST', url, true);
    request.send();
  }

  createDomElements(id, done) {
    // Создание DOM елементов
    this.li = document.createElement('li');
    this.content = document.createElement('div')

    this.noteHeader = document.createElement('div');

    this.noteDescription = document.createElement('p');

    this.noteMenu = document.createElement('div');
    this.doneBtnContainer = document.createElement('div');
    this.doneBtn = document.createElement('i');


    this.moreOptionsContainer = document.createElement('div');
    this.moreOptionsBtn = document.createElement('i');
    this.moreOptionsList = document.createElement('ul');

    // this.edit = document.createElement('li');
    this.deleteItem = document.createElement('li');

    // Добавление классов

    this.li.classList.add('note');
    this.content.classList.add('content');
    this.noteHeader.classList.add('note-header');
    this.noteMenu.classList.add('note-menu');
    this.doneBtnContainer.classList.add('done-btn');
    this.doneBtn.classList.add('fas');
    this.doneBtn.classList.add('fa-check');
    this.moreOptionsContainer.classList.add('more-info');
    this.moreOptionsBtn.classList.add('fas');
    this.moreOptionsBtn.classList.add('fa-ellipsis-v');
    // this.edit.classList.add('editBtn');
    this.deleteItem.classList.add('deleteBtn');


    this.deleteItem.setAttribute('data-id', id);
    // this.edit.setAttribute('data-id', id);
    this.doneBtn.setAttribute('data-id', id);
    this.doneBtn.setAttribute('complete', done);
    this.doneBtn.id = "completeBtn";

    // this.edit.innerHTML = 'Изменить';
    this.deleteItem.innerHTML = 'Удалить';

    // Доабвление DOM елементов

    this.li.appendChild(this.content);
    this.content.appendChild(this.noteDescription);
    this.content.appendChild(this.noteMenu);

    this.noteMenu.appendChild(this.doneBtnContainer);
    this.noteMenu.appendChild(this.moreOptionsContainer);
    this.doneBtnContainer.appendChild(this.doneBtn);
    this.moreOptionsContainer.appendChild(this.moreOptionsBtn);
    this.moreOptionsContainer.appendChild(this.moreOptionsList);
    // this.moreOptionsList.appendChild(this.edit);
    this.moreOptionsList.appendChild(this.deleteItem);
  }

  insertData(url, request) {
    let titleData = this.title.value;
    let descriptionData = this.description.value;
    
    let formData = new FormData();
    
    formData.append("titleData", titleData);
    formData.append("descriptionData", descriptionData);

    request.onreadystatechange = () => {
      if (request.readyState == 4) {
        this.getData('getData.php', this.request, JSON.parse(request.responseText));
        this.submitBtn.style.display = "none";
        this.title.value = '';
        this.description.value = '';
      }
    }

    request.open('POST', url, true);
    request.send(formData);

  }

  openMoreInfo(event) {
    let parent = event.target.parentElement;
    console.log(parent);
    parent.querySelector('ul').style.display = 'block';
  }

  closeMoreInfo() {
    document.querySelectorAll('.more-info ul').forEach(e => {
      e.style.display = 'none';
    })
  }

  remove(event, url, request) {
    let targetId = event.target.getAttribute('data-id');
    request.onreadystatechange = () => {
      if(request.readyState == 4) {
        let parentOfTargetId = event.target.closest('.note');
        this.notesContainer.removeChild(parentOfTargetId);
        console.log(JSON.parse(request.responseText));
      }
    }

    let formData = new FormData();
    formData.append("targetId", targetId);
    
    request.open('POST', url, true);
    request.send(formData);
  }

  update(formData, url, request) {
    request.onreadystatechange = () => {
      if (request.readyState == 4) {
        console.log(JSON.parse(request.responseText));
      }
    }

    request.open('POST', url, true);
    request.send(formData);
  }

  showUpdateNoteForm(event) {
    // Закрытие формы при нажатии на клавишу esc
    document.addEventListener('keyup', (e) => {
      if (e.keyCode == 27) {
        this.closeUpdateNoteForm();
      }
    })

    this.updateBtn.style.display = "none";
    this.theEvent = event;
    this.theTargetId = event.target.getAttribute('data-id');
    this.note = this.theEvent.target.closest('.content');
    this.hasHeader = this.note.querySelector('.note-header');
    // let targetId = event.target.getAttribute('data-id');


    
    this.updateNotesForm.style.display = "block";
    this.updateDescription.focus();
    if(event.target.hasAttribute('has-title')) {
      this.oldTitle = event.target.closest('.note').querySelector('.note-header').innerHTML;
      this.oldDescription = event.target.closest('.note').querySelector('p').innerHTML;
      this.newTitle;
      this.newDescription;

      this.updateTitle.value = this.oldTitle;
      this.updateDescription.value = this.oldDescription;

        this.updateNotesForm.addEventListener('keyup', () => {
          console.log(this.updateDescription);
            if (this.updateDescription.value == '') {
              this.updateBtn.style.display = "none";
            }
            if(this.oldTitle != this.updateTitle.value || this.oldDescription != this.updateDescription.value) {
              if(this.oldTitle != this.updateTitle.value) {
                this.newTitle = this.updateTitle.value;
                // console.log(this.newTitle);
              } else if(this.oldDescription != this.updateDescription.value) {
                this.newDescription = this.updateDescription.value;
                // console.log(this.newDescription);
              }
              // console.log(this.updateDescription+"this is from != ''")
              this.updateBtn.style.display = "block";
            } else {
              this.updateBtn.style.display = "none";
            }
  
        });
    } else {
      this.oldDescription = event.target.closest('.note').querySelector('p').innerHTML;
      this.oldTitle = this.updateTitle.value;
      this.newTitle;
      this.newDescription; 
      this.updateDescription.value = this.oldDescription;

        this.updateNotesForm.addEventListener('keyup', () => {
          if(this.oldTitle != this.updateTitle.value || this.oldDescription != this.updateDescription.value) {
            if(this.oldTitle != this.updateTitle.value) {
              this.newTitle = this.updateTitle.value;
              this.newDescription = this.updateDescription.value;
            } else if(this.oldDescription != this.updateDescription.value) {
              this.newTitle = this.updateTitle.value;
              this.newDescription = this.updateDescription.value;
            }
            this.updateBtn.style.display = "block";
          } else {
            this.updateBtn.style.display = "none";
          }
        });
      
    }

    this.updateBtn.onclick = () => {
      let formData = new FormData();
      formData.append("newTitle", this.updateTitle.value);
      formData.append("newDescription", this.updateDescription.value);
      formData.append("id", this.theTargetId);
        
      this.update(formData, 'updateData.php', this.request);

      // Комментарии для дебагинга
      // console.log(this.updateTitle.value+' this is from button with header');
      // console.log(this.updateDescription.value+' this is from button with header');
      // console.log(this.hasHeader);

      if (this.updateTitle.value != '' && this.hasHeader != null) {
        this.note.querySelector('.note-header').innerHTML = this.updateTitle.value;
        this.note.querySelector('p').innerHTML = this.updateDescription.value;
        this.resizeAllGridItems();
      } else if(this.updateTitle.value == '' && this.hasHeader != null){
        this.note.querySelector('.note-header').remove();
        this.note.querySelector('p').innerHTML = this.updateDescription.value;
        this.resizeAllGridItems();
      } else if(this.hasHeader == null && this.updateTitle.value == '') {
        this.note.querySelector('p').innerHTML = this.updateDescription.value;
        this.resizeAllGridItems();
      } else if(this.hasHeader == null && this.updateTitle.value != '') {
        this.noteHeader.innerHTML = this.updateTitle.value;
        this.note.insertBefore(this.noteHeader, this.note.children[0]);
        this.note.querySelector('p').innerHTML = this.updateDescription.value;
        this.resizeAllGridItems();
      }

    }

  }

  noteComplete(event) {
    let id = event.target.getAttribute('data-id');
    let done = event.target.getAttribute('complete');
    const note = event.target.closest('.note');

    if (done == 1) {
      note.querySelector('p').classList.remove('crossed');
      event.target.style.background = 'transperent';
    } else if(done == 0) {
      note.querySelector('p').classList.add('crossed');
      event.target.style.background = 'rgb(240, 243, 245)';
    }

    this.request.onreadystatechange = () => {
      if(this.request.readyState == 4) {
        
        console.log(JSON.parse(this.request.responseText))
      }
    }

    let formData = new FormData();
    formData.append("id", id);
    if(done == 0) {
      event.target.setAttribute('complete', 1);
      formData.append("done", 1);
      this.request.open('POST', 'noteComplete.php', true);
      this.request.send(formData); 
    } else if (done == 1){
      event.target.setAttribute('complete', 0);
      formData.append("done", 0);
      this.request.open('POST', 'noteComplete.php', true);
      this.request.send(formData);
    } 
  }


  closeUpdateNoteForm() {
    this.updateNotesForm.style.display = "none";
    this.updateBtn.style.display = "none";
    // this.addNotesForm.removeEventListener("keyup", this.updateListener.bind(this));
  }
}



const newNotes = new Notes();