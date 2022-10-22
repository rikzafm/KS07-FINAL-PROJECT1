let input = document.querySelector("#inputBox")
let list = document.querySelector("#list")

let savedData = JSON.parse(localStorage.getItem("tasks")) || [];

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
    });
}

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

const clickList = (e) => {
    check(e);
}

savedData.forEach(addItem);
input.addEventListener("keypress", addListAfterKeypress);
list.addEventListener("click", clickList)