var i, flag = false;
if(document.getElementById("searchperson")!=null){
  var searchperson = document.getElementById('searchperson');
  var searcharea = document.getElementById('searcharea');

  searchperson.onclick = function(){
    setProfile(searcharea.value);
    if(searcharea.value!=''){
      flag = true;
     var profile = document.getElementById('profile');
     profile.innerHTML = searcharea.value+"'s profile";

      var xml;
      if(window.XMLHttpRequest){
   xml = new XMLHttpRequest();
  }
  else{
    xml = new ActiveXObject("Microsoft.XMLHTTP");
  }
  xml.open("GET", 'puborpriv.php?name='+searcharea.value);
  xml.send();
   xml.onreadystatechange = function(){

    if(this.status==200 && this.readyState == 4){

    if(this.responseText=="public")
    {
     while(document.getElementById('accesswarning').firstChild)document.getElementById('accesswarning').removeChild(document.getElementById('accesswarning').firstChild);
       fetch('bookshelf', searcharea.value);
      fetch('favorite', searcharea.value);
      fetch('reading', searcharea.value);
      fetchActivity(searcharea.value);
    }
  else{
    document.getElementById('accesswarning').innerHTML = "That profile is private";
    }
  }
  }
}
}
}
function fetch(string, name){
  var xml;
  var fetchcontainer = document.getElementById(string);
  
  while(fetchcontainer.firstChild){
    fetchcontainer.removeChild(fetchcontainer.firstChild);
  }
  if(window.XMLHttpRequest){
   xml = new XMLHttpRequest();
  }
  else{
    xml = new ActiveXObject("Microsoft.XMLHTTP");
  }
  xml.open("GET", "fetchwhatever.php?q="+string+"&name="+name);
  xml.send();
   xml.onreadystatechange = function(){
    if(this.status==200 && this.readyState == 4){
      console.log(this.responseText);
      var array = this.responseText.split(',');

      var req = array.join('+OR+id:');
       var url = "https://www.googleapis.com/books/v1/volumes?key=AIzaSyBvlo4zgSbusa3eqpM63-ScSAFlaq5jpuI&q=id:"+req;
       
       var xhttp;
       if(window.XMLHttpRequest){
   xhttp = new XMLHttpRequest();
  }
  else{
    xhttp = new ActiveXObject("Microsoft.XMLHTTP");
  }
  
   xhttp.open("GET", url);
    xhttp.send();
    xhttp.onreadystatechange = function(){
     if(this.status==200 && this.readyState == 4){

      var response = JSON.parse(this.responseText);
      
      var total = response.totalItems>10?10:response.totalItems;
   for(i=0;i<total;i++)
  for(id of array)
    if(id==response.items[i].id)
    printBookDetails(response.items[i], fetchcontainer, name);
     }


    }


    }
   }
  
}



function printBookDetails(response, id, username){
    var popup = document.getElementById('popup');
    var bookdetails = document.createElement('div');
    bookdetails.className = "bookdetails";
    var title = document.createElement('p');
    title.onclick = function(){
      fetchPopup(response.id);
    }
    title.innerHTML = response.volumeInfo.title+ " by " + response.volumeInfo.authors ;
    var thumbnail = document.createElement('img');
    var isbn = document.createElement('p');


    isbn.innerHTML = response.id;
        isbn.display = "none";
        isbn.className = "tohide";
    bookdetails.appendChild(isbn);
    thumbnail.src = response.volumeInfo.imageLinks.thumbnail;
    thumbnail.alt = "the image is loading";
    bookdetails.appendChild(title);
    bookdetails.appendChild(thumbnail);
    console.log(title.innerHTML);
    console.log(isbn.innerHTML);
    addButton(bookdetails, "Add to bookshelf", "bookshelf", "Remove from bookshelf", username, response.id, title.innerHTML);
    addButton(bookdetails, "Mark as favorite", "favorite", "Remove from favorites", username, response.id, title.innerHTML);
    addButton(bookdetails, "Like", "like", "Unlike", username, response.id, title.innerHTML);
    readstatus(bookdetails);
    id.appendChild(bookdetails);


}


