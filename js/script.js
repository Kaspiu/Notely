// Variables
const currentUrl = window.location.href;
let selectId = document.getElementsByClassName("selectId");
let deleteId = document.getElementsByClassName("deleteId");

// On load
// Notes
if (currentUrl.search("notes") != -1) {
  addEventListener("load", () => {
    let Note = document.getElementById("Note");
    Note.style.opacity = "1";

    themeLoad();
    if (darkTheme.search("selected") != -1) {
      darkMode();
    } else if (lightTheme.search("selected") != -1) {
      lightMode();
    }
  });
}

// To-Do List
if (currentUrl.search("to-do-list") != -1) {
  addEventListener("load", () => {
    let ToDo = document.getElementById("ToDo");
    ToDo.style.opacity = "1";

    loadData();

    for (var i = 0; i < selectId.length; i++) {
      selectId[i].addEventListener("click", function () {
        selectTasks(this);
      });
    }

    for (var i = 0; i < deleteId.length; i++) {
      deleteId[i].addEventListener("click", function () {
        deleteTasks(this);
      });
    }

    themeLoad();
    if (darkTheme.search("selected") != -1) {
      darkMode();
    } else if (lightTheme.search("selected") != -1) {
      lightMode();
    }
  });
}

// About
if (currentUrl.search("about") != -1) {
  addEventListener("load", () => {
    let About = document.getElementById("About");
    About.style.opacity = "1";

    themeLoad();
    if (darkTheme.search("selected") != -1) {
      darkMode();
    } else if (lightTheme.search("selected") != -1) {
      lightMode();
    }
  });
}

// Turn Dark Mode
function darkMode() {
  let html = document.getElementById("html");
  let lightModeBtn = document.getElementById("lightModeBtn");
  let darkModeBtn = document.getElementById("darkModeBtn");
  let aLinks = document.getElementsByClassName("aLink");
  let openFileBtn = document.getElementById("openFile");
  let saveFileBtn = document.getElementById("saveFile");
  let saveAsFileBtn = document.getElementById("saveAsFile");
  let closeFileBtn = document.getElementById("closeFile");
  let textArea = document.getElementById("textArea");
  let inputSectionP = document.getElementById("inputSectionP");
  let inputBox = document.getElementById("inputBox");
  let addTaskBtn = document.getElementById("addTask");
  let cancelTaskBtn = document.getElementById("cancelTask");
  let aboutText = document.getElementsByClassName("aboutText");
  let smllScrn = document.getElementById("smllScrn");

  lightModeBtn.classList.remove("selected");
  darkModeBtn.classList.remove("light");
  darkModeBtn.classList.add("selected");
  html.style.backgroundColor = "#171b1c";
  smllScrn.style.color = "#f1f3f4";

  for (var i = 0; i < aLinks.length; i++) {
    aLinks[i].style.color = "#f1f3f4";
  }

  for (var i = 0; i < aboutText.length; i++) {
    aboutText[i].style.color = "#f1f3f4";
  }

  const currentUrl = window.location.href;
  if (currentUrl.search("notes") != -1) {
    openFileBtn.style.color = "#f1f3f4";
    saveFileBtn.style.color = "#f1f3f4";
    saveAsFileBtn.style.color = "#f1f3f4";
    closeFileBtn.style.color = "#f1f3f4";
    textArea.style.color = "#f1f3f4";
    textArea.classList.remove("light");
  } else if (currentUrl.search("to-do-list") != -1) {
    inputSectionP.style.color = "#f1f3f4";
    inputBox.style.color = "#171b1c";
    inputBox.style.backgroundColor = "#f1f3f4";
    addTaskBtn.style.color = "#f1f3f4";
    cancelTaskBtn.style.color = "#f1f3f4";
    listContainer.style.color = "#f1f3f4";
    listContainer.classList.remove("light");
  }

  themeSave();
}

