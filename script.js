// DOM elements
let date = document.querySelector(".due-date input");
let Savebtn = document.querySelector(".save");
let Clear = document.querySelector(".clear");
let taskName = document.querySelector(".input-task");
let description = document.querySelector("textarea");
let Select = document.getElementById("selecT");

// Display elements
let addTask = document.querySelector(".add-taskbutton");
let taskShowName = document.querySelector(".task-name span");
let taskNumber = document.querySelector(".task-name div");
let display = document.querySelector(".task-display");
let tasks = document.getElementsByClassName("task");

///add list elements
let listBtn = document.querySelector(".list-btn");
let listText = document.querySelector(".list-add");
let listAddBtn = document.querySelector(".add-list");
let listDisplay = document.querySelector(".list-items");

/////menu items
let upcoming = document.getElementById("upcoming");
let today = document.getElementById("Today");
let all = document.getElementById("All");
let pending = document.getElementById("Pending");
let stickywal = document.getElementById("Stickywall");

let editIndex;

////sections
let sectionOne = document.getElementById("menuboard");
let sectionTwo = document.getElementById("taskbord");
let sectionThree = document.getElementById("newtaskboard");
let sectionFour = document.querySelector(".sticky-wall");

////Stick wall
let swbtnicon = document.querySelector(".swbtnicon");
let swtextarea = document.querySelector(".swtextarea");
let infomer = document.querySelector(".infomer");
let swShowBord = document.querySelector(".sw-showbord");
let swdlt = document.querySelector(".swdlt");
let swback = document.querySelector(".back-btn");
let swclose = document.querySelector(".sw-header .close-btn");
let swEdit = document.querySelector("edtSw");

//////media in task
let taskClose = document.querySelector(".task_head .close-btn");
let med_750 = window.matchMedia("(max-width: 850px)");
let med_500 = window.matchMedia("(max-width: 500px)");
let menuBar = document.querySelector(".menuBar");
let menuClose = document.querySelector(".menu_head .close-btn");

///curent day
let curentDay = function() {
    let currentDate = new Date()
        .toJSON()
        .slice(0, 10)
        .split("-")
        .reverse()
        .join("/");
    return currentDate;
};

date.value = curentDay().split("/").reverse().join("-");
// Data structure
let mainArray = {
    Task: { Name: [], description: [], List: [], Date: [], status: [] },
    List: { Name: ["Personal", "Work"], Color: ["#F9ACA7", "#FFD767"] },
    StickyWall: { Text: [], Color: [] },
};

//color array
let myColor = [
    "#F9ACA7",
    "#FFD767",
    "#8cec55",
    "#f55159",
    "#a2aa90",
    "#6896ec",
    "#c36dfc",
    "#f06e99",
    "#baf796",
    "#7df0f8",
];

// Function to add items
function addItems() {
    let taskN = taskName.value.charAt(0).toUpperCase() + taskName.value.slice(1);
    let Samecheck = "";
    mainArray.Task.Name.forEach((val) => {
        if (taskN == val) {
            Samecheck = "flag";
        }
    });
    if (Savebtn.innerHTML == "Add task") {
        if (taskN) {
            if (Samecheck == "flag") {
                alert("Task Name already exist");
                taskName.focus();
                return;
            }
            mainArray.Task.Name.push(taskN);
            mainArray.Task.description.push(description.value);
            mainArray.Task.List.push(Select.value);
            mainArray.Task.Date.push(date.value.split("-").reverse().join("/"));
            mainArray.Task.status.push("uncomplited");
            allShowBord();
            clearAll();
            showListDisplay();
            setMenuItemNum();
            setlocal();
            Samecheck = "";
        } else {
            alert("No text found");
        }
    } else {
        if (taskN) {
            if (Samecheck == "flag" && mainArray.Task.Name[editIndex] != taskN) {
                alert("Task Name already exist");
                taskName.focus();
                return;
            }
            mainArray.Task.Name[editIndex] = taskN;
            mainArray.Task.description[editIndex] = description.value;
            mainArray.Task.List[editIndex] = Select.value;
            mainArray.Task.Date[editIndex] = date.value.split("-").reverse().join("/");
            allShowBord();
            clearAll();
            showListDisplay();
            setMenuItemNum();
            setlocal();
            Samecheck = "";
        } else {
            alert("No text found");
        }
    }
    hideTaskbar();
}

