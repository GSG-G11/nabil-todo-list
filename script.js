const form = document.getElementById("input");
const toDoInput = document.getElementById("main-input");
const toDoTime = document.getElementById("my-time");
const addTask = document.getElementById("list-item");
const reset = document.getElementById("reset");
const container = document.getElementById("container");
let counter = document.getElementById("counter");
let section, imgDiv, img, flexingDiv, leftDiv, title, time, sDiv, status;
let tasks = [];
let lsTasks =  localStorage.getItem('tasks') ? JSON.parse(localStorage.getItem('tasks')) : [];;

function listLS(task, time, index) {
  lsTasks.push({ name: task, clock: time, check: false, counter: index });
  localStorage.setItem("tasks", JSON.stringify(lsTasks));
}

function removeLs(counter) {
  let copyLs = lsTasks.filter(
    (item) => item.counter !== counter
  );
  lsTasks = copyLs;
  localStorage.setItem("tasks", JSON.stringify(lsTasks));
}

function list(task, time, index, ischecked) {
  task = ` <section class="to-do" id=section-${index}>
<div class="flexing-x">
<img src="assets\\x.png"  onclick="remove(${index})" alt="delete" class="x">
</div>
<div class="flexing-data">
<div class="flexing-right">
<p  class="font-prop">${task}</p>
<p class="time-prop">${time}</p>
</div>
<div>
<p class="font-prop" id="find-check${index}" onclick="check(${index})">${
    ischecked ? "Completed" : "To be done"
  }</p>
</div>
</div>
</section>`;
  container.insertAdjacentHTML("afterbegin", task);

  tasks.push({ name: task, clock: time, check: ischecked, counter: index });
}

form.addEventListener("submit", (event) => {
  event.preventDefault();
  if (toDoInput.value == "") {
    alert("type something please");
    return;
  }
  let index = tasks.length;
  list(toDoInput.value, toDoTime.value, index);
  listLS(toDoInput.value, toDoTime.value, index);
  counter.innerHTML = tasks.length;
  toDoInput.value = "";
});

function check(index) {
  let objectIndex = lsTasks.findIndex((i) => i.counter == index);
  lsTasks[objectIndex].check = !lsTasks[objectIndex].check;
  localStorage.setItem("tasks", JSON.stringify(lsTasks));

  let checked = document.getElementById(`find-check${index}`);
  checked.innerHTML == "Completed"
    ? (checked.innerHTML = "To be done")
    : (checked.innerHTML = "Completed");
}


function remove(index) {
    let deletedELment = document.getElementById(`section-${index}`);
    let copy = tasks.filter((item) => item.index !== index);
    tasks = copy;
    let deletedTask = deletedELment.childNodes[1].childNodes[1];
    deletedELment.remove();
    removeLs(index);
      taskNumber.innerText=tasks.length
}

// const delAll = function () {
//     for(let i =0; i< lsTasks; i++){
//         remove(i)
//     }
   
// }
 
// reset.addEventListener("click", delAll)


window.onload = function()  {
    if(localStorage.getItem('tasks')){
   let itemsArray=JSON.parse(localStorage.getItem('tasks'))
        for(let i=0; i<itemsArray.length;i++){
            list(itemsArray[i].name, itemsArray[i].clock,itemsArray[i].counter, itemsArray[i].check )
        }
    }
}