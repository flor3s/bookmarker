// listen for form submit
document.getElementById('myForm').addEventListener('submit', saveBookmark);

function saveBookmark(e){
  // prevent default form behavior - in this case, submitting to new page
  e.preventDefault();

  var siteName = document.getElementById('siteName').value;
  var siteUrl = document.getElementById('siteUrl').value;

  if(!validateForm(siteName, siteUrl)){
    return false;
  }

  var bookmark = {
    name: siteName,
    url: siteUrl
  }

  if(localStorage.getItem('bookmarks') === null){
    var bookmarks = [];
    bookmarks.push(bookmark);
    // set to localStorage
    setBookmarks(bookmarks);
  } else {
    var bookmarks = getBookmarks();
    bookmarks.push(bookmark);
    // re-set to localStorage
    setBookmarks(bookmarks);
  }

  // reset form
  document.getElementById('myForm').reset();

  // re-fetch bookmarks
  fetchBookmarks();
}

// delete bookmarks
function deleteBookmark(url){
  var bookmarks = getBookmarks();
  for(var i = 0; i < bookmarks.length; i++){
    if(bookmarks[i].url == url){
      bookmarks.splice(i, 1);
    }
  }

  setBookmarks(bookmarks);
  fetchBookmarks();
}


// fetch bookmarks
function fetchBookmarks(){
  var bookmarks = getBookmarks();

  // get bookmarksResults div element
  var bookmarksResults = document.getElementById('bookmarksResults');

  // start building output
  bookmarksResults.innerHTML = '';
  for(var i = 0; i < bookmarks.length; i++){
    var name = bookmarks[i].name;
    var url = bookmarks[i].url;

    bookmarksResults.innerHTML += '<div class="media text-muted pt-3">'+
                                  '<div class="media-body pb-3 mb-0 small lh-125 border-bottom border-gray">'+
                                  '<h5 class="d-flex justify-content-between align-items-center w-100">'+name+
                                  '<a class="btn btn-default" target="_blank" href="'+url+'">'+url+' '+
                                  '<i class="fas fa-external-link-alt"></i>'+'</a>'+
                                  '<a onclick="deleteBookmark(\''+url+'\')" class="btn btn-danger" href="#">Delete</a>'+
                                  '</h5>'+
                                  '</div>'+
                                  '</div>'

  }
}

function setBookmarks(bookmarks){
  localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
}

function getBookmarks(){
  return JSON.parse(localStorage.getItem('bookmarks'))
}

function validateForm(siteName, siteUrl){
  if(!siteName || !siteUrl){
    alert('Please fill in the form');
    return false;
  }

  var expression = /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi;
  var regex = new RegExp(expression);

  if(!siteUrl.match(regex)){
    alert('Please use a valid URL');
    return false;
  }

  return true;
}