// Function to display all items
function ShowBord(Datas, mainName) {
    let limit = Datas.Task.Name.length;
    let dayCode = curentDay().split("/").reverse().join("");
    display.innerHTML = "";

    for (let i = 0; i < limit; i++) {
        let addClasss = "";
        let checkBox = "";
        let pedingRed = "";
        let indlst = mainArray.List.Name.indexOf(Datas.Task.List[i]);
        let dateCode = Datas.Task.Date[i].split("/").reverse().join("");

        if (dayCode > dateCode) {
            pedingRed = "pedingRed";
        }

        if (Datas.Task.status[i] === "complited") {
            addClasss = "strike";
            checkBox = "checked";
        }

        let newItems = `<div class="task ${pedingRed} ${addClasss}">
            <div class="task-name-bord">
                <input  type="checkbox" ${checkBox} style="background-color: #41B883;">
                <p title="${Datas.Task.description[i]}">${Datas.Task.Name[i]}</p>
                <div class="arrow"></div>
            </div>
            <div class="details">
                <div class="hideD">
                    <div class="date">
                        <div></div>
                        <p>${Datas.Task.Date[i]}</p>
                    </div>
                    <div class="list-name">
                        <div style="background-color:${mainArray.List.Color[indlst]};"></div>
                        <p>${Datas.Task.List[i]}</p>
                    </div>
                    <div class="dltbtn" title="Delete"></div>
                    <div class="edtbtn" title="Edit"></div>
                </div>
            </div>
        </div>`;

        display.innerHTML += newItems;
    }

    taskShowName.textContent = mainName;
    taskNumber.innerHTML = limit;
    hideMenu();
}

////clear all date from the Task Form
function clearAll() {
    taskName.value = "";
    description.value = "";
    date.value = curentDay().split("/").reverse().join("-");
    Select.selectedIndex = 0;
    taskName.focus();
    Savebtn.innerHTML = "Add task";
    if (window.matchMedia("(max-width: 850px)").matches) {
        sectionThree.removeAttribute("class");
        sectionThree.style.display = "block";
    }
}

//// set Selects' options
function setList() {
    Select.innerHTML = "";
    mainArray.List.Name.forEach((name) => {
        Select.innerHTML += `<option value="${name}">${name}</option>`;
    });
}

////to hide the Add list button when click
function showTextBox() {
    listAddBtn.style.visibility = "hidden";
    listBtn.style.display = "block";
    listText.style.display = "block";
    listText.focus();
}

////To add new list item to mainArray.Task
function addList() {
    let text = listText.value;
    if (text) {
        let listInd = mainArray.List.Name.length;
        let indNum = listInd % 10;
        mainArray.List.Name.push(text.charAt(0).toUpperCase() + text.slice(1));
        mainArray.List.Color.push(myColor[indNum]);
        setList();
        listText.value = "";
        listBtn.style.display = "none";
        listText.style.display = "none";
        listAddBtn.style.visibility = "visible";
        showListDisplay();
        setlocal();
    } else alert("No text found");
}

///// To set number inside list items
function getNewArray(name) {
    let tagArray = [];
    mainArray.Task.List.forEach((tag) => {
        if (name == tag) {
            tagArray.push(tag);
        }
    });
    return tagArray;
}

/////add items to list display
function showListDisplay() {
    listDisplay.innerHTML = "";
    mainArray.List.Name.forEach((name, ind) => {
        let tagNum = getNewArray(name);
        listDisplay.innerHTML += `<a class="lists"><div style="background-color:${mainArray.List.Color[ind]};" class="color"></div class="listItem">${name}<div class="number">${tagNum.length}</div></a>`;
    });
}

////When click list items to show
function tagToShow(e) {
    if (e.target.classList[0] === "lists") {
        let tragetval = e.target.childNodes[1].textContent;
        let Listarray = {
            Task: { Name: [], description: [], List: [], Date: [], status: [] },
        };
        mainArray.Task.List.forEach((val, ind) => {
            if (tragetval == val) {
                Listarray.Task.Name.push(mainArray.Task.Name[ind]);
                Listarray.Task.description.push(mainArray.Task.description[ind]);
                Listarray.Task.List.push(val);
                Listarray.Task.Date.push(mainArray.Task.Date[ind]);
                Listarray.Task.status.push(mainArray.Task.status[ind]);
            }
        });
        ShowBord(Listarray, tragetval);
    }
}

