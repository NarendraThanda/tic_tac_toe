let boxes = document.querySelectorAll(".box");
let restBtn = document.querySelector("#resetBtn");
let newgame = document.querySelector("#newbtn");
let msgcontainer = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");

let turnO = true; // playerO, playerX

const winPatterns = [
    [0,1,2],
    [0,3,6],
    [0,4,8],
    [1,4,7],
    [2,5,8],
    [2,4,6],
    [3,4,5],
    [6,7,8],
];

const resetGame = () => {
    turnO = true;
    enableBoxes();
    msgcontainer.classList.add("hidden");
};

boxes.forEach((box)  => {
    box.addEventListener("click" ,() =>{
        console.log("box was clicked");
        if (turnO) {
           box.innerText = "O";// player 0
            turnO = false;
        } else {
            box.innerText = "X";//player x
            turnO = true;
        }
        box.disabled = true;
        checkWinner();

    });
});

const disableBoxes = () => {
    for (let box of boxes) {
        box.disabled = true;
    }
};

const enableBoxes = () => {
    for (let box of boxes) {
        box.disabled = false;
        box.innerText = "";
    }
};

const showWinner = (winner) => {
    msg.innerText = `Congratulations, Winner is ${winner}`;
    msgcontainer.classList.remove("hidden");
    disableBoxes();
}

const showDraw = () => {
    msg.innerText = `Game was a Draw.`;
    msgcontainer.classList.remove("hidden");
    disableBoxes();
}

const checkWinner = () => {
    for (let pattern of winPatterns) {
        let pos1Val = boxes[pattern[0]].innerText;
        let pos2Val = boxes[pattern[1]].innerText;
        let pos3Val = boxes[pattern[2]].innerText;

        if(pos1Val != "" && pos2Val != "" && pos3Val != "") {
            if (pos1Val === pos2Val && pos2Val === pos3Val) {
                console.log("Winner",pos1Val);
                showWinner(pos1Val);
                return;
            }
        }
    }

    // Check for draw
    let count = 0;
    boxes.forEach((box) => {
        if (box.innerText !== "") {
            count++;
        }
    });

    if (count === 9) {
        showDraw();
    }
};

newgame.addEventListener("click", resetGame);
restBtn.addEventListener("click",resetGame);