function addButton(id, value1, string, value2, username, bookid, titleandby) {
  console.log(bookid);
  var add = document.createElement('input');
  add.type = "button";
  add.value = value1;

  var xml, flag = 0;

   if(window.XMLHttpRequest){
    xml = new XMLHttpRequest();
  }
  else{
    xml = new ActiveXObject('Microsoft.XMLHTTP');
  }
  xml.open("GET", "fetchwhatever.php?q="+string+"&name="+username);
  xml.send();
  
  xml.onreadystatechange = function(){
 
      if(this.readyState==4 && this.status==200){
        var array = this.responseText.split(',');
   
    for(i=0;i<array.length;i++)
    {

     
      if(array[i]==bookid){
  
        add.value = value2;


      }

  }
}
}

  // if(check(value, username, id)) add.value = value2;

  add.name = id.children[0].innerHTML;
  id.children[0].style.display = "hidden";
  add.className = "addbutton";
  add.onclick = function(){
    console.log(titleandby);
    tit = titleandby.split(' ').join('+');
    if(this.value == value1)
    {
      this.value= value2;
 var xml = new XMLHttpRequest();
 console.log(tit);
 console.log("123's");
 console.log(bookid);
 xml.open("GET","setwhatever.php?q="+string+"&id="+bookid+"&title="+tit);
 xml.send();
 xml.onreadystatechange = function(){
   if(this.readyState == 4 && this.status == 200){
     console.log(this.responseText);
   }
 }
}
else if(this.value==value2){
      {
      this.value= value1;
 var xml = new XMLHttpRequest();
 xml.open("GET","deletewhatever.php?q="+string+"&id="+bookid+"&title="+tit);
 xml.send();
 xml.onreadystatechange = function(){
   if(this.readyState == 4 && this.status == 200){
     console.log("Set successfully");
   }
 }
}

}


  }
  id.appendChild(add);
}


var j;
function readstatus(id){
  var status = document.createElement('select');
  status.className = "read-dropdown";
  var opt = ['Want to read', 'Currently Reading', 'Finished Reading'];
  var optval = ['want-to-read', 'reading', 'finished-reading'];
  for(j=0;j<3;j++){
  var op1 = document.createElement('option');
  op1.value = optval[j];
  op1.text = opt[j];
  status.appendChild(op1);
}

var stat = document.createElement('input');
stat.type = "button";
stat.value = "Set status";
stat.className="statbutton";
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


function fetchActivity(name){

  var xml = new XMLHttpRequest();
  xml.open("GET", "fetchactivity.php?name="+name);
  xml.send();
  xml.onreadystatechange = function(){

    if(this.status==200 && this.readyState == 4){
      console.log(this.responseText); 
    var intermediate = this.responseText.split('.....');
    var idarray = intermediate[0].split(',,,,,');
 
    var descriarray = intermediate[1].split(',,,,,');
    console.log(descriarray);
  fetchTitleAuthor(idarray, descriarray);
    }

  }

}
activity = document.getElementById('activity');


function fetchTitleAuthor(titlearray, descriarray){


  while(activity.firstChild){
    activity.removeChild(activity.firstChild);
  }



// var url = "https://www.googleapis.com/books/v1/volumes?key=AIzaSyBvlo4zgSbusa3eqpM63-ScSAFlaq5jpuI&q=id:"+req;
// i=0;
// console.log(url);
// var xhttp;


 
//   xhttp = new XMLHttpRequest();
//   xhttp.open("GET", url);
//   xhttp.send();
//   xhttp.onreadystatechange = function(){

//        if(this.status==200 && this.readyState == 4){
//           var response = JSON.parse(this.responseText);
//           console.log(response);

// var total = response.totalItems>10?10:response.totalItems;

  for(j=0;j<descriarray.length;j++){
   
         if(descriarray[j]=='favorite')
          {  var titleauthor = document.createElement('p');
            titleauthor.innerHTML = "Marked "+ titlearray[j] +" as favorite";
            activity.appendChild(titleauthor);
          }
          else if(descriarray[j]=="bookshelf")
          {  var titleauthor = document.createElement('p');
            titleauthor.innerHTML = "Added "+ titlearray[j] +" to bookshelf";
            activity.appendChild(titleauthor);
          }
          else if(descriarray[j]=="reading")
          {  var titleauthor = document.createElement('p');
            titleauthor.innerHTML = "Is currently reading "+ titlearray[j];
            activity.appendChild(titleauthor);
          }
          else if(descriarray[j]=='finished-reading')
          {
            var titleauthor = document.createElement('p');
            titleauthor.innerHTML = "Has read "+ titlearray[j];
            activity.appendChild(titleauthor);

          }
           else if(descriarray[j]=='like')
          {
            var titleauthor = document.createElement('p');
            titleauthor.innerHTML = "Liked "+ titlearray[j];
            activity.appendChild(titleauthor);

          }



    }
      



       }

  



function submitHandler() {




  var result = document.getElementById("search").value.split(" ");
  var res = result.join('+');

  var url = "https://www.googleapis.com/books/v1/volumes?q=" + document.getElementById('chooseby').value + ":" + res +"&key=AIzaSyBvlo4zgSbusa3eqpM63-ScSAFlaq5jpuI";

  getBookDetails(url);
}


var search = document.getElementById('search');
var datalist = document.getElementById('searchlist');

function asynchronousSearch(){

  while(datalist.firstChild){
    datalist.removeChild(datalist.firstChild);
  }
  var result = document.getElementById("search").value.split(" ");
  var res = result.join('+');

  url = "https://www.googleapis.com/books/v1/volumes?q=" + document.getElementById('chooseby').value + ":" + res +"&key=AIzaSyBvlo4zgSbusa3eqpM63-ScSAFlaq5jpuI";

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
        title.innerHTML = response.items[i].volumeInfo.title + " by " + response.items[i].volumeInfo.authors;
       
        var thumbnail = document.createElement('img');
        var isbn = document.createElement('p');
        isbn.className = "tohide";
        isbn.style.display = "hidden";
        isbn.innerHTML = response.items[i].id;
         title.onclick = function(){
          fetchPopup(isbn.innerHTML);
        }
        console.log(response.items[i].id);
        bookdetails.appendChild(isbn);
        thumbnail.src = response.items[i].volumeInfo.imageLinks.thumbnail;
        thumbnail.alt = "No image";
        bookdetails.appendChild(title);
        bookdetails.appendChild(thumbnail);
        console.log(title.innerHTML);
    addButton(bookdetails, "Add to bookshelf", "bookshelf", "Remove from bookshelf", "undefined", response.items[i].id, title.innerHTML);
    addButton(bookdetails, "Mark as favorite", "favorite", "Remove from favorites", "undefined", response.items[i].id, title.innerHTML);
    addButton(bookdetails, "Like", "like", "Unlike", "undefined", response.items[i].id, title.innerHTML);
    readstatus(bookdetails);
    shelf.appendChild(bookdetails);




      }



    }
  }
}

