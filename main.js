document.getElementById('myform').addEventListener('submit', Save);
//document.addEventListener('onload', fetchBookmarks);

function Save(e){
  var siteName =document.getElementById('sitename').value;
  var siteurl =document.getElementById('siteurl').value;

  if(!validation(siteName, siteurl)){
    return false;
  }

  var bookmark = {
    name: siteName,
    url: siteurl
  }

  if(localStorage.getItem('bookmarks') === null){
    var bookmarks = [];

    bookmarks.push(bookmark);

    localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
  } else {
           var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));

    bookmarks.push(bookmark);

    localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
  }

  document.getElementById('myform').reset();

  fetchBookmarks();

  e.preventDefault();
}

function deleteBookmark(url){

  var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));

  for(var i =0;i < bookmarks.length;i++){
    if(bookmarks[i].url == url){

      bookmarks.splice(i, 1);
    }
  }

  localStorage.setItem('bookmarks', JSON.stringify(bookmarks));

  fetchBookmarks();
}

function fetchBookmarks(){
  var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));

  var saved = document.getElementById('saved');

  saved.innerHTML = '';
  for(var i=0;i<bookmarks.length;i++){
    var name = bookmarks[i].name;
    var url = bookmarks[i].url;

    saved.innerHTML += '<div class="well">'+
                                  '<h3>'+name+ '</h3>' +
                                  ' <p> <a class="btn-sm btn-success" target="_blank" href="'+url+'">Visit</a> ' +
                                  ' <a onclick="deleteBookmark(\''+url+'\')" class="btn-sm btn-danger" href="#">Delete</a> <p>' +
                                  '</div>';
  }
}

function validation(sitename, siteurl){
  if(!sitename || !siteurl){
    alert('Please fill in the form');
    return false;
     }

    if(localStorage.getItem('bookmarks') !== null){
    var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));

    for(var i=0;i<bookmarks.length;i++){
          if(sitename == bookmarks[i].name){
               alert('This Site name already exits');
               return false;
          }
     }
     }


  var expression = /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi;
  var regex = new RegExp(expression);

  if(!siteurl.match(regex)){
    alert('Please use a valid URL');
    return false;
  }

  return true;
}
