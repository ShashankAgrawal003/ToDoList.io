

const container = document.querySelector('.container');
var inputValue = document.querySelector('.input');

const add = document.querySelector('.add');
const completed = document.querySelector('.completed');
const taskVector = document.getElementById('personal-vector');

function home() {
    isTab = "home";
    window.sessionStorage.setItem("isTab", isTab);
} function tasks() {
    isTab = "tasks";
    window.sessionStorage.setItem("isTab", isTab);
}

if (window.localStorage.getItem("personalTodos") == undefined) {
    var personalTodos = [];

    window.localStorage.setItem("personalTodos", JSON.stringify(personalTodos));
}

if (window.localStorage.getItem("personalCompletedArray") == undefined) {
    var personalCompletedArray = [];

    window.localStorage.setItem("personalCompletedArray", JSON.stringify(personalCompletedArray));
}
if (window.localStorage.getItem("personalStarArray") == undefined) {
    var personalStarArray = [];

    window.localStorage.setItem("personalStarArray", JSON.stringify(personalStarArray));
}

var personalTodosEX = window.localStorage.getItem("personalTodos");
var personalTodos = JSON.parse(personalTodosEX);



var personalStarArrayEX = window.localStorage.getItem("personalStarArray");
var personalStarArray = JSON.parse(personalStarArrayEX);

var completedEX = window.localStorage.getItem("personalCompletedArray");
var personalCompletedArray = JSON.parse(completedEX);
class item {
    constructor(name, divContainer) {
        this.createItem(name, divContainer);
    }
    createItem(name, divContainer) {
        var itemBox = document.createElement('div');
        itemBox.classList.add('item');


        var input = document.createElement('input');
        input.type = "text";
        input.disabled = true;
        input.value = name;
        input.classList.add('item_input');

        var checkForCompleted = document.createElement('INPUT');
        checkForCompleted.setAttribute("type", "checkbox");
        checkForCompleted.classList.add('checkbox');




        // change function to check important
        var arrayName;
        if (divContainer === "completed") {
            checkForCompleted.setAttribute("checked", "true");
            arrayName = "personalCompletedArray";
        } else {
            arrayName = "personalTodos";
        }
        checkForCompleted.addEventListener('click', () => this.complete(checkForCompleted, itemBox, input, arrayName));


        var star = document.createElement('button');
        star.classList.add('star');

        star.innerHTML = '<i class="material-icons star_rate">star_rate</i>';
        // change function to mark important
        star.addEventListener('click', () => this.star(star, name, arrayName));

        var edit = document.createElement('button');
        edit.classList.add('edit');
        edit.innerHTML = '<i class="material-icons create">create</i>';
        edit.addEventListener('click', () => this.edit(input, name, edit, arrayName));

        var remove = document.createElement('button');
        remove.classList.add('remove');
        remove.innerHTML = '<i class="material-icons delete">delete</i>';

        remove.addEventListener('click', () => this.remove(itemBox, name, arrayName));

       document.querySelector("." + `${divContainer}`).appendChild(itemBox);
        itemBox.appendChild(checkForCompleted);
        itemBox.appendChild(input);

        itemBox.appendChild(edit);
        itemBox.appendChild(star);
        itemBox.appendChild(remove);

    }

    edit(input, name, edit, arrayName) {
        if (input.disabled == true) {
            input.disabled = !input.disabled;
            edit.innerHTML = '<i class="material-icons create" style="color:blue;">create</i>';
            window.addEventListener('keydown', (e) => {
                if (e.which == 13) {
                    // this.edit(input, name, arrayName, edit);
                    input.disabled = !input.disabled;
                    edit.innerHTML = '<i class="material-icons create" style="color:grey;">create</i>';
                    if (arrayName === "personalTodos") {
                        let indexof = personalTodos.indexOf(name);
                        personalTodos[indexof] = input.value;
                        window.localStorage.setItem(`${arrayName}`, JSON.stringify(personalTodos));
                    } else {
                        let indexof = personalCompletedArray.indexOf(name);
                        personalCompletedArray[indexof] = input.value;
                        window.localStorage.setItem(`${arrayName}`, JSON.stringify(personalCompletedArray));
                    }
                }
            });
        }
        else {
            input.disabled = !input.disabled;
            edit.innerHTML = '<i class="material-icons create" style="color:grey;">create</i>';
            if (arrayName === "personalTodos") {
                let indexof = personalTodos.indexOf(name);
                personalTodos[indexof] = input.value;
                window.localStorage.setItem(`${arrayName}`, JSON.stringify(personalTodos));
            } else {
                let indexof = personalCompletedArray.indexOf(name);
                personalCompletedArray[indexof] = input.value;
                window.localStorage.setItem(`${arrayName}`, JSON.stringify(personalCompletedArray));
            }

        }
    }

