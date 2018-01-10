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
        <td><a href="#${id}" onclick="send('${id}')">${name}</a></td>
        <td>${username}</td>
        <td>${email}</td>
      </tr>`;

    }

    var usersPanel = document.getElementById('users');
    var table = document.createElement('table');
    usersPanel.appendChild(table).innerHTML = '<tbody>' + rows + '</tbody>';

}

function send(who){

  var url = 'http://localhost:3000/api/users/view/' + who;

  var xhr = new XMLHttpRequest();
  xhr.open('GET', url);
  xhr.send();

  xhr.onload = function(){

    var userPanel = document.getElementById('userPanel');


      let data = JSON.parse(xhr.response);

      userPanel.innerHTML = `<h2>${data.user[0].last_name}, ${data.user[0].first_name}</h2>
        <div><strong>ID: </strong>${data.user[0]._id}</div>
        <div><strong>First Name: </strong>${data.user[0].first_name}</div>
        <div><strong>Last Name: </strong>${data.user[0].last_name}</div>
        <div><strong>Username: </strong>${data.user[0].username}</div>
        <div><strong>email: </strong>${data.user[0].email}</div>`;
  }

}
