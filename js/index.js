window.onload = timer();
let projectDisplayEl = document.querySelector("#project-display");
let projectModalEl = document.querySelector("#project-modal");
let projectFormEl = document.querySelector("#project-form");
let projectNameInput = document.querySelector("#project-name-input");
let projectTypeInput = document.querySelector("#project-type-input");
let hourlyRateInput = document.querySelector("#hourly-rate-input");
let dueDateInput = document.querySelector("#due-date-input");
let pTag = document.createElement("p");
renderTables();
const submitButton = document.querySelector("#submitButton");
const deleteButton = document.querySelectorAll(".delete-project-btn");

function time() {
  let x = new Date();
  let year = x.getFullYear();
  let day = x.getDate();
  let month = x.getMonth();
  let hour = x.getHours();
  let mins = x.getMinutes();
  let secs = x.getSeconds();
  let ampm = x.getHours() >= 12 ? " PM" : " AM";
  let seconds = x.getSeconds() <= 9 ? "0" + secs : secs;
  let x1 = month + 1 + "/" + day + "/" + year;
  x1 = x1 + " - " + hour + ":" + mins + ":" + seconds + ":" + ampm;
  document.getElementById("time-display").innerHTML = x1;
  timer();
}

function timer() {
  setTimeout("time()", 1000);
}

function setProjectData(name, type, rate, date, daysLeft, profit, pDelete) {
  console.log("set project data function invoked");
  const id = Math.floor(Math.random() * 1000);
  const project = {
    id,
    name,
    type,
    rate,
    date,
    daysLeft,
    profit,
    pDelete,
  };

  const data = JSON.parse(localStorage.getItem("Project Name")) || [];
  data.push(project);
  localStorage.setItem("Project Name", JSON.stringify(data));
  renderTables();
}

function renderTables() {
  console.log("render tables function invoked");
  projectDisplayEl.innerHTML = "";
  const data = JSON.parse(localStorage.getItem("Project Name")) || [];
  data.forEach((project) => {
    const tr = document.createElement("tr");

    tr.setAttribute("id", project.id);
    tr.innerHTML = `
    <td class="p-2">${project.name}</td>
    <td class='p-2'>${project.type}</td>
    <td class='p-2'>${project.rate}</td>
    <td class='p-2'>${project.date}</td>
    <td class='p-2'>${project.daysLeft}</td>
    <td class='p-2'>${project.profit}</td>
    <td class='p-2 delete-project-btn'>${project.pDelete}</td>
    `;

    projectDisplayEl.append(tr);
  });
}

function deleteProject(id) {
  console.log("Task Deleted");
  const data = JSON.parse(localStorage.getItem("Project Name")) || [];
  const filteredData = data.filter((project) => {
    return project.id != parseInt(id);
  });
  localStorage.setItem("Project Name", JSON.stringify(filteredData));
  renderTables();
}
function formSubmit(event) {
  console.log("form submit function invoked");
  event.preventDefault();

  let projectName = projectNameInput.value.trim();
  let projectType = projectTypeInput.value.trim();
  let hourlyRate = hourlyRateInput.value.trim();
  let dueDate = dueDateInput.value.trim();
  let daysLeft = moment(dueDate, "MM/DD/YYYY").diff(moment(), "days");
  let pProfit = calculateTotalEarnings(hourlyRate, daysLeft);
  let pDelete = " X ";

  setProjectData(
    projectName,
    projectType,
    hourlyRate,
    dueDate,
    daysLeft,
    pProfit,
    pDelete
  );
}

function calculateTotalEarnings(rate, days) {
  console.log("calculate total earnings function invoked");
  let dailyTotal = rate * 8;
  let total = dailyTotal * days;
  return total;
}

submitButton.addEventListener("click", (event) => {
  console.log("The Submit button has been pressed");
  formSubmit(event);
});
deleteButton.forEach((button) => {
  button.addEventListener("click", (event) => {
    deleteProject(event.target.parentElement.id);
  });
});
