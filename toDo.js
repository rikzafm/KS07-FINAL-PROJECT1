const addItem = (txt) => {
    let li = document.createElement("li");
    const del = document.createElement("button");
    li.innerHTML = txt;
    list.insertBefore(li, list.childNodes[0]);
    del.textContent = "X";
    del.classList.add("fas", "fas-trash-alt");
    li.appendChild(del);
    del.addEventListener("click", (e) => {
        li.parentNode.removeChild(li);
        savedData = savedData.filter((e) => e !== txt);
        localStorage.setItem("tasks", JSON.stringify(savedData))
    });
}

let input = document.querySelector("#inputBox")
let list = document.querySelector("#list")

let savedData = JSON.parse(localStorage.getItem("tasks")) || [];

savedData.forEach(addItem);


const enterInput = () => {
    let txt = input.value;
    if (txt === ""){
        alert ("Please write something!");
    } else {
        savedData.push(txt);
        localStorage.setItem("tasks", JSON.stringify(savedData));
        input.value = "";
        addItem(txt);
    }
}

const check = (e) => {
    if (e.target.tagName == "LI") {
        e.target.classList.toggle("checked");
    }
}

const addListAfterKeypress = (e) => {
    if (input.value.length > 0 && e.keyCode === 13){
        enterInput();
    }
}

input.addEventListener("keypress", addListAfterKeypress);