    star(star, name, arrayName) {
        let index = personalTodos.indexOf(name);
        if (star.innerHTML === '<i class="material-icons star_rate">star_rate</i>') {
            personalStarArray[index] = 1;
            window.localStorage.setItem("personalStarArray", JSON.stringify(personalStarArray));
            star.innerHTML = '<i class="material-icons star_rate" style="color:#FFBA00;">star_rate</i>';

        }
        else {
            personalStarArray[index] = 0;
            window.localStorage.setItem("personalStarArray", JSON.stringify(personalStarArray));
            star.innerHTML = '<i class="material-icons star_rate">star_rate</i>';
        }


    }

    remove(itemBox, name, arrayName) {

        itemBox.parentNode.removeChild(itemBox);

        if (arrayName === "personalTodos") {
            let index = personalTodos.indexOf(name);
            console.log(index);
            console.log(name);
            personalTodos.splice(index, 1);
            personalStarArray.splice(index, 1);

            window.localStorage.setItem("personalTodos", JSON.stringify(personalTodos));
            window.localStorage.setItem("personalStarArray", JSON.stringify(personalStarArray));

        } else {
            let index = personalCompletedArray.indexOf(name);
            personalCompletedArray.splice(index, 1);

            window.localStorage.setItem("personalCompletedArray", JSON.stringify(personalCompletedArray));

            if (personalCompletedArray.length <= 0) {
                document.querySelector("h2").innerHTML = "";
            }

        }
        if (personalTodos.length > 0 || personalCompletedArray.length > 0) {
            taskVector.style.display = 'none';
        }
        else {
            taskVector.style.display = 'block';
        }


    }

    complete(checkForCompleted, itemBox, input, arrayName) {

        if (checkForCompleted.checked) {

            this.remove(itemBox, input.value, "personalTodos");
            new item(input.value, "completed");
            personalCompletedArray.push(input.value);

            window.localStorage.setItem("personalCompletedArray", JSON.stringify(personalCompletedArray));

            input.style.textDecoration = "line-through";
            itemBox.style.opacity = 0.5;

        } else {
            input.style.textDecoration = "none";
            itemBox.style.opacity = 1;
            this.remove(itemBox, input.value, "personalCompletedArray");
            new item(input.value, "container");
            personalTodos.push(input.value);

            window.localStorage.setItem("personalTodos", JSON.stringify(personalTodos));

        }
        if (personalCompletedArray.length > 0) {
            document.querySelector("h2").innerHTML = "Completed";
        }
        else {
            document.querySelector("h2").innerHTML = "";
        }
        if (personalTodos.length > 0 || personalCompletedArray.length > 0) {
            taskVector.style.display = 'none';
        }
        else {
            taskVector.style.display = 'block';
        }
    }
}

add.addEventListener('click', check);
inputValue.addEventListener('keydown', (e) => {
    if (e.which == 13) {
        check();
    }
})



function check() {
    if (inputValue.value != "") {
        showSuccess(inputValue);
        new item(inputValue.value, "container");
        personalTodos.push(inputValue.value);
        personalStarArray.push(0);
        window.localStorage.setItem("personalTodos", JSON.stringify(personalTodos));
        window.localStorage.setItem("personalStarArray", JSON.stringify(personalStarArray));
        inputValue.value = "";
    } else {
        showError(inputValue, "Enter Task");
    }
    if (personalTodos.length > 0 || personalCompletedArray.length > 0) {
        taskVector.style.display = 'none';
    }
    else {
        taskVector.style.display = 'block';
    }


}
function showError(input, msg) {
    const formControl = input.parentNode;
    formControl.className = 'input-group error';
    const small = formControl.querySelector('small');
    console.log(formControl.className);
    small.innerHTML = msg;
}
function showSuccess(input) {
    const formControl = input.parentNode;
    formControl.className = `imput-group`;
    console.log(formControl.className);
}

if (personalTodos.length > 0 || personalCompletedArray.length > 0) {
    taskVector.style.display = 'none';
}
else {
    taskVector.style.display = 'block';
}

for (var v = 0; v < personalTodos.length; v++) {
    new item(personalTodos[v], "container");

    
}

for (var v = 0; v < personalCompletedArray.length; v++) {
    if (personalCompletedArray.length > 0) {
        document.querySelector("h2").innerHTML = "Completed";
    }
    else {
        document.querySelector("h2").innerHTML = "";
    }
    new item(personalCompletedArray[v], "completed");
}
console.log(container);
var abc = document.querySelectorAll(".item");
console.log(abc);
for (var v = 0; v < personalStarArray.length; v++) {
    if (personalStarArray[v] === 1) {
        console.log(abc[v].childNodes[3]);
        var xyz = abc[v].childNodes[3];

        xyz.innerHTML = '<i class="material-icons star_rate" style="color:#FFBA00;">star_rate</i>';
    }

}
var boxes = document.querySelectorAll("input[type='checkbox']");