// Turn Light Mode
function lightMode() {
  let html = document.getElementById("html");
  let lightModeBtn = document.getElementById("lightModeBtn");
  let darkModeBtn = document.getElementById("darkModeBtn");
  let aLinks = document.getElementsByClassName("aLink");
  let openFileBtn = document.getElementById("openFile");
  let saveFileBtn = document.getElementById("saveFile");
  let saveAsFileBtn = document.getElementById("saveAsFile");
  let closeFileBtn = document.getElementById("closeFile");
  let textArea = document.getElementById("textArea");
  let inputSectionP = document.getElementById("inputSectionP");
  let inputBox = document.getElementById("inputBox");
  let addTaskBtn = document.getElementById("addTask");
  let cancelTaskBtn = document.getElementById("cancelTask");
  let listContainer = document.getElementById("listContainer");
  let aboutText = document.getElementsByClassName("aboutText");
  let smllScrn = document.getElementById("smllScrn");

  lightModeBtn.classList.add("selected");
  darkModeBtn.classList.remove("selected");
  darkModeBtn.classList.add("light");
  html.style.backgroundColor = "#f1f3f4";
  smllScrn.style.color = "#171b1c";

  for (var i = 0; i < aLinks.length; i++) {
    aLinks[i].style.color = "#171b1c";
  }

  for (var i = 0; i < aboutText.length; i++) {
    aboutText[i].style.color = "#171b1c";
  }

  const currentUrl = window.location.href;
  if (currentUrl.search("notes") != -1) {
    openFileBtn.style.color = "#171b1c";
    saveFileBtn.style.color = "#171b1c";
    saveAsFileBtn.style.color = "#171b1c";
    closeFileBtn.style.color = "#171b1c";
    textArea.style.color = "#171b1c";
    textArea.classList.add("light");
  } else if (currentUrl.search("to-do-list") != -1) {
    inputSectionP.style.color = "#171b1c";
    inputBox.style.color = "#f1f3f4";
    inputBox.style.backgroundColor = "#171b1c";
    addTaskBtn.style.color = "#171b1c";
    cancelTaskBtn.style.color = "#171b1c";
    listContainer.style.color = "#171b1c";
    listContainer.classList.add("light");
  }

  themeSave();
}

// Open file explorer to display text from selected file
async function openFiles() {
  let textArea = document.getElementById("textArea");
  let saveFile = document.getElementById("saveFile");
  let closeFile = document.getElementById("closeFile");

  [fileHandle] = await window.showOpenFilePicker();
  let fileData = await fileHandle.getFile();
  let text = await fileData.text();
  textArea.innerText = text;
  saveFile.style.display = "flex";
  closeFile.style.display = "flex";
}

// Save file
async function saveFiles() {
  let textArea = document.getElementById("textArea");

  let stream = await fileHandle.createWritable();
  await stream.write(textArea.innerText);
  await stream.close();
}

// Save file as (can be new file)
async function saveAsFiles() {
  const opts = {
    types: [
      {
        description: "Text file",
        accept: { "text/plain": [".txt"] },
      },
    ],
  };
  fileHandle = await window.showSaveFilePicker(opts);
  saveFiles();
}

// Close opened files
async function closeFiles() {
  let textArea = document.getElementById("textArea");
  let saveFile = document.getElementById("saveFile");
  let closeFile = document.getElementById("closeFile");

  textArea.innerText = "";
  saveFile.style.display = "none";
  closeFile.style.display = "none";
}

// Add new task to to-do list
function addTasks() {
  let inputBox = document.getElementById("inputBox");
  let listContainer = document.getElementById("listContainer");

  if (inputBox.value === "") {
    alert("You must write something!");
  } else {
    let li = document.createElement("li");
    let div = document.createElement("div");
    div.innerHTML = '<i class="bx bx-circle"></i>' + `<p>${inputBox.value}</p>`;
    div.classList.add("listContent");
    listContainer.appendChild(li);
    div.addEventListener("click", function () {
      selectTasks(this);
    });
    div.classList.add("selectId");
    li.appendChild(div);
    let a = document.createElement("a");
    a.innerHTML = "<i class='bx bx-x'></i>";
    a.classList.add("deleteId");
    a.addEventListener("click", function () {
      deleteTasks(this);
    });
    li.appendChild(a);
  }
  inputBox.value = "";
  saveData();
}

// Cancel adding task
function cancelTasks() {
  let inputBox = document.getElementById("inputBox");
  inputBox.value = "";
}

// When task clicked it will be selected as completed
function selectTasks(element) {
  let parent = element.parentNode;
  parent.classList.add("checked");
  let checkedMark = parent.children[0];
  checkedMark.innerHTML = checkedMark.innerHTML.replace(
    '<i class="bx bx-circle"></i>',
    '<i class="bx bxs-check-circle"></i>'
  );
  saveData();
}

// Delete task
function deleteTasks(element) {
  let parent = element.parentNode;
  parent.remove();
  saveData();
}

// Save task data
function saveData() {
  let listContainer = document.getElementById("listContainer");

  localStorage.setItem("listData", listContainer.innerHTML);
}

// Load saved data
function loadData() {
  let listContainer = document.getElementById("listContainer");

  listContainer.innerHTML = localStorage.getItem("listData");
}

// Save theme data
function themeSave() {
  let lightModeBtn = document.getElementById("lightModeBtn");
  let darkModeBtn = document.getElementById("darkModeBtn");

  localStorage.setItem("lightData", lightModeBtn.classList);
  localStorage.setItem("darkData", darkModeBtn.classList);
}

// Load saved theme data
function themeLoad() {
  lightTheme = localStorage.getItem("lightData");
  darkTheme = localStorage.getItem("darkData");
}