////when click Today
function todayShowBord() {
    let day = curentDay();
    let Listarray = {
        Task: { Name: [], description: [], List: [], Date: [], status: [] },
    };
    mainArray.Task.Date.forEach((val, ind) => {
        if (day == val) {
            Listarray.Task.Name.push(mainArray.Task.Name[ind]);
            Listarray.Task.description.push(mainArray.Task.description[ind]);
            Listarray.Task.List.push(mainArray.Task.List[ind]);
            Listarray.Task.Date.push(mainArray.Task.Date[ind]);
            Listarray.Task.status.push(mainArray.Task.status[ind]);
        }
    });
    ShowBord(Listarray, "Today");
    return Listarray.Task.Name.length;
}

///when click upcoming
function upcomingShowBord() {
    let dayCode = curentDay().split("/").reverse().join("");
    let Listarray = {
        Task: { Name: [], description: [], List: [], Date: [], status: [] },
    };
    mainArray.Task.Date.forEach((val, ind) => {
        let dateCode = val.split("/").reverse().join("");
        if (dayCode < dateCode) {
            Listarray.Task.Name.push(mainArray.Task.Name[ind]);
            Listarray.Task.description.push(mainArray.Task.description[ind]);
            Listarray.Task.List.push(mainArray.Task.List[ind]);
            Listarray.Task.Date.push(mainArray.Task.Date[ind]);
            Listarray.Task.status.push(mainArray.Task.status[ind]);
        }
    });
    ShowBord(Listarray, "Upcoming");
    return Listarray.Task.Name.length;
}

///when click pending
function pendingShowBord() {
    let dayCode = curentDay().split("/").reverse().join("");
    let Listarray = {
        Task: { Name: [], description: [], List: [], Date: [], status: [] },
    };
    mainArray.Task.Date.forEach((val, ind) => {
        let dateCode = val.split("/").reverse().join("");
        if (dayCode > dateCode) {
            Listarray.Task.Name.push(mainArray.Task.Name[ind]);
            Listarray.Task.description.push(mainArray.Task.description[ind]);
            Listarray.Task.List.push(mainArray.Task.List[ind]);
            Listarray.Task.Date.push(mainArray.Task.Date[ind]);
            Listarray.Task.status.push(mainArray.Task.status[ind]);
        }
    });
    ShowBord(Listarray, "Pending");
    return Listarray.Task.Name.length;
}

///when click show all
function allShowBord() {
    ShowBord(mainArray, "All");
    return mainArray.Task.Name.length;
}

////set menu items numbers
function setMenuItemNum() {
    document.querySelector("#Pending div").innerText = pendingShowBord();
    document.querySelector("#upcoming div").innerText = upcomingShowBord();
    document.querySelector("#Today div").innerText = todayShowBord();
    document.querySelector("#All div").innerText = allShowBord();
    document.querySelector("#Stickywall div").innerHTML =
        mainArray.StickyWall.Text.length;
}

////Tab control to next elemnet in task
function focusNext(e, nextElementId) {
    if (e.keyCode === 13) {
        document.querySelector("." + nextElementId).focus();
    }
}

////Stick Wall
function stickWall() {
    menuboard.style.display = "none";
    sectionTwo.style.display = "none";
    sectionThree.style.display = "none";
    sectionFour.style.display = "block";
    sectionFour.style.display = "flex";
    swShowAll();
    menuBar.style.display = "none";
}

function swadd() {
    swtextarea.style.display = "block";
    infomer.style.display = "block";
    swbtnicon.style.display = "none";
    swtextarea.focus();
}

function swSave() {
    swtextarea.style.display = "none";
    infomer.style.display = "none";
    swbtnicon.style.display = "block";
    if (swtextarea.value) {
        let clInd = mainArray.StickyWall.Text.length % 10;
        mainArray.StickyWall.Text.push(
            swtextarea.value.charAt(0).toUpperCase() + swtextarea.value.slice(1)
        );
        mainArray.StickyWall.Color.push(myColor[clInd]);
        swShowAll();
        setlocal();
    } else {
        alert("No date found");
    }
    swtextarea.value = "";
}

