var i, url, response;
var heading = document.getElementById('mylibrary-heading');
var shelf = document.getElementById("recommendations");

function getBookDetails(url) {
  var xhr = new XMLHttpRequest();
    var shelf = document.getElementById("recommendations");
    while(shelf.firstChild){
      shelf.removeChild(shelf.firstChild);
    }
  xhr.open("GET", url);

  xhr.send();
  xhr.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {

      response = JSON.parse(this.responseText);


     var total = response.totalItems<10? response.totalItems: 10;
     console.log(response);
     if(total==0) heading.innerHTML = "There are no books to display";
     else heading.innerHTML = "Here are the recommendations";

      for (i = 0; i < total; i++) {
      if(typeof(response.items[i].volumeInfo.imageLinks)==='undefined')
        {
         
         
          i++;
          continue;
        }
        var bookdetails = document.createElement('div');
        bookdetails.className = "bookdetails";
        var title = document.createElement('p');
        title.innerHTML = response.items[i].volumeInfo.title;
        var thumbnail = document.createElement('img');
        var isbn = document.createElement('p');
        isbn.style.display = "hidden";

        isbn.innerHTML = response.items[i].id;
        bookdetails.appendChild(isbn);
     
        // if(response.items[i].volumeInfo.imageLinks.thumbnail != undefined)
        thumbnail.src = response.items[i].volumeInfo.imageLinks.thumbnail;
        thumbnail.alt = "No image";
        bookdetails.appendChild(title);
        bookdetails.appendChild(thumbnail);
        addButton(bookdetails);
        favoriteButton(bookdetails);
        readstatus(bookdetails);
        shelf.appendChild(bookdetails);



      }



    }
  }
}
var url;

function submitHandler() {




  var result = document.getElementById("search").value.split(" ");
  var res = result.join('+');

  var url = "https://www.googleapis.com/books/v1/volumes?q=" + document.getElementById('chooseby').value + ":" + res +"&key=AIzaSyBvlo4zgSbusa3eqpM63-ScSAFlaq5jpuI";

  getBookDetails(url);
}

// function addButton(id) {
//   var add = document.createElement('input');
//   add.type = "button";
//   add.value = "Add to bookshelf";
 
//   add.name = id.children[0].innerHTML;
//   id.children[0].style.display = "hidden";
//   add.className = "addbutton";
//   add.onclick = function(){
//  var xml = new XMLHttpRequest();
//  xml.open("GET","addtobookshelf.php?id="+add.name);
//  xml.send();
//  xml.onreadystatechange = function(){
//    if(this.readyState == 4 && this.status == 200){
//      console.log("added successfully");
//    }
//  }


//   }
//   id.appendChild(add);
// }

// function favoriteButton(id){
//   var fav = document.createElement('input');
//   fav.type = "button";
//   fav.value = "Add to favorites";

//   fav.name = id.children[0].innerHTML;
//   id.children[0].style.display = "hidden";
//   fav.className = "addbutton";
//   fav.onclick = function(){
//  var xml = new XMLHttpRequest();
//  xml.open("GET","addasfav.php?id="+fav.name);
//  xml.send();
//  xml.onreadystatechange = function(){
//    if(this.readyState == 4 && this.status == 200){
//      console.log("added successfully");
//    }
//  }


//   }
//   id.appendChild(fav);
// }
var j;
// function readstatus(id){
//   var status = document.createElement('select');
//   var opt = ['Want to read', 'Currently Reading', 'Finished Reading'];
//   for(j=0;j<3;j++){
//   var op1 = document.createElement('option');
//   op1.value = opt[j];
//   op1.text = opt[j];
//   status.appendChild(op1);
// }

// var stat = document.createElement('input');
// stat.type = "button";
// stat.value = "Set status";

// status.name = id.children[0].innerHTML;
// id.children[0].style.display = "hidden";
// status.className = "status";
// stat.onclick = function(){
// var xml = new XMLHttpRequest();
// xml.open("GET","setstatus.php?id="+status.name+"&value="+status.value);
// xml.send();
// xml.onreadystatechange = function(){
//  if(this.readyState == 4 && this.status == 200){
//    console.log("Status set successfully");
//  }
// }


// }
// id.appendChild(status);
// id.appendChild(stat);

// }

// function fetchBookshelf(){
//  var bookshelf = document.getElementById('bookshelf');
//   var xml = new XMLHttpRequest();
//   xml.open("GET", "fetchbookshelf.php");
//   xml.send();
//   xml.onreadystatechange = function(){
//   if(this.status==200 && this.readyState == 4)
//   console.log(this.responseText);
// }
// }
var search = document.getElementById('search');
var datalist = document.getElementById('searchlist');



function asynchronousSearch(){

  while(datalist.firstChild){
    datalist.removeChild(datalist.firstChild);
  }
  var result = document.getElementById("search").value.split(" ");
  var res = result.join('+');

  url = "https://www.googleapis.com/books/v1/volumes?q=" + document.getElementById('chooseby').value + ":" + res +"&key=AIzaSyBvlo4zgSbusa3eqpM63-ScSAFlaq5jpuI";
  console.log(url);
  var xml = new XMLHttpRequest();
  xml.open("GET", url);
  xml.send();
  xml.onreadystatechange = function(){

    if(this.readyState == 4 && this.status==200){
 
      var req = JSON.parse(this.responseText);
      var total = req.totalItems>10?10:req.totalItems;
    
      for(i=0;i<total;i++)
      {
        var opt = document.createElement('option');
        opt.value = req.items[i].volumeInfo.title;
        datalist.appendChild(opt);

      }

    }
  }

}

document.getElementById('submit').addEventListener("click", submitHandler);
document.getElementById('fetch').addEventListener("click", fetchBookshelf);
search.addEventListener('input', asynchronousSearch);
