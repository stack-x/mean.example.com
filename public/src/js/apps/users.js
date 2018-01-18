function viewIndex(){
  var url = 'http://localhost:3000/api/users';

  var xhr = new XMLHttpRequest();
  xhr.open('GET', url);
  xhr.send();

  xhr.onload = function(){

      let data = JSON.parse(xhr.response);

      var rows = '';

      for(var i=0; i<data['users'].length; i++){

        let thisn = data['users'][i];
        let id=thisn._id;
        let name=thisn.last_name + ', ' + thisn.first_name;
        let username=thisn.username;
        let email=thisn.email;

        rows = rows + `<tr>
          <td class="mdl-data-table__cell--non-numeric"><a href="#edit-${id}" onclick="viewUser('${id}')">${name}</a></td>
          <td class="mdl-data-table__cell--non-numeric">${username}</td>
          <td class="mdl-data-table__cell--non-numeric">${email}</td>
        </tr>`;
      }

      var app = document.getElementById('app');
      app.innerHTML = `
        <div class="content">

        <div class="mdl-card mdl-shadow--2dp full-width">
          <div class="mdl-card__supporting-text">
            <div class="user-card mdl-card__title">
              <div class="mdl-card__title-text">Users</div>
            </div>
          </div>
          <table class="mdl-data-table mdl-js-data-table full-width">
            <thead>
              <tr>
                <th class="mdl-data-table__cell--non-numeric">Name</th>
                <th class="mdl-data-table__cell--non-numeric">Username</th>
                <th class="mdl-data-table__cell--non-numeric">Email</th>
              </tr>
            </thead>
            <tbody>${rows}</tbody>
          </table>
        </div>
      `;
  }
}


function viewUser(who){

  var url = 'http://localhost:3000/api/users/view/' + who;

  var xhr = new XMLHttpRequest();
  xhr.open('GET', url);
  xhr.send();

  xhr.onload = function(){

    var app = document.getElementById('app');

    let data = JSON.parse(xhr.response);

    app.innerHTML = `
      <div class="content">

        <div class="mdl-card mdl-shadow--2dp full-width">

          <div class="mdl-card__menu">
            <button id="menu-actions" class="mdl-button mdl-js-button mdl-button--icon">
              <!--<i class="material-icons">more_vert</i>-->
              <i class="fas fa-ellipsis-h material-icons" role="presentation" data-fa-transform="rotate-90"></i>
            </button>
            <ul class="mdl-menu mdl-menu--bottom-right mdl-js-menu mdl-js-ripple-effect" for="menu-actions">
              <li class="mdl-menu__item">
                <a href="#delete" onclick="deleteUser('${data.user[0]._id}');">Delete</a>
              </li>
            </ul>
          </div>

          <div class="mdl-card__supporting-text flex-box">
            <div class="flex-item-avatar">
              <img class="avatar" src="https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50?s=128&f=y">
            </div>
            <div class="flex-item-grow">
              <div class="user-card mdl-card__title">
                <div class="mdl-card__title-text">${data.user[0].first_name} ${data.user[0].last_name}</div>
              </div>
              <div>${data.user[0].username}</div>
              <div>${data.user[0].email}</div>
            </div>
          </div>
        </div>

        <div class="mdl-card mdl-shadow--2dp full-width">
          <div class="mdl-card__supporting-text">
            <div class="user-card mdl-card__title">
              <div class="mdl-card__title-text">Edit</div>
            </div>

            <form id="editUser" action="/api/users/edit" method="post">
              <input value="${data.user[0].first_name}" type="hidden" name="id" value="${data.user[0].id}">
              <div class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label is-dirty">
                <input class="mdl-textfield__input" value="${data.user[0].first_name}" type="text" name="first_name" id="first_name">
                <label class="mdl-textfield__label" for="first_name">First Name</label>
              </div>

              <div class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label is-dirty">
                <input class="mdl-textfield__input" value="${data.user[0].last_name}" type="text" name="last_name" id="last_name">
                <label class="mdl-textfield__label" for="last_name">Last Name</label>
              </div>

              <div class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label is-dirty">
                <input class="mdl-textfield__input" value="${data.user[0].username}" type="text" name="username" id="username">
                <label class="mdl-textfield__label" for="username">Username</label>
              </div>

              <div class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label is-dirty">
                <input class="mdl-textfield__input" value="${data.user[0].email}" type="text" name="email" id="email">
                <label class="mdl-textfield__label" for="email">Email</label>
              </div>

              <div>
                <input type="submit" class="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button--accent">
              </div>
            </form>
          </div>
        </div>

      </div>

    </div>
    `;

    var editUser = document.getElementById('editUser');

    editUser.addEventListener('submit', function(e){
      e.preventDefault();

      formData = new FormData(editUser);
      var url = 'http://localhost:3000/api/users/edit';

      var xhr = new XMLHttpRequest();
      xhr.open('POST', url);

      //Be sure to add a ajson header to form, otherwise body parser will freak out
      xhr.setRequestHeader('Content-Type', 'application/json; charset=UTF-8');
      //console.log(data);
      //Convert formData to JSON
      var object = {};
      formData.forEach(function(value, key){
          object[key] = value;
      });

      xhr.send(JSON.stringify(object));

      xhr.onload = function(){
        let data = JSON.parse(xhr.response);

        if(data.success == true){
          viewIndex();
        }
      }
    });
  }

}

