var xml = new XMLHttpRequest();
xml.open("GET", "https://www.googleapis.com/books/v1/volumes/hxEQDQEACAAJ");
xml.send();
xml.onreadystatechange = function(){

  if(this.status==200 && this.readyState == 4){
  var response = JSON.parse(this.responseText);
  localStorage.setItem("one", response);

  }
}
