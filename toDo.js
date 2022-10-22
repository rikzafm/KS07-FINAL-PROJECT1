let input = document.querySelector("#inputBox")
let list = document.querySelector("#list")

let savedData = JSON.parse(localStorage.getItem("tasks")) || [];
let checkData = JSON.parse(localStorage.getItem("checks")) || [];

const addItem = (txt) => {
    let li = document.createElement("li");
    const del = document.createElement("button");
    li.innerHTML = txt;
    list.insertBefore(li, list.childNodes[0]);
    del.textContent = "X";
    li.appendChild(del);

    del.addEventListener("click", (e) => {
        li.parentNode.removeChild(li);
        savedData = savedData.filter((e) => e !== txt);
        localStorage.setItem("tasks", JSON.stringify(savedData))
        saveCheck();
    });
}

const enterInput = () => {
    let txt = input.value;
    savedData.push(txt);
    localStorage.setItem("tasks", JSON.stringify(savedData));
    input.value = "";
    addItem(txt);
    saveCheck();
}

const check = (e) => {
    if (e.target.tagName == "LI") {
        e.target.classList.toggle("checked");
    }
}

const autoCheck = () => {
    var li = document.querySelectorAll("li");
    checkData.map((e, i) => {
        if(checkData[i]===true){
            li[i].classList.toggle("checked")
        }
    })
}

const saveCheck = () => {
    var li = document.querySelectorAll("li");
    let length = li.length;

    for(let i = 0; i < length; i++){

        if(li[i].classList.contains("checked")){
            checkData[i] = true;
        } else {
            checkData[i] = false;
        }
    }
    localStorage.setItem("checks", JSON.stringify(checkData));
}

const inputEmptyAlert = () => {
    if (input.value === ""){
        alert ("Input is required");
        return true;
    }
    return false;
}

const addListAfterKeypress = (e) => {
    if (e.keyCode === 13 && !inputEmptyAlert()){
        enterInput();
    }
}

const clickList = (e) => {
    check(e);
    saveCheck();
}

input.addEventListener("keypress", addListAfterKeypress);
list.addEventListener("click", clickList)
savedData.forEach(addItem);
autoCheck();