function createUser(){

  var app = document.getElementById('app');

  app.innerHTML = `
    <div class="content">
    <div class="mdl-card mdl-shadow--2dp full-width">
      <div class="mdl-card__supporting-text">
      <div class="user-card mdl-card__title">
        <div class="mdl-card__title-text">Create a New User</div>
      </div>

        <form id="createUser" action="/users/create" method="post">

          <div class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label is-dirty">
            <input class="mdl-textfield__input" type="text" id="first_name">
            <label class="mdl-textfield__label" for="first_name">First Name</label>
          </div>

          <div class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label is-dirty">
            <input class="mdl-textfield__input"  type="text" name="last_name" id="last_name">
            <label class="mdl-textfield__label" for="last_name">Last Name</label>
          </div>

          <div class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label is-dirty">
            <input class="mdl-textfield__input" type="text" name="username" id="username">
            <label class="mdl-textfield__label" for="username">Username</label>
          </div>

          <div class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label is-dirty">
            <input class="mdl-textfield__input" type="text" name="email" id="email">
            <label class="mdl-textfield__label" for="email">Email</label>
          </div>

          <div>
            <input type="submit" class="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button--accent">
          </div>

        </form>
      </div>
    </div>
  `;

  var createUser = document.getElementById('createUser');
  createUser.addEventListener('submit', function(e){
    e.preventDefault();

    formData = new FormData(createUser);
    var url = 'http://localhost:3000/api/users/create';

    var xhr = new XMLHttpRequest();
    xhr.open('POST', url);

    //Be sure to add a ajson header to form, otherwise body parser will freak out
    xhr.setRequestHeader('Content-Type', 'application/json; charset=UTF-8');

    //Convert formData to JSON
    var object = {};
    formData.forEach(function(value, key){
        object[key] = value;
    });

    xhr.send(JSON.stringify(object));
    xhr.onload = function(){
      let data = JSON.parse(xhr.response);

      if(data.success == true){
        viewIndex();
      }
    }
  });
}

function deleteUser(userId){

  if (window.confirm("Are you sure you want to delete this user?")) {

    var url = 'http://localhost:3000/api/users/delete/' + userId;

    var xhr = new XMLHttpRequest();
    xhr.open('GET', url);
    xhr.send();

    xhr.onload = function(){
    let data = JSON.parse(xhr.response);

      if(data.success == true){
        viewIndex();
      }
    }

  }
}

//Onload view index
viewIndex();
//If the inital page load has a hash, look up that user
var hash = window.location.hash.substr(1);
if(hash){

  let chunks = hash.split('-');

  if(chunks[0]=='edit'){
    viewUser(chunks[1]);
  }

  //if(chunks[0]=='create'){
  //  createUser();
  //}

}
