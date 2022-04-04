window.onload = timer();
let projectDisplayEl = document.querySelector("#project-display");
let projectModalEl = document.querySelector("#project-modal");
let projectFormEl = document.querySelector("#project-form");
let projectNameInput = document.querySelector("#project-name-input");
let projectTypeInput = document.querySelector("#project-type-input");
let hourlyRateInput = document.querySelector("#hourly-rate-input");
let dueDateInput = document.querySelector("#due-date-input");
const submitButton = document.querySelector("#submitButton");
let pTag = document.createElement("p");

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

function setProjectData(name, type, rate, date) {
  const project = {
    name,
    type,
    rate,
    date,
  };

  const data = JSON.parse(localStorage.getItem("Project Name")) || [];
  data.push(project);
  localStorage.setItem("Project Name", JSON.stringify(data));
  renderTables();
}

function renderTables() {
  projectDisplayEl.innerHTML = "";
  const data = JSON.parse(localStorage.getItem("Project Name")) || [];
  data.forEach((project) => {
    const tr = document.createElement("tr");
    tr.innerHTML = `
    <td class="p-2">${project.name}</td>
    <td class='p-2'>${project.type}</td>
    <td class='p-2'>${project.rate}</td>
    <td class='p-2'>${project.date}</td>
    `;
    projectDisplayEl.append(tr);
  });
}

function formSubmit(event) {
  event.preventDefault();

  let projectName = projectNameInput.value.trim();
  let projectType = projectTypeInput.value.trim();
  let hourlyRate = hourlyRateInput.value.trim();
  let dueDate = dueDateInput.value.trim();

  setProjectData(projectName, projectType, hourlyRate, dueDate);
}

submitButton.addEventListener("click", (event) => {
  console.log("The button has been pressed");
  formSubmit(event);
});

renderTables();
