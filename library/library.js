let num = 0;

show();

class Books {

  constructor(name, author, genre) {
    this.name = name;
    this.author = author;
    this.genre = genre;
  }

  // add() {
  //   let booksSection = document.querySelector("#booksSection");
  //   let books = localStorage.getItem("books")?JSON.parse(localStorage.getItem("books")):[];
  //   let x = books.length;
  //   booksSection.innerHTML += `<tr class="boxDetail">
  //                               <th scope="row">${x}</th>
  //                               <td>${this.name}</td>
  //                               <td>${this.author}</td>
  //                               <td>${this.genre}</td>
  //                               <td><button type="button" class="btn btn-outline-danger" class="dlt" onclick="deleteBtn()">Delete</button></td>
  //                             </tr>`;
  // }

  clearForm() {
    let form = document.querySelector("#form");
    form.reset();
  }

  static validate(result, value) {
    document.querySelector("#alert").innerHTML = `<div class="alert alert-${result} alert-dismissible fade show" role="alert">
                                                    ${value}
                                                    <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                                                  </div>`;
    setTimeout(function(){
      document.querySelector("#alert").innerHTML = "";
    },1000);
  }

}

let form = document.querySelector("#form");

form.addEventListener("submit",function(e){
  e.preventDefault();
  let name = document.querySelector("#addTitle").value;
  let author = document.querySelector("#addAuthor").value;
  let fiction = document.querySelector("#Fiction");
  let programming = document.querySelector("#Programming");
  let cooking = document.querySelector("#Cooking");
  let genre;

  if(fiction.checked){
    genre = fiction.value;
  }
  else if(programming.checked){
    genre = programming.value;
  }
  else if(cooking.checked){
    genre = cooking.value;
  }
if(name.length>2 && author.length>2){
  let book = new Books(name,author,genre);
  let books = localStorage.getItem("books")?JSON.parse(localStorage.getItem("books")):[];
  books.push(book);
  localStorage.setItem("books",JSON.stringify(books));
  // book.add();
  show();
  book.clearForm();
  Books.validate("success", `<strong>Success : </strong> Your Book is successfully added. Cheers :)`);
}
else{
  Books.validate("danger", `<strong>Error! : </strong> Pls enter coorect details :( .`);
}
});

function show(){
  let booksSection = document.querySelector("#booksSection");
  let books = localStorage.getItem("books")?JSON.parse(localStorage.getItem("books")):[];
  booksSection.innerHTML = "";
  books.forEach(function(e,x){
    booksSection.innerHTML += `<tr class="booksDetail">
    <th scope="row">${x+1}</th>
    <td>${e.name}</td>
    <td>${e.author}</td>
    <td>${e.genre}</td>
    <td><button type="button" class="btn btn-outline-danger" class="dlt" onclick="deleteBtn()">Delete</button></td>
    </tr>`;
  });
}

function deleteBtn(e){
  let books = localStorage.getItem("books")?JSON.parse(localStorage.getItem("books")):[];
  books.splice(e,1);
  localStorage.setItem("books",JSON.stringify(books));
  show();
}

document.querySelector("#clearAllBtn").addEventListener("click",function(){
  localStorage.removeItem("books");
  show();
});

document.querySelector("#search").addEventListener("input",function(){
  document.querySelectorAll(".booksDetail").forEach(function(e){
    if(e.innerText.toLowerCase().includes(search.value.toLowerCase())){
      e.style.display = "table-row";
    }
    else{
      e.style.display = "none";
    }
  });
});
