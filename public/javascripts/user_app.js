
var createUser = document.getElementById('createUser');

createUser.addEventListener('submit',function(e){
  e.preventDefault();

  formData = new FormData(createUser);
  var url = 'http://localhost:3000/api/users/create';

  var xhr = new XMLHttpRequest();
  xhr.open('POST', url);
  xhr.send(formData);

});
