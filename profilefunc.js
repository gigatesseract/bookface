var i;
function fetchBookshelf(){

 var bookshelf = document.getElementById('bookshelf');
 while(bookshelf.firstChild){
   bookshelf.removeChild(bookshelf.firstChild);
 }
  var xml = new XMLHttpRequest();
  xml.open("GET", "fetchbookshelf.php");
  xml.send();
  xml.onreadystatechange = function(){
  if(this.status==200 && this.readyState == 4)
  {
  var array = this.responseText.split(',');

  for(i=0;i<array.length;i++)
  {
  var url = "https://www.googleapis.com/books/v1/volumes/" + array[i];

    var xhttp = new XMLHttpRequest();
    xhttp.open("GET", url);
    xhttp.send();
    xhttp.onreadystatechange = function(){
      if(this.status==200 && this.readyState == 4){
        var response = JSON.parse(this.responseText);

    printBookDetails(response, bookshelf);
      }
    }
  }
}
}
}
var j;

function fetchFavorites(){
  var bookshelf = document.getElementById('favorites');
  while(bookshelf.firstChild){
    bookshelf.removeChild(bookshelf.firstChild);
  }
   var xml = new XMLHttpRequest();
   xml.open("GET", "fetchfavorites.php");
   xml.send();
   xml.onreadystatechange = function(){
   if(this.status==200 && this.readyState == 4)
   {
   var array = this.responseText.split(',');

   for(i=0;i<array.length;i++)
   {
   var url = "https://www.googleapis.com/books/v1/volumes/" + array[i];

     var xhttp = new XMLHttpRequest();
     xhttp.open("GET", url);
     xhttp.send();
     xhttp.onreadystatechange = function(){
       if(this.status==200 && this.readyState == 4){
         var response = JSON.parse(this.responseText);

     printBookDetails(response, bookshelf);
       }
     }
   }
 }
 }
 }


function printBookDetails(response, id){

    var bookdetails = document.createElement('div');
    bookdetails.className = "bookdetails";
    var title = document.createElement('p');
    title.innerHTML = response.volumeInfo.title;
    var thumbnail = document.createElement('img');
    var isbn = document.createElement('p');


    isbn.innerHTML = response.id;
        isbn.display = "none";
    bookdetails.appendChild(isbn);
    thumbnail.src = response.volumeInfo.imageLinks.thumbnail;
    thumbnail.alt = "the image is loading";
    bookdetails.appendChild(title);
    bookdetails.appendChild(thumbnail);
    // addButton(bookdetails);
    // favoriteButton(bookdetails);
    // readstatus(bookdetails);
    id.appendChild(bookdetails);


}

function fetchCurrentlyReading(){
  var bookshelf = document.getElementById('reading');
  while(bookshelf.firstChild){
    bookshelf.removeChild(bookshelf.firstChild);
  }
   var xml = new XMLHttpRequest();
   xml.open("GET", "fetchreading.php");
   xml.send();
   xml.onreadystatechange = function(){
   if(this.status==200 && this.readyState == 4)
   {
   var array = this.responseText.split(',');

   for(i=0;i<array.length;i++)
   {
   var url = "https://www.googleapis.com/books/v1/volumes/" + array[i];

     var xhttp = new XMLHttpRequest();
     xhttp.open("GET", url);
     xhttp.send();
     xhttp.onreadystatechange = function(){
       if(this.status==200 && this.readyState == 4){
         var response = JSON.parse(this.responseText);

     printBookDetails(response, bookshelf);
       }
     }
   }
 }
 }

}
function fetchActivity(){
  var xml = new XMLHttpRequest();
  xml.open("GET", "fetchactivity.php");
  xml.send();
  xml.onreadystatechange = function(){

    if(this.status==200 && this.readyState == 4){
    var intermediate = this.responseText.split('.');
    var idarray = intermediate[0].split(',');
    var descriarray = intermediate[1].split(',');
  fetchTitleAuthor(idarray, descriarray);
    }

  }

}
activity = document.getElementById('activity');
function fetchTitleAuthor(idarray, descriarray){
  console.log(idarray);
  while(activity.firstChild){
    activity.removeChild(activity.firstChild);
  }

var url;
var xhttp = [];
for(i=0;i<idarray.length;i++)
{
  console.log(descriarray[i]);
  url = "https://www.googleapis.com/books/v1/volumes/" + idarray[i];
  xhttp[i] = new XMLHttpRequest();
  xhttp[i].open("GET", url);
  xhttp[i].send();
  xhttp[i].onreadystatechange = function(){

       if(this.status==200 && this.readyState == 4){
          var response = JSON.parse(this.responseText);
          var titleauthor = document.createElement('p');
          var titleandby = response.volumeInfo.title + " by " + response.volumeInfo.authors+ " ";


          if(descriarray[i]=='favorite')
          {
            titleauthor.innerHTML = "Marked "+ titleandby + "as favorite";
          }
          else if(descriarray[i]=="bookshelf")
          {
            titleauthor.innerHTML = "Added "+ titleandby + "to bookshelf";
          }
          else if(descriarray[i]=="Currently Reading")
          {
            titleauthor.innerHTML = "Is currently reading "+ titleandby;
          }
activity.appendChild(titleauthor);

       }

  }

}



}
window.addEventListener('load', fetchBookshelf);
window.addEventListener('load', fetchFavorites);
window.addEventListener('load', fetchCurrentlyReading)
window.addEventListener('load', fetchActivity);
