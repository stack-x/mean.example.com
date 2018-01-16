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
          <td><a href="#edit-${id}" onclick="viewUser('${id}')">${name}</a></td>
          <td>${username}</td>
          <td>${email}</td>
        </tr>`;
      }

      var app = document.getElementById('app');
      app.innerHTML = `<table class="table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Username</th>
            <th>Email</th>
          </tr>
        </thead>
        <tbody>${rows}</tbody>
      </table>`;
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

    app.innerHTML = `<h2>${data.user[0].last_name}, ${data.user[0].first_name}</h2>
      <table class="table">
        <tbody>
          <tr><th>ID </th><td>${data.user[0]._id}</td></tr>
          <tr><th>First Name </th><td>${data.user[0].first_name}</td></tr>
          <tr><th>Last Name </th><td>${data.user[0].last_name}</td></tr>
          <tr><th>Username </th><td>${data.user[0].username}</td></tr>
          <tr><th>Email </th><td>${data.user[0].email}</td></tr>
        </tbody>
      </table>

      <h3>Edit the User Record</h3>
      <form id="editUser" action="/users/edit" method="post">
        <input type="hidden" name="_id" value="${data.user[0]._id}">
        <div>
          <label for="username">Username</label>
          <input type="text" value="${data.user[0].username}" name="username" id="username">
        </div>

        <div>
          <label for="email">Email</label>
          <input type="text" value="${data.user[0].email}" name="email" id="email">
        </div>

        <div>
          <label for="first_name">First Name</label>
          <input type="text" value="${data.user[0].first_name}" name="first_name" id="first_name">
        </div>

        <div>
          <label for="last_name">Last Name</label>
          <input type="text" value="${data.user[0].last_name}" name="last_name" id="last_name">
        </div>
        <input type="submit" value="Submit">
      </form>

      <div class="delete">
        <a href="#delete" onclick="deleteUser('${data.user[0]._id}');">Delete</a>
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
      console.log(data);
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

  app.innerHTML = `<h2>Create a New User</h2>
    <form id="createUser" action="/api/users/create" method="post">
      <div>
        <label for="username">Username</label>
        <input type="text" name="username" id="username">
      </div>

      <div>
        <label for="email">Email</label>
        <input type="text" name="email" id="email">
      </div>

      <div>
        <label for="first_name">First Name</label>
        <input type="text" name="first_name" id="first_name">
      </div>

      <div>
        <label for="last_name">Last Name</label>
        <input type="text" name="last_name" id="last_name">
      </div>
      <input type="submit" value="Submit">
    </form>`;

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
