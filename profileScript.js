console.log("Dashboard to be updated shortly...");

let displayName=document.getElementById("displayName");
let displayEmail=document.getElementById("displayEmail");
let displayColor=document.getElementById("displayColor");
 
document.getElementById("userForm").addEventListener("submit", function (e) {
  e.preventDefault();

 
  let resultsName=document.getElementById("name").value.trim();
  let resultsEmail=document.getElementById("email").value.trim();
  let resultsColor=document.getElementById("color").value.trim();

  if(displayName==resultsName){
    return;
  }
  if(displayColor==resultsColor){
    return;
  }
  if(displayEmail==resultsEmail){
    return;
  }

  displayName.textContent= resultsName;
  displayEmail.textContent= resultsEmail;
  displayColor.textContent= resultsColor;

  document.body.style.backgroundColor=resultsColor;

  resultsName.value="";
  resultsEmail.value="";
  resultsColor.value="";
  }
  );

console.log("Dashboard updated successfully!")

let myList = [];

function addTask() {
  const input = document.getElementById("taskInput");
  const task = input.value.trim();
  if (task) {
    myList.push(task);
    input.value = "";
    renderTasks();
  }
}

function renderTasks() {
  const taskList = document.getElementById("taskList");
  taskList.innerHTML = "";
  const listItems = myList.map((task, x) => `<li key="${x}">${task} <button onclick="removeTask(${x})">Remove</button></li>`).join("");
  taskList.innerHTML = listItems;
}

function removeTask(x) {
    myList.splice(x, 1);
    renderTasks();
}

function sortList(){
  myList.sort();
  renderTasks();
}

function filterNums(){
  myList=myList.filter(num => num>=0 && num<=9);
  renderTasks();

} 

renderTasks();

//Fetch request I followed tutorial on youtube to fetch a pokemon from PokemonAPI

async function getURL(){

  let url= "https://pokeapi.co/api/v2/pokemon/eevee";

  try{
    const response = await fetch(url);
    if (!response.ok){
      throw new Error("could not fetch resource.")
    }

    const data= await response.json();
    const eevee= data.sprites.front_default;
    const imgElement= document.getElementById('eeveeSprite');

    imgElement.src= eevee;
    imgElement.style.display="block";

    console.log("Eevee displayed.");

  }
  catch(error){
    console.error(error);
  }
}

//fetch from example json api

async function articleData(){

  let urlArticle="https://jsonplaceholder.typicode.com/users";

  try{

    const responseArticle= await fetch(urlArticle);
    const dataArticle= await responseArticle.json();
    
    if (!responseArticle.ok){
      throw new Error("Could not fetch data.");
    }

    const userList=document.getElementById("userList");
  

    dataArticle.forEach((user)=>{

      const userItem= document.createElement("li");
      userItem.textContent=`${user.name} aka ${user.username}`;

      userList.appendChild(userItem);
 
    });

  
   console.log("Email displayed.");
  }
  catch(error){
    console.error("Error fetching username.", error);
    alert("Something went wrong");
  }
}

articleData();

//simulating saving new data

async function saveData(id,title){

  let saveUrl="https://jsonplaceholder.typicode.com/posts";

  try{

    const responseSave=await fetch(saveUrl, {
      method:"POST",
      body:JSON.stringify({
        id:id,
        title: title,
        userId:2
      })
    });
    
    if(!responseSave){
      throw new Error("Could not fetch data.")
    }

    const dataSave= responseSave.json();

    alert("Item saved.")
    console.log(responseSave, dataSave);



  } catch(error){
    alert("Error found adding item.")
  }
    
  }

  let saveForm=document.getElementById("saveForm");

  saveForm.addEventListener("submit", function(x) {
    x.preventDefault();
    let c=document.getElementById("postSave").value;
    let d=document.getElementById("bodySave").value;
    saveData(c,d);
  });


  async function loadingMessages() {
    let dataContainer = document.getElementById("data");
  
    b.textContent = "Loading data...";
  
    try {

      let response = await fetch("https://jsonplaceholder.typicode.com/posts");
      let a = await response.json();

      b.textContent = "";
      a.forEach(item => {

        let div = document.createElement("div");
        div.textContent = item.title;
        b.appendChild(div);

      });
    } catch (error) {

      b.textContent = "No results found.";

    }
  }