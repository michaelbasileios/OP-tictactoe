const Gameboard = (() => {
    const gameBoard = document.querySelector('#gameboard');

    let board = ["", "", "", "", "", "", "", "", ""];

    const getBoard = () => board;

    const renderBoard = () => {
        let boardHTML = ''; //This variable is important because otherwise we end up creating more squares than there are elements in the array on subsequent calls of the render function.
        board.forEach((square, index) => { 
            boardHTML += `<div class="board-square" data-index=${index}>${square}</div>`;
        })
        gameBoard.innerHTML = boardHTML;
        const squares = document.querySelectorAll(".board-square");
        squares.forEach((square) => {
            square.addEventListener("click", () => {
                GameController.clickHandle(square);
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
    let board = Gameboard.getBoard();
    let activePlayer; 
    let gameOver;
    let players = [];

    const getActivePlayer = () => activePlayer;
    
    
    const gameStart = () => {
        players = [
            createPlayer(document.querySelector("#player1").value, "X"),
            createPlayer(document.querySelector("#player2").value, "O")
        ];
        activePlayer = players[0];
        gameOver = false;
        Gameboard.renderBoard();
        ScreenController.displayActivePlayer();
    }

    const gameRestart = () => {
        for (i = 0; i < board.length; i++) {
            board[i] = "";
        }
        players = [];
        gameStart();
        Gameboard.renderBoard();
    }

    const switchPlayerTurn = () => {
        activePlayer === players[0] ? activePlayer = players[1] : activePlayer = players[0];
    }

    const clickHandle = (square) => {
        let arrayIndex = square.dataset.index;
        if(board[arrayIndex] === "") {
            board.splice(arrayIndex, 1, activePlayer.mark);
        } else return;
        Gameboard.renderBoard();
        switchPlayerTurn();
        ScreenController.displayActivePlayer();
    }

    return {gameStart, gameRestart, clickHandle, getActivePlayer};
})();


//SCREEN CONTROLLER
const ScreenController = (() => {
    const startBtn = document.querySelector("#start-button");
    const restartBtn = document.querySelector("#restart-button");
    const messageDiv = document.querySelector("#message");
    startBtn.addEventListener("click", () => GameController.gameStart());
    restartBtn.addEventListener("click", () => GameController.gameRestart());

    const displayActivePlayer = () => {
        messageDiv.innerHTML = `${GameController.getActivePlayer().name}'s turn`;
    }

    return {displayActivePlayer};
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