function setstatus(){
  var value;
  if(document.getElementById("one")!=null){
    if(document.getElementById("one").checked == true){
      value = 'public';

    }
    else value = 'private';
  }
  var xml;
  if(window.XMLHttpRequest){
    xml = new XMLHttpRequest();
  }
  else{
    xml = new ActiveXObject('Microsoft.XMLHTTP');
  }
  xml.open("GET", 'setaccesslevel.php?q='+value);
  xml.send();
  xml.onreadystatechange = function(){
    if(this.readyState==4 && this.status == 200)
    {
      console.log(this.responseText);
    }
  }

}
 var popup = document.getElementById('popup');
 var blanket = document.getElementById('blanket');
 var accesslevel = document.getElementById('accesslevel');

function fetchPopup(id){
  while(popup.firstChild){
    popup.removeChild(popup.firstChild);
  }
var url = "https://www.googleapis.com/books/v1/volumes?q=id:"+id+"&key=AIzaSyBvlo4zgSbusa3eqpM63-ScSAFlaq5jpuI";
var xml;
  if(window.XMLHttpRequest){
    xml = new XMLHttpRequest();
  }
  else{
    xml = new ActiveXObject('Microsoft.XMLHTTP');
  }
  xml.open("GET", url);
  xml.send();
  xml.onreadystatechange = function(){
     if(this.readyState==4 && this.status == 200){
     
      var response = JSON.parse(this.responseText);
      popup.style.display = "block";
      popup.style.zIndex = "9002";
      blanket.style.zIndex = "9001";
      accesslevel.style.zIndex = "9001";
      blanket.style.opacity = "0.2";
      var title = document.createElement('p');
      var description = document.createElement('p');
      var image = document.createElement('img');
      var close = document.createElement('input');
      var review = document.createElement('textarea');
    
      review.name = response.items[0].id;
      review.placeholder = "Submit review";
      review.className = "reviewfield";
      review.required = true;
      var submit = document.createElement('input');
      submit.name = response.items[0].id;
      submit.type = "button";
      submit.value = "Submit review";
      submit.className  = "submitbutton";

      submit.onclick = function(){
       
 
  var string = "review:"+review.value.split(" ").join('+');
  var xhttp;
   if(window.XMLHttpRequest){
    xhttp = new XMLHttpRequest();
  }
  else{
    xhttp = new ActiveXObject('Microsoft.XMLHTTP');
  }
  //var string = "review."+review.value;

  xhttp.open("GET", "setwhatever.php?q="+string+"&id="+review.name);
  xhttp.send();
  xhttp.onreadystatechange = function(){
    if(this.readyState==4 && this.status==200){
      console.log("review set successfully");
     
      

    }
  }
      }

      if(typeof(response.items[0].volumeInfo.imageLinks!='undefined'))
       image.src = response.items[0].volumeInfo.imageLinks.thumbnail;
        image.alt = "Loading";
        if(typeof(response.items[0].volumeInfo.description)!='undefined')
        description.innerHTML = response.items[0].volumeInfo.description;
        else description.innerHTML = "No description found";
        title.innerHTML = response.items[0].volumeInfo.title + " by " + response.items[0].volumeInfo.authors;
        close.type = "button";
        close.className = "popupbutton";

        close.value = "Close";
        close.onclick = function(){
          while(popup.firstChild){
            popup.removeChild(popup.firstChild);
          }
          blanket.style.opacity = "1";
          accesslevel.style.opacity = "1";

        }
        var reviewlist = document.createElement('p');
      reviewlist.innerHTML = "Review of the book " +  title.innerHTML;
      var reviewbody = document.createElement('p');
    
  


        popup.appendChild(title);
        popup.appendChild(image);
        popup.appendChild(description);
        popup.appendChild(review);
        popup.appendChild(submit);
        popup.appendChild(close);
         displayReviews(response.items[0].id, popup)

      

     }
  }

}

