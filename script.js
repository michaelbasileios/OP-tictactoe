const Gameboard = (() => {
    const gameBoardHTML = document.querySelector('#gameboard');

    let board = ["", "", "", "", "", "", "", "", ""];

    const getBoard = () => board;

    const renderBoard = () => {
        board.forEach((square, index) => {
            gameBoardHTML.innerHTML += 
            `<div class="board-square" data-index=${index}>${square}</div`;
        })
        const squares = document.querySelectorAll(".board-square");
        squares.forEach((square) => {
            square.addEventListener("click", () => {
                console.log(`Square Number ${square.dataset.index}`);
            })
        })
    };

    return {getBoard, renderBoard};
})();

//GAME CONTROLLER
const GameController = (() => {
    const createPlayer = (name, mark) => {
        return {name, mark};
    }
    let players = [
        createPlayer(document.querySelector("#player1").value, "X"),
        createPlayer(document.querySelector("#player2").value, "O")
    ];
    let activePlayer = 0;
    let gameOver = false;
    
    
    const gameStart = () => {
        Gameboard.renderBoard();
    }

    return {
        gameStart
    }
})();


//SCREEN CONTROLLER
const ScreenController = (() => {
    const startBtn = document.querySelector("#start-button");
    const restartBtn = document.querySelector("#restart-button");
    startBtn.addEventListener("click", () => GameController.gameStart());
})();


// function Square() {
//     let value = 0;

//     const addMark = (player) => {
//         value = player;
//     };

//     const getValue = () => value;

//     return {
//         addMark,
//         getValue
//     };
// }

// function GameController(playerOneName = "Player One", playerTwoName = "Player Two") {
//     const board = Gameboard();

//     const players = [
//         {
//             name: playerOneName,
//             mark: 1
//         },
//         {
//             name: playerTwoName,
//             mark: 2
//         }
//     ];

//     let activePlayer = players[0];

//     const switchPlayerTurn = () => {
//         activePlayer = activePlayer === players[0] ? players[1] : player[0];
//     };
//     const getActivePlayer = () => activePlayer;

//     const renderNewRound = () => {
//         board.renderBoard();
//         console.log(`${getActivePlayer().name}'s turn.`);
//     };

//     const playRound = (row, column) => {
//         console.log(
//             `Adding ${getActivePlayer().name}'s mark to row ${row} column ${column}`
//         );
//         board.markSquare(column, getActivePlayer().mark);

//         // ADD WIN LOGIC HERE

//         switchPlayerTurn();
//         renderNewRound();
//     };

//     renderNewRound();

//     return {
//         playRound, getActivePlayer, getBoard: board.getBoard
//     };
// }