function swShowAll() {
    swShowBord.innerHTML = "";
    mainArray.StickyWall.Text.forEach((val, ind) => {
        swShowBord.innerHTML += `<div style="background-color:${mainArray.StickyWall.Color[ind]};" class="switems">
    <p class="switemtext">${val}</p>
    <p hidden class="swIndex">${ind}</p>
    <div title="Delete" class="swdlt"></div>
    <div title="Edit" class="swedt"></div>
    <div class="colorsection">
    <div class="coloricon" title="Change color" ></div>
    <div class="colormain">
    <div  class="clflex">
        <div style="background-color: #F9ACA7; color:#F9ACA7;" class="clr">#F9ACA7</div>
        <div style="background-color: #FFD767; color:#FFD767;" class="clr">#FFD767</div>
        <div style="background-color: #8cec55; color:#8cec55;" class="clr">#8cec55</div>
        <div style="background-color: #f55159; color:#f55159;" class="clr">#f55159</div>
        <div style="background-color: #a2aa90; color:#a2aa90;" class="clr">#a2aa90</div>
        <div style="background-color: #6896ec; color:#6896ec;" class="clr">#6896ec</div>
        <div style="background-color: #c36dfc; color:#c36dfc;" class="clr">#c36dfc</div>
        <div style="background-color: #f06e99; color:#f06e99;" class="clr">#f06e99</div>
        <div style="background-color: #baf796; color:#baf796;" class="clr">#baf796</div>
        <div style="background-color: #7df0f8; color:#7df0f8;" class="clr">#7df0f8</div>
    </div>
</div>
</div>
<textarea class="edtSw" ></textarea>
    </div>`;
    });
}

function deleteSw(e) {
    if (e.target.className === "swdlt" && confirm("Are you sure?") == true) {
        let dltInd = e.target.previousElementSibling.innerText;
        mainArray.StickyWall.Text.splice(dltInd, 1);
        mainArray.StickyWall.Color.splice(dltInd, 1);
        swShowAll();
        setlocal();
    }
    if (e.target.className === "clr") {
        let clrInd =
            e.target.parentElement.parentElement.parentElement.previousElementSibling.previousElementSibling
            .previousElementSibling.innerText;
        mainArray.StickyWall.Color[clrInd] = e.target.innerHTML;
        swShowAll();
        setlocal();
    }
    if (e.target.className === "swedt") {
        let txtcont = e.target.previousElementSibling.previousElementSibling.previousElementSibling;
        let text = txtcont.innerText;
        txtcont.innerHTML = "";
        e.target.nextElementSibling.nextElementSibling.style.display = "block";
        e.target.nextElementSibling.nextElementSibling.innerText = text;
        e.target.nextElementSibling.nextElementSibling.focus();
    }
}

function backToMain() {
    sectionFour.style.display = "none";
    menuboard.style.display = "block";
    sectionTwo.style.display = "block";
    menuBar.style.display = "block";
    hideTaskbar();
    hideMenu();
    setMenuItemNum();
}

function setlocal() {
    let localSave = JSON.stringify(mainArray);
    localStorage.setItem("allData", localSave);
}

function hideTaskbar() {
    if (med_750.matches) {
        sectionThree.style.display = "none";
    } else {
        sectionThree.style.display = "block";
    }
}

function hideMenu() {
    if (med_500.matches) {
        sectionOne.style.display = "none";
        menuBar.style.display = "block";
    } else {
        sectionOne.style.display = "block";
        menuBar.style.display = "none";
    }
}

