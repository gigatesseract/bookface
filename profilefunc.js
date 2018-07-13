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
  var req = array.join('+OR+id:');
 
  var url = "https://www.googleapis.com/books/v1/volumes?key=AIzaSyBvlo4zgSbusa3eqpM63-ScSAFlaq5jpuI&q=id:"+req;

  
  //var url = "https://www.googleapis.com/books/v1/volumes/" + array[i] + "&key=AIzaSyBvlo4zgSbusa3eqpM63-ScSAFlaq5jpuI&country=IN";
// var url = "/JSON-booksids/"+array[i]+".txt";
    var xhttp = new XMLHttpRequest();
    xhttp.open("GET", url);
    xhttp.send();
    xhttp.onreadystatechange = function(){
      if(this.status==200 && this.readyState == 4){
        var response = JSON.parse(this.responseText);

var total = response.totalItems>10?10:response.totalItems;
for(i=0;i<total;i++)
  for(id of array)
    if(id==response.items[i].id)
    printBookDetails(response.items[i], bookshelf);
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

  var req = array.join('+OR+id:');

  var url = "https://www.googleapis.com/books/v1/volumes?key=AIzaSyBvlo4zgSbusa3eqpM63-ScSAFlaq5jpuI&q=id:"+req;
   //var url = "https://www.googleapis.com/books/v1/volumes/" + array[i] + "&key=AIzaSyBvlo4zgSbusa3eqpM63-ScSAFlaq5jpuI&country=IN;"
// var url = "/JSON-booksids/"+array[i]+".txt";
     var xhttp = new XMLHttpRequest();
     xhttp.open("GET", url);
     xhttp.send();
     xhttp.onreadystatechange = function(){
       if(this.status==200 && this.readyState == 4){
         var response = JSON.parse(this.responseText);

var total = response.totalItems>10?10:response.totalItems;
for(i=0;i<total;i++)
  for(id of array)
    if(id==response.items[i].id)
    printBookDetails(response.items[i], bookshelf);
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
    addButton(bookdetails);
    favoriteButton(bookdetails);
    readstatus(bookdetails);
    id.appendChild(bookdetails);


}
function addButton(id) {
  var add = document.createElement('input');
  add.type = "button";
  add.value = "Add to bookshelf";

  add.name = id.children[0].innerHTML;
  id.children[0].style.display = "hidden";
  add.className = "addbutton";
  add.onclick = function(){
 var xml = new XMLHttpRequest();
 xml.open("GET","addtobookshelf.php?id="+add.name);
 xml.send();
 xml.onreadystatechange = function(){
   if(this.readyState == 4 && this.status == 200){
     console.log("added successfully");
   }
 }


  }
  id.appendChild(add);
}

function favoriteButton(id){
  var fav = document.createElement('input');
  fav.type = "button";
  fav.value = "Mark as favorite";

  fav.name = id.children[0].innerHTML;
  id.children[0].style.display = "hidden";
  fav.className = "addbutton";
  fav.onclick = function(){
 var xml = new XMLHttpRequest();
 xml.open("GET","addasfav.php?id="+fav.name);
 xml.send();
 xml.onreadystatechange = function(){
   if(this.readyState == 4 && this.status == 200){
     console.log("added successfully");
   }
 }


  }
  id.appendChild(fav);
}
var j;
function readstatus(id){
  var status = document.createElement('select');
  var opt = ['Want to read', 'Currently Reading', 'Finished Reading'];
  for(j=0;j<3;j++){
  var op1 = document.createElement('option');
  op1.value = opt[j];
  op1.text = opt[j];
  status.appendChild(op1);
}

var stat = document.createElement('input');
stat.type = "button";
stat.value = "Set status";

status.name = id.children[0].innerHTML;
id.children[0].style.display = "hidden";
status.className = "status";
stat.onclick = function(){
var xml = new XMLHttpRequest();
xml.open("GET","setstatus.php?id="+status.name+"&value="+status.value);
xml.send();
xml.onreadystatechange = function(){
 if(this.readyState == 4 && this.status == 200){
   console.log("Status set successfully");
 }
}


}
id.appendChild(status);
id.appendChild(stat);

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

  var req = array.join('+OR+id:');


  var url = "https://www.googleapis.com/books/v1/volumes?key=AIzaSyBvlo4zgSbusa3eqpM63-ScSAFlaq5jpuI&q=id:"+req;
   //var url = "https://www.googleapis.com/books/v1/volumes/" + array[i];//+ "&key=AIzaSyBvlo4zgSbusa3eqpM63-ScSAFlaq5jpuI&country=IN;"
// var url = "/JSON-booksids/"+array[i]+".txt";
     var xhttp = new XMLHttpRequest();
   
     xhttp.open("GET", url);
     xhttp.send();
     xhttp.onreadystatechange = function(){
       if(this.status==200 && this.readyState == 4){
         var response = JSON.parse(this.responseText);

var total = response.totalItems>10?10:response.totalItems;
for(i=0;i<total;i++)
  for(id of array)
    if(id==response.items[i].id)
    printBookDetails(response.items[i], bookshelf);
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
  //var req = idarray.join("OR+id:");
  //var url = "https://www.googleapis.com/books/v1/volumes?key=AIzaSyBvlo4zgSbusa3eqpM63-ScSAFlaq5jpuI&q=id:"+req;

  while(activity.firstChild){
    activity.removeChild(activity.firstChild);
  }
var req = idarray.join('+OR+id:');
console.log(idarray);
console.log(descriarray);
var url = "https://www.googleapis.com/books/v1/volumes?key=AIzaSyBvlo4zgSbusa3eqpM63-ScSAFlaq5jpuI&q=id:"+req;
i=0;
console.log(url);
var xhttp;


  //url = "https://www.googleapis.com/books/v1/volumes/" + idarray[i] + "&key=AIzaSyBvlo4zgSbusa3eqpM63-ScSAFlaq5jpuI&country=IN;";
  // url = "/JSON-booksids/"+idarray[i]+".txt";
  xhttp = new XMLHttpRequest();
  xhttp.open("GET", url);
  xhttp.send();
  xhttp.onreadystatechange = function(){
       if(this.status==200 && this.readyState == 4){
          var response = JSON.parse(this.responseText);

var total = response.totalItems>10?10:response.totalItems;

for(i=0;i<total;i++){
  for(j=0;j<idarray.length;j++){
    if(idarray[j]==response.items[i].id)
    {
      var titleandby = response.items[i].volumeInfo.title + " by " + response.items[i].volumeInfo.authors+ " ";
      
          

        
          if(descriarray[j]=='favorite')
          {  var titleauthor = document.createElement('p');
            titleauthor.innerHTML = "Marked "+ titleandby + "as favorite";
            activity.appendChild(titleauthor);
          }
          else if(descriarray[j]=="bookshelf")
          {  var titleauthor = document.createElement('p');
            titleauthor.innerHTML = "Added "+ titleandby + "to bookshelf";
            activity.appendChild(titleauthor);
          }
          else if(descriarray[j]=="Currently Reading")
          {  var titleauthor = document.createElement('p');
            titleauthor.innerHTML = "Is currently reading "+ titleandby;
            activity.appendChild(titleauthor);
          }

}

    }
      
}


       }

  }





}

window.addEventListener('load',fetchBookshelf);
window.addEventListener('load', fetchFavorites);
window.addEventListener('load', fetchCurrentlyReading)
 window.addEventListener('load', fetchActivity);
