let boxes = document.querySelectorAll(".box");
let newGameBtn = document.querySelector("#new-btn");
let resetBtn = document.querySelector("#reset-btn");
let msgContainer = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");
let turnIndicator = document.querySelector("#turn-indicator");

let scoreO = document.querySelector("#score-o");
let scoreX = document.querySelector("#score-x");
let scoreDraw = document.querySelector("#score-draw");

let turnO = true;
let moveCount = 0;

let scores = {
    O: 0,
    X: 0,
    Draw: 0
};

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

boxes.forEach((box) => {
    box.addEventListener("click", () => {
        if(turnO) {
            box.innerText = "O";
            turnO = false;
            turnIndicator.innerText = "Player X's Turn";
        } else {
            box.innerText = "X";
            turnO = true;
            turnIndicator.innerText = "Player O's Turn";
        }
        box.disabled = true;
        moveCount++;

        box.classList.remove("placed");
        void box.offsetWidth;
        box.classList.add("placed");

        checkWinner();
    });
});

const disableBoxes = () => {
    for(let box of boxes) {
        box.disabled = true;
    }
};

const enableBoxes = () => {
    for(let box of boxes) {
        box.disabled = false;
        box.innerText = "";
        box.classList.remove("placed");
    }
};

const showWinner = (winner) => {
    msg.innerText = `🎉 Winner is ${winner}!`;
    scores[winner]++;
    updateScoreboard();
    turnIndicator.innerText = "";
    msgContainer.classList.remove("hide");
    disableBoxes();
};

const showDraw = () => {
    msg.innerText = "It's a Draw! 🤝";
    scores.Draw++;
    updateScoreboard();
    turnIndicator.innerText = "";
    msgContainer.classList.remove("hide");
};

const updateScoreboard = () => {
    scoreO.innerText = scores.O;
    scoreX.innerText = scores.X;
    scoreDraw.innerText = scores.Draw;
};

const checkWinner = () => {
    for(let pattern of winPatterns) {
        let pos1 = boxes[pattern[0]].innerText;
        let pos2 = boxes[pattern[1]].innerText;
        let pos3 = boxes[pattern[2]].innerText;

        if(pos1 !== "" && pos2 !== "" && pos3 !== "") {
            if(pos1 === pos2 && pos2 === pos3) {
                showWinner(pos1);
                return;
            }
        }
    }
    if (moveCount === 9) {
        showDraw();
    }
};

const newGame = () => {
    turnO = true;
    moveCount = 0;
    turnIndicator.innerText = "Player O's Turn";
    enableBoxes();
    msgContainer.classList.add("hide");
};

const resetGame = () => {
    scores = { O: 0, X: 0, Draw: 0 };
    updateScoreboard();
    newGame();
};

newGameBtn.addEventListener("click", newGame);
resetBtn.addEventListener("click", resetGame);