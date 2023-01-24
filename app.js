
var isX = 0, isY = 0;
function switchPlayer() {
    if (isX == 1) {
        isX = 0
        isY = 1
    }
    else {
        isY = 0
        isX = 1
    }
}

var startSign;  // used to hold who starts data
var level = 0;  // to see if the game is just started
document.getElementById("start_game").onclick = who_starts;
function who_starts() {
    var checkRadio = document.querySelector(
        'input[name="start"]:checked');
    if (checkRadio != null) {
        startSign = checkRadio.id
        console.log(startSign)
        level = 1
    }
}

// function Start_Game() {

//     var pos = Math.floor(Math.random() * 9) + 1;
//     var myCell = document.getElementById("cell" + pos);
//     myCell.textContent = 'X';
// }



// put  is to add event listener to every cell
const board = [];
setClick();
function setClick() {
    var i = 1;
    for (i; i < 10; i++) {
        var now = document.getElementById("cell" + i);
        board[i - 1] = now;        // ~~~~~~~~~    storing all divs in board array to use later  ~~~~~~~~~~
        now.addEventListener("click", set);
        // now.addEventListener("click", switchPlayer);
        // now.addEventListener("click", turn_msg);

        // function set() {
        //     this.innerHTML = put ;
        // }
    }
}

function turn_msg() {
    var label = document.getElementById("turn_msg");
    if (isX == 1)
        label.innerHTML = "X your turn";
    else
        label.innerHTML = "O your turn";
}

function set() {
    if (this.textContent === "") 
    {
        if (level == 0) 
        {
            alert("PRESS START BUTTON FIRST")
            window.location.reload();
        }
        if (level == 1) 
        {
            this.textContent = startSign;
            level++;
            if (startSign === 'X')
                isX = 1;
            else
                isY = 1;
        }
        else
        {
            if (isX == 1)
                this.textContent = 'X';
            else if (isY == 1)
                this.textContent = 'O';
        }
        playSound(this.textContent);
        checkwin(this.textContent);
        switchPlayer();
        turn_msg();
        // will handle later ki if koi 1 na ho
    }
}

// creating the winning logic now onwards

const PLAYER_X_CLASS = 'X'
const PLAYER_O_CLASS = 'O'
const WPS = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
]

function checkwin(currentVal) {
    // console.log(`checkwin was called with ${currentVal}`);
    for (w of WPS) {
        if (currentVal == board[w[0]].textContent && currentVal == board[w[1]].textContent && currentVal == board[w[2]].textContent && currentVal != "") {
            var declare = document.querySelector(".pop-up-content-wrap")
            document.querySelector(".custom-model-main").classList.add("model-open");
            $(".close-btn, .bg-overlay").click(function () {
                window.location.reload();
            });
            declare.textContent = `PLAYER ${currentVal} WON`;

        }
    }


    var empty = 0;
    for (b of board) {
        if (b.textContent == "") {
            empty++;
            break;
        }
    }
    if (empty == 0) {
        var declare = document.querySelector(".pop-up-content-wrap")
        document.querySelector(".custom-model-main").classList.add("model-open");
        $(".close-btn, .bg-overlay").click(function () {
            window.location.reload();
        });
        declare.textContent = `IT'S A DRAW`;
    }
}


document.getElementById("restart").addEventListener("click", () => window.location.reload());

function playSound(name) {
    var audio = new Audio("sounds/" + name + ".wav");

    audio.play();
}


//      i am  bug and i exist ... find me out 