// Event listener for clicks in the display section
display.addEventListener("click", function(e) {
    let HideShow = e.target.parentElement.nextElementSibling;
    let check = e.target.parentElement.innerText;

    // Hide and show of details div and arrow changing
    if (e.target.classList[0] === "arrow" && HideShow.style.display !== "block") {
        HideShow.style.cssText = "display : block;";
        e.target.style.cssText = "background-image: url(images/down-arrow.png);";
    } else if (
        e.target.classList[0] === "arrow" &&
        HideShow.style.display !== "none"
    ) {
        HideShow.style.cssText = "display : none;";
        e.target.style.cssText = "background-image: url(images/right-arrow.png);";
    }

    // Strike to completed task & unstrike to uncomplited task
    if (e.target.checked === true) {
        e.target.parentElement.parentElement.classList.add("strike");
        mainArray.Task.Name.forEach((name, index) => {
            if (name == check) {
                mainArray.Task.status[index] = "complited";
                setlocal();
            }
        });
    } else if (e.target.checked === false) {
        e.target.parentElement.parentElement.classList.remove("strike");
        mainArray.Task.Name.forEach((name, index) => {
            if (name == check) {
                mainArray.Task.status[index] = "uncomplited";
                setlocal();
            }
        });
    }

    // Delete itms from display
    if (e.target.classList[0] === "dltbtn" && confirm("Are you sure?") == true) {
        let checkName =
            e.target.parentElement.parentElement.previousElementSibling.children[1]
            .innerHTML;
        let indNum = mainArray.Task.Name.indexOf(checkName);
        mainArray.Task.Name.splice(indNum, 1);
        mainArray.Task.description.splice(indNum, 1);
        mainArray.Task.List.splice(indNum, 1);
        mainArray.Task.Date.splice(indNum, 1);
        mainArray.Task.status.splice(indNum, 1);
        allShowBord();
        showListDisplay();
        setMenuItemNum();
        setlocal();
    }

    // Edit itms from display
    if (e.target.classList[0] === "edtbtn") {
        let checkName =
            e.target.parentElement.parentElement.previousElementSibling.children[1]
            .innerHTML;
        let indNum = mainArray.Task.Name.indexOf(checkName);
        let indlst = mainArray.List.Name.indexOf(mainArray.Task.List[indNum]);
        taskName.value = mainArray.Task.Name[indNum];
        description.value = mainArray.Task.description[indNum];
        Select.selectedIndex = indlst;
        date.value = mainArray.Task.Date[indNum].split("/").reverse().join("-");
        Savebtn.innerText = "Save changes";
        editIndex = indNum;
        if (window.matchMedia("(max-width: 850px)").matches) {
            sectionThree.removeAttribute("class");
            sectionThree.style.display = "block";
        }
        taskName.focus();
    }
});

/// Stick wall edit save
function swEdtSave(e) {
    if (e.target.className == "edtSw") {
        let ediText = e.target.value;
        let ediInd = e.target.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling.innerHTML;
        mainArray.StickyWall.Text[ediInd] = ediText.charAt(0).toUpperCase() + ediText.slice(1);
        console.log(mainArray.StickyWall.Text[ediInd]);
        swShowAll();
        setlocal();
    };
};


// Event listener for delete button
Savebtn.addEventListener("click", addItems);
addTask.addEventListener("click", clearAll);
listBtn.addEventListener("click", addList);
listText.addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
        addList();
    }
});
listAddBtn.addEventListener("click", showTextBox);
listDisplay.addEventListener("click", tagToShow);
all.addEventListener("click", allShowBord);
today.addEventListener("click", todayShowBord);
upcoming.addEventListener("click", upcomingShowBord);
pending.addEventListener("click", pendingShowBord);
stickywal.addEventListener("click", stickWall);
taskName.addEventListener("focus", function() {
    sectionThree.style.backgroundColor = "rgb(217 217 217)";
});
taskName.addEventListener("focusout", function() {
    sectionThree.style.backgroundColor = "rgb(245 242 242)";
});

/////Stickwall
swbtnicon.addEventListener("click", function() {
    swadd()
});
swtextarea.addEventListener("dblclick", swSave);
swtextarea.addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
        swSave();
    }
});
swShowBord.addEventListener("click", deleteSw);
swShowBord.addEventListener("dblclick", swEdtSave);
swback.addEventListener("click", backToMain);
swclose.addEventListener("click", backToMain);
taskClose.addEventListener("click", function() {
    sectionThree.style.display = "none";
});

/////media
med_750.addListener(hideTaskbar);
med_500.addListener(hideMenu);
menuBar.addEventListener("click", () => {
    sectionOne.style.display = "block";
});
menuClose.addEventListener("click", function() {
    sectionOne.style.display = "none";
});

// call local storage
function callLocalstroage() {
    if (localStorage.getItem("allData")) {
        let lget = localStorage.getItem("allData");
        mainArray = JSON.parse(lget);
        setMenuItemNum();
    }
}
hideTaskbar();
callLocalstroage();
showListDisplay();
setList();



/////////Service worker registration

if ("serviceWorker" in navigator) {
    navigator.serviceWorker.register("srworker.js").then(registration => {
        console.log("Service worker registered")
        console.log(registration);
    }).catch(error => {
        console.log("Service worker error")
        console.log(error)
    })
} else {
    alert("Service worker not working")
}
