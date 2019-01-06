// listen for form submit
document.getElementById('myForm').addEventListener('submit', saveBookmark);

function saveBookmark(e){
  // prevent default form behavior - in this case, submitting to new page
  e.preventDefault();

  var siteName = document.getElementById('siteName').value;
  var siteUrl = document.getElementById('siteUrl').value;

  var bookmark = {
    name: siteName,
    url: siteUrl
  }

  if(localStorage.getItem('bookmarks') === null){
    var bookmarks = [];
    bookmarks.push(bookmark);
    // set to localStorage
    localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
  } else {
    var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
    bookmarks.push(bookmark);
    // re-set to localStorage
    localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
  }

  fetchBookmarks();


  console.log(bookmark);
}

// delete bookmarks
function deleteBookmark(url){
  var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
  for(var i = 0; i < bookmarks.length; i++){
    if(bookmarks[i].url == url){
      bookmarks.splice(i, 1);
    }
  }

  localStorage.setItem('bookmarks', JSON.stringify(bookmarks));

  fetchBookmarks();

}


// fetch bookmarks
function fetchBookmarks(){
  var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
  console.log(bookmarks);

  // get bookmarksResults div element
  var bookmarksResults = document.getElementById('bookmarksResults');

  // start building output
  bookmarksResults.innerHTML = '';
  for(var i = 0; i < bookmarks.length; i++){
    var name = bookmarks[i].name;
    var url = bookmarks[i].url;

    bookmarksResults.innerHTML += '<div class="media text-muted pt-3">'+
                                  '<div class="media-body pb-3 mb-0 small lh-125 border-bottom border-gray">'+
                                  '<div class="d-flex justify-content-between align-items-center w-100">'+
                                  '<a class="btn btn-default" target="_blank" href="'+url+'">'+name+' '+
                                  '<i class="fas fa-external-link-alt"></i>'+'</a>'+
                                  '<a onclick="deleteBookmark(\''+url+'\')" class="btn btn-danger" href="#">Delete</a>'+
                                  '</div>'+
                                  '</div>'+
                                  '</div>'

  }
}