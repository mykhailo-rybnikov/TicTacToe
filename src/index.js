let way = 0;
let take_step = []
let cancel_step = []
let a = NaN;

let undoButton = document.querySelector(".undo-btn");
let redoButton = document.querySelector(".redo-btn");
let restartButton = document.querySelector(".restart-btn");
undoButton.addEventListener("click", undo);
redoButton.addEventListener("click", redo);
restartButton.addEventListener("click", gameRestart);

giveClick();

if (localStorage.length == 0){save();}
else{
    take_step = JSON.parse(localStorage.getItem("ticTacToeMoves"))[0],cancel_step = JSON.parse(localStorage.getItem("ticTacToeMoves"))[1];
    takeStep();
}


function click(event){

    cancel_step = []

    if (event.target.className == "cell"){
        if(way%2 == 0){
            event.target.className = "cell r";
        }
        else{
            event.target.className = "cell ch"
        }
        way++;
        take_step.push({class:event.target.className,id:event.target.id});

        buttonChecker();
        winnerChecker();
        save();
    }
}

function winnerChecker(){

    function addWinClass(arr,type ){
        arr.forEach(element => alls[element].className += ' win '+type);
    }

    let alls = document.querySelectorAll('[data-id]');

    arr = []
    for(let i = 0; i<COUNTER_OF_COLUMNS*COUNTER_OF_ROWS; i+=COUNTER_OF_COLUMNS+1){arr.push(i);}
    win = arr.every(elem => alls[elem].className === alls[arr[0]].className && alls[elem].className !== "cell");
    if (win){addWinClass(arr,'diagonal-right');     gameFinish((alls[arr[0]].className).split(' ')[1]); }
    arr = []


    for(let i = 0; i < COUNTER_OF_COLUMNS; i+=1){
        arr1=[]
        for(let z = i; z<COUNTER_OF_COLUMNS*COUNTER_OF_ROWS; z+=COUNTER_OF_COLUMNS){arr1.push(z);}
        arr.push(arr1);
    }
    arr.forEach(element => {win = element.every(elem => alls[elem].className === alls[element[0]].className && alls[elem].className !== "cell");if(win){addWinClass(element,'vertical');    gameFinish((alls[element[0]].className).split(' ')[1]);  }})
    arr = []


    for(let i = 0; i < COUNTER_OF_COLUMNS*COUNTER_OF_ROWS; i+=COUNTER_OF_COLUMNS){
        arr1=[]
        for(let z = i; z<COUNTER_OF_COLUMNS+i; z+=1){arr1.push(z);}
        arr.push(arr1);
    }
    arr.forEach(element => {win = element.every(elem => alls[elem].className === alls[element[0]].className && alls[elem].className !== "cell");if(win){addWinClass(element,'horizontal');   gameFinish((alls[element[0]].className).split(' ')[1]);  }})
    arr = []

    for(let i = COUNTER_OF_COLUMNS-1; i<COUNTER_OF_COLUMNS*COUNTER_OF_ROWS-1; i+=COUNTER_OF_COLUMNS-1){arr.push(i);}
    win = arr.every(elem => alls[elem].className === alls[arr[0]].className && alls[elem].className !== "cell");
    if (win){addWinClass(arr,'diagonal-left');     gameFinish((alls[arr[0]].className).split(' ')[1]);  }

    if(Array.from(alls).every(elem => elem.className !== "cell")){gameFinish("gg");}

}
function gameFinish(name) {
    a.forEach(e => e.querySelectorAll(".cell").forEach(elem => elem.removeEventListener("click", click)));
    document.querySelector(".won-title").classList.remove("hidden");
    if (name === "gg"){var winner = "It's a draw!";}
    else if (name === "r"){var winner = 'Toes won!';}
    else{var winner = 'Crosses won!';}
    document.querySelector(".won-message").textContent = winner;
    undoButton.disabled = true;
}

function undo(){
    way -= 1;
    var back = take_step.pop();
    cancel_step.push(back);
    document.getElementById(back['id']).className = "cell";
    save();
    buttonChecker();
}

function redo(){
    way += 1;
    let last = cancel_step.pop();
    document.getElementById(last['id']).className = last['class'];
    take_step.push(last);
    save();
    buttonChecker();
}

function buttonChecker(){
    if (take_step.length != 0){undoButton.disabled = false;}
    else{undoButton.disabled = true;}
    if (cancel_step.length != 0){redoButton.disabled = false;}
    else{redoButton.disabled = true;}
}

function save(){
    localStorage.setItem("ticTacToeMoves", JSON.stringify([take_step, cancel_step]));
}

function takeStep(){
    take_step.forEach(e => document.getElementById(e['id']).className = e['class']);
    buttonChecker();
    winnerChecker();
}

function gameRestart(){
    document.querySelectorAll(".cell").forEach(e => { e.className = "cell"});
    undoButton.disabled = true;
    redoButton.disabled = true;
    document.querySelector(".won-title").classList.add("hidden");
    giveClick();
    take_step = []
    cancel_step = []
    save();
}

function giveClick(){
    a = document.querySelectorAll(".row");
    a.forEach(e => e.querySelectorAll(".cell").forEach(elem => elem.addEventListener("click", click)));
}