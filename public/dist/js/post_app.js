function viewIndex(){
  var url = 'https://jasonsnider.com
/api/posts';

  var xhr = new XMLHttpRequest();
  xhr.open('GET', url);
  xhr.send();

  xhr.onload = function(){

      let data = JSON.parse(xhr.response);
      var rows = '';

      for(var i=0; i<data['posts'].length; i++){

        let thisn = data['posts'][i];
        let id=thisn._id;
        let slug=thisn.slug;
        let title=thisn.title;
        let body=thisn.body;
        let keywords=thisn.keywords;
        let description=thisn.description;
        let published=thisn.published;

        rows = rows + `<tr>
          <td><a href="#edit-${slug}" onclick="viewPost('${slug}')">${title}</a></td>
          <td>${published}</td>
        </tr>`;

      }

      var app = document.getElementById('app');
      app.innerHTML = `<table class=users"table">
        <thead>
          <tr>
            <th>Title</th>
            <th>Pub Date</th>
          </tr>
        </thead>
        <tbody>${rows}</tbody>
      </table>`;
  }
}


function viewPost(postId){

  var url = 'https://jasonsnider.com
/api/posts/view/' + postId;

  var xhr = new XMLHttpRequest();
  xhr.open('GET', url);
  xhr.send();

  xhr.onload = function(){

    var app = document.getElementById('app');

    let data = JSON.parse(xhr.response);

    app.innerHTML = `<h2>${data.post[0].title}</h2>
      <h3>Body</h3>
      <div>${data.post[0].body}</div>
      <h3>Description</h3>
      <div>${data.post[0].description}</div>
      <h3>Keywords</h3>
      <div>${data.post[0].keywords}</div>
      <h3>Pub Date</h3>
      <div>${data.post[0].published}</div>

      <h3>Edit the Post</h3>
      <form id="editPost" action="/posts/edit" method="post">
        <input type="hidden" name="_id" value="${data.post[0]._id}">
        <div>
          <label for="title">Title</label>
          <input type="text" value="${data.post[0].title}" name="title" id="title">
        </div>

        <div>
          <label for="body">Body</label>
          <textarea name="body" id="body">${data.post[0].body}</textarea>
        </div>

        <div>
          <label for="keywords">Keywords</label>
          <textarea name="keywords" id="keywords">${data.post[0].keywords}</textarea>
        </div>

        <div>
          <label for="description">Description</label>
          <textarea name="description" id="description">${data.post[0].description}</textarea>
        </div>

        <div>
          <label for="published">Pub Date</label>
          <input type="text" value="${data.post[0].published}" name="published" id="published">
        </div>
        <input type="submit" value="Submit">
      </form>

      <div class="delete">
        <a href="#delete" onclick="deletePost('${data.post[0]._id}');">Delete</a>
      </div>
    `;

    var editPost = document.getElementById('editPost');

    editPost.addEventListener('submit', function(e){
      e.preventDefault();

      formData = new FormData(editPost);
      var url = 'https://jasonsnider.com
/api/posts/edit';

      var xhr = new XMLHttpRequest();
      xhr.open('POST', url);

      //Be sure to add a ajson headevalue="${data.post[0].published}" r to form, otherwise body parser will freak out
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

function createPost(){

  var app = document.getElementById('app');

  app.innerHTML = `<h2>Create a New Post</h2>
    <form id="createPost" action="/api/posts/create" method="post">
      <div>
        <label for="title">Title</label>
        <input type="text" name="title" id="title">
      </div>
      <div>
        <label for="body">Body</label>
        <textarea name="body" id="body"></textarea>
      </div>
      <div>
        <label for="keywords">Keywords</label>
        <textarea name="keywords" id="keywords"></textarea>
      </div>
      <div>
        <label for="description">Description</label>
        <textarea name="description" id="description"></textarea>
      </div>
      <div>
        <label for="published">Pub Date</label>
        <input type="text" name="published" id="published">
      </div>
      <input type="submit" value="Submit">
    </form>`;

  var createPost = document.getElementById('createPost');
  createPost.addEventListener('submit', function(e){
    e.preventDefault();

    formData = new FormData(createPost);
    var url = 'https://jasonsnider.com
/api/posts/create';

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

function deletePost(postId){

  if (window.confirm("Are you sure you want to delete this post?")) {

    var url = 'https://jasonsnider.com
/api/posts/delete/' + postId;

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
//If the inital page load has a hash, look up that post
var hash = window.location.hash.substr(1);
if(hash){

  let chunks = hash.split('-');

  if(chunks[0]=='edit'){
    viewPost(chunks[1]);
  }

  //if(chunks[0]=='create'){
  //  createPost();
  //}

}