window.addEventListener('load',function(){
  if(document.getElementById('bookshelf')!=null){
    if(!flag){
  fetch("bookshelf", "undefined");
  fetch("favorite", "undefined");
  fetch('reading', "undefined");
  fetchActivity("undefined");
}
}

});


function displayReviews(id, parent){
  var xml;

   if(window.XMLHttpRequest){
    xml = new XMLHttpRequest();
  }
  else{
    xml = new ActiveXObject('Microsoft.XMLHTTP');
  }
  xml.open("GET", "fetchreview.php?id="+id);
  xml.send();
  xml.onreadystatechange = function(){
    if(this.readyState==4 && this.status==200){
      console.log(this.responseText);
      if(this.responseText=="No reviews available for this book"){
        var remark = document.createElement('p');
        remark.innerHTML = this.responseText;
        parent.appendChild(remark);
      }
      else{
       var intermediate = this.responseText.split('.');
       var name = intermediate[0].split(',');
       var rev = intermediate[1].split(',');
       for(i=0;i<name.length;i++){
        var person = document.createElement('p');
        person.innerHTML = name[i];
        person.className = "reviewperson";
        var content = document.createElement('p');
        content.innerHTML = rev[i].substr(7, rev[i].length-1);
        parent.appendChild(person);
        parent.appendChild(content);
       }
    }
  }
  }
  

}
function setProfile(name)
{
  document.getElementById('profile').innerHTML = name;
}
// console.log(check('bookshelf', 'user1', '95wnDQAAQBAJ'));
// function check(string, name, id){

//   var xml, flag = 0;

//    if(window.XMLHttpRequest){
//     xml = new XMLHttpRequest();
//   }
//   else{
//     xml = new ActiveXObject('Microsoft.XMLHTTP');
//   }
//   xml.open("GET", "fetchwhatever.php?q="+string+"&name="+name);
//   xml.send();
  
//   xml.onreadystatechange = function(){
   
       
//       if(this.readyState==4 && this.status==200){
  
//     var array = this.responseText.split(',');
//     for(i=0;i<array.length;i++)
//     {
     
//       if(array[i]==id){
//         flag = 1;
        

//       }

//     }
// }
// } 



  








if(document.getElementById('submit')!=null)
{document.getElementById('submit').addEventListener("click", submitHandler);
//document.getElementById('fetch').addEventListener("click", fetchBookshelf);
search.addEventListener('input', asynchronousSearch);
}
// window.addEventListener('load', fetchFavorites);
// window.addEventListener('load', fetchCurrentlyReading)
//  window.addEventListener('load', fetchActivity);
