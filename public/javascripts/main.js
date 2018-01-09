var url = 'http://localhost:3000/api/users';

var xhr = new XMLHttpRequest();
xhr.open('GET', url);
xhr.send();

xhr.onload = function(){
    let data = JSON.parse(xhr.response);

    var rows = '';
    for(user in data){
      let a=data[user]._id;
      let b=data[user].name;
      let c=data[user].email;
      rows = rows + `<tr><td><a href="#${user}" onclick="send('${user}');">${a}</a></td><td>${b}</td><td>${c}</td></tr>`;
    }

    var h1 = document.getElementById('title');
    var table = document.createElement('table');
    h1.appendChild(table).innerHTML = rows;

}

function send(who){
user
  var url = 'http://localhost:3000/api/users/view/' + who;

  var xhr = new XMLHttpRequest();
  xhr.open('GET', url);
  xhr.send();

  xhr.onload = function(){

      let data = JSON.parse(xhr.response);

      document.getElementById('id').innerHTML = data._id;
      document.getElementById('name').innerHTML = data.name;
      document.getElementById('email').innerHTML = data.email;
  }

}
