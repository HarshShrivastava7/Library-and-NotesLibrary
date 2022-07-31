let addTitle = document.querySelector("#addTitle");
let addNotes = document.querySelector("#addTxt");
let addBtn = document.querySelector("#addBtn");
let notes = document.querySelector("#notes");
let search = document.querySelector("#searchTxt");
let clearAll = document.querySelector("#clearAllBtn");
// console.log(addBtn);
Notes();

addBtn.addEventListener("click",function(){
  let title = localStorage.getItem("title")?JSON.parse(localStorage.getItem("title")):[];
  if(addTitle.value.length<1){
    addTitle.value = "NOTE";
  }
  title.push(addTitle.value);
  localStorage.setItem("title", JSON.stringify(title));
  let content = localStorage.getItem("content")?JSON.parse(localStorage.getItem("content")):[];
  content.push(addNotes.value);
  localStorage.setItem("content", JSON.stringify(content));
  // console.log(addNotes.value);
  Notes();
  addTitle.value = "";
  addNotes.value = "";
});

function Notes(){
  let title = localStorage.getItem("title")?JSON.parse(localStorage.getItem("title")):[];
  let content = localStorage.getItem("content")?JSON.parse(localStorage.getItem("content")):[];
  // console.log(content);
  // localStorage.setItem("content", JSON.stringify(content));s
  notes.innerHTML = "";
  content.forEach(function(e,x){
    // console.log(e);
    notes.innerHTML += `<div class="card my-3 mx-3" style="width: 18rem; background-color: #c0a06d;">
      <div class="card-body card-notes">
        <h5 class="card-title">${title[x]}</h5>
        <p class="card-text">${e}</p>
        <button href="#" class="btn btn-primary dltBtn" onclick="Delete(${x})">Delete Note</button>
      </div>
    </div>`
  });
  if(notes.innerHTML === ""){
    notes.innerHTML = "Please Enter Some Notes !";
  }
  if(notes.innerHTML === "Please Enter Some Notes !"){
    clearAll.style.display = "none";
  }
  else{
    clearAll.style.display = "inline-block";
  }
}

function Delete(x){
  let content = localStorage.getItem("content")?JSON.parse(localStorage.getItem("content")):[];
  let title = localStorage.getItem("title")?JSON.parse(localStorage.getItem("title")):[];
  // console.log(x);
  content.splice(x,1);
  title.splice(x,1);
  localStorage.setItem("title", JSON.stringify(title));
  localStorage.setItem("content", JSON.stringify(content));
  Notes();
  // console.log(content);
}

search.addEventListener("input",function(){
  document.querySelectorAll(".card-notes").forEach(function(e){
    // console.log(search.value,e.innerText);
    if(e.innerText.toLowerCase().includes(search.value.toLowerCase())){
      // console.log(  e.parentElement);
      e.parentElement.style.display = "block";
    }
    else{
        // console.log(  e.parentElement);
      e.parentElement.style.display = "none";
    }
  });
});

clearAll.addEventListener("click",function(){
  if(notes.innerHTML === "Please Enter Some Notes !"){
    clearAll.style.display = "none";
  }
  localStorage.removeItem("title");
  localStorage.removeItem("content");
  Notes